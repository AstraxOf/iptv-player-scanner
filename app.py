from flask import Flask, request, jsonify, render_template
import threading
import requests
import re
import ipaddress
from concurrent.futures import ThreadPoolExecutor, as_completed

app = Flask(__name__)

# Variables globales para el escaneo en segundo plano
scan_results = []
scanning = False
scan_status = "Inactivo"
scanned_count = 0
total_to_scan = 0
current_scan_id = 0


import os

@app.route('/')
def index():
    return render_template('index.html')


def check_single_ip(ip_str, port, scan_id):
    global current_scan_id
    if scan_id != current_scan_id:
        return None
        
    base_url = f"http://{ip_str}:{port}"
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) VLC/3.0.18'}
        
        # 1. Probar endpoints directos M3U
        m3u_endpoints = [
            "/playlist.m3u",
            "/get.php?username=guest&password=guest&type=m3u_plus",
            "/channels.m3u",
            "/get.php?username=user&password=user&type=m3u_plus",
            "/get.php?username=admin&password=admin&type=m3u_plus"
        ]
        
        for ep in m3u_endpoints:
            if scan_id != current_scan_id:
                return None
            test_url = base_url + ep
            try:
                r = requests.get(test_url, headers=headers, timeout=1.2)
                if r.status_code == 200:
                    text = r.text.lower()
                    if '#extinf' in text or 'm3u' in text or 'stream_id' in text:
                        return {"ip": ip_str, "port": port, "type": "M3U Abierto Directo", "url": test_url, "status_type": "public"}
            except:
                continue

        # 2. Verificar servidor activo / panel protegido
        try:
            r_root = requests.get(base_url, headers=headers, timeout=1.0)
            if scan_id != current_scan_id:
                return None
            if r_root.status_code < 500:
                content = r_root.text.lower()
                if 'dahua' in content or 'hikvision' in content:
                    return None
                return {"ip": ip_str, "port": port, "type": "Panel / Requiere Auth", "url": base_url + "/playlist.m3u", "status_type": "auth"}
        except:
            pass

    except:
        pass
    return None

def background_ip_scanner(start_ip, end_ip, port, scan_id):
    global scan_results, scanning, scan_status, scanned_count, total_to_scan, current_scan_id
    
    try:
        start_int = int(ipaddress.IPv4Address(start_ip))
        end_int = int(ipaddress.IPv4Address(end_ip))
        if end_int < start_int:
            start_int, end_int = end_int, start_int
            
        total_to_scan = end_int - start_int + 1
        ip_list = [str(ipaddress.IPv4Address(ip)) for ip in range(start_int, end_int + 1)]
        
        with ThreadPoolExecutor(max_workers=300) as executor:
            futures = {executor.submit(check_single_ip, ip, port, scan_id): ip for ip in ip_list}
            for future in as_completed(futures):
                if scan_id != current_scan_id:
                    break
                scanned_count += 1
                res = future.result()
                if res and scan_id == current_scan_id:
                    if not any(s['url'] == res['url'] for s in scan_results):
                        scan_results.append(res)
        
        if scan_id == current_scan_id:
            scan_status = "Escaneo completado"
    except Exception as e:
        if scan_id == current_scan_id:
            scan_status = f"Error: {str(e)}"
            
    if scan_id == current_scan_id:
        scanning = False

@app.route('/scan_ips', methods=['POST'])
def scan_ips():
    global scanning, scan_results, scan_status, scanned_count, total_to_scan, current_scan_id
    data = request.json or {}
    start_ip = data.get('start_ip', '127.0.0.1')
    end_ip = data.get('end_ip', '127.0.0.1')
    try:
        port = int(data.get('port', 8000))
    except:
        port = 8000
    
    current_scan_id += 1
    scan_id = current_scan_id
    
    scanning = True
    scan_results = []
    scanned_count = 0
    scan_status = "Escaneando red..."
    
    try:
        start_int = int(ipaddress.IPv4Address(start_ip))
        end_int = int(ipaddress.IPv4Address(end_ip))
        total_to_scan = end_int - start_int + 1
    except:
        total_to_scan = 0

    t = threading.Thread(target=background_ip_scanner, args=(start_ip, end_ip, port, scan_id))
    t.start()
    return jsonify({"success": True})

@app.route('/ip_status')
def ip_status():
    return jsonify({
        "scanning": scanning,
        "status": scan_status,
        "scanned": scanned_count,
        "total": total_to_scan,
        "servers": scan_results
    })


@app.route('/load_m3u', methods=['POST'])
def load_m3u():
    data = request.json or {}
    url = data.get('url', '').strip()
    if not url:
        return jsonify({"success": False, "error": "URL vacía"})

    parsed_channels = []
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) VLC/3.0.18'}
        resp = requests.get(url, headers=headers, timeout=12)
        resp.raise_for_status()
        text = resp.text
        lines = text.splitlines()
        current_name = "Canal IPTV"

        for line in lines:
            line = line.strip()
            if line.startswith('#EXTINF:'):
                match = re.search(r',([^,]+)$', line)
                if match:
                    current_name = match.group(1).strip()
            elif line and not line.startswith('#'):
                parsed_channels.append({"name": current_name, "url": line})
                current_name = "Canal IPTV"

        # Si el servidor responde pero no devuelve M3U directo, creamos accesos de prueba estándar
        if len(parsed_channels) == 0:
            base_clean = url.split('/playlist')[0].rstrip('/')
            parsed_channels.append({"name": "▶ Listado M3U Principal", "url": base_clean + "/playlist.m3u"})
            parsed_channels.append({"name": "▶ Xtream API (Guest)", "url": base_clean + "/get.php?username=guest&password=guest&type=m3u_plus"})
            parsed_channels.append({"name": "▶ Xtream API (Admin)", "url": base_clean + "/get.php?username=admin&password=admin&type=m3u_plus"})

        return jsonify({"success": True, "count": len(parsed_channels), "channels": parsed_channels})
    except requests.exceptions.RequestException as e:
        return jsonify({"success": False, "error": f"No se pudo descargar la lista: {str(e)}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)