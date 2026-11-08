<div align="center">

<h1 align="center">📺 IPTV Player & Scanner</h1>

**A lightweight, web-based IP range scanner and IPTV player powered by Python & Flask.**

[![English](https://img.shields.io/badge/English-Click-2563eb?style=flat-square)](#)
[![Español](https://img.shields.io/badge/Español-Clic-eab308?style=flat-square)](README.es.md)

![License MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat-square&logo=flask&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-JS%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)

[![Telegram](https://img.shields.io/badge/Telegram-Channel-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/AstraxMCP)
[![YouTube](https://img.shields.io/badge/YouTube-@AstraxOf-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@AstraxOf)
[![Website](https://img.shields.io/badge/astrabots.pro-0f766e?style=flat-square&logo=googlechrome&logoColor=white)](https://astrabots.pro)
[![GitHub](https://img.shields.io/badge/GitHub-AstraxOf-181717?style=flat-square&logo=github)](https://github.com/AstraxOf)

<br/>

[![Download ZIP](https://img.shields.io/badge/📥%20Download-Source%20Code%20(ZIP)-22c55e?style=for-the-badge&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner/archive/refs/heads/main.zip)

</div>

---

> **IPTV Player & Scanner** allows you to scan custom IP address ranges (e.g., from `192.168.0.0` to `192.168.255.255`), discover active servers, and stream live IPTV channels directly in your browser or through external players.

---

## 🚀 Features

- 🌐 **IP Range Scanner:** Scan custom IP address ranges (such as `192.168.0.0` to `192.168.255.255`) to find active IPTV servers and playlists.
- 🔌 **Customizable Ports (Default 8000):** Set any target port you need. It defaults to **Port 8000**, which hosts the vast majority of M3U playlists and IPTV streams.
- 📺 **Built-in Player:** Play live channels directly within your web browser interface.
- ⚡ **Stream Management:** Quickly test and verify M3U playlist stream links in real time.
- 🎨 **Responsive UI:** Clean, modern web interface built using HTML5, CSS3, and JavaScript.
- 🛠️ **Powered by Flask:** Lightweight Python backend (`app.py`) for handling routes and scanning logic seamlessly.

---

## ⚠️ Important Note About the Web Player

While the application features a convenient **built-in player**, some channels may occasionally get stuck loading or fail to play. This occurs because **web browser encoding and codec limitations** do not always natively support older or legacy broadcast transmissions (such as MPEG-TS / `.ts` streams).

💡 **Recommendation:** If a channel experiences loading issues or if you want to enjoy **all channels without restrictions**, we recommend opening the stream links using **VLC Media Player** or any external app with M3U playlist support.

---

## 📋 Requirements

- **Python 3.8+** installed on your system.
- Standard Python libraries (`Flask`, `requests`, etc.).

---

## 📥 Installation & Download

### Option 1: Direct Download (ZIP)
Click the button below to download the latest project version:

[![Download ZIP](https://img.shields.io/badge/Download-ZIP-22c55e?style=flat-square&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner/archive/refs/heads/main.zip)

### Option 2: Clone via Terminal

```bash
git clone [https://github.com/AstraxOf/IPTV-Player-Scanner.git](https://github.com/AstraxOf/IPTV-Player-Scanner.git)
cd IPTV-Player-Scanner