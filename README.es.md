<div align="center">

<h1 align="center">📺 IPTV Player & Scanner</h1>

**Un reproductor de IPTV web liviano y escáner automatizado de listas M3U desarrollado con Python y Flask.**

[![English](https://img.shields.io/badge/English-Click-2563eb?style=flat-square)](README.md)
[![Español](https://img.shields.io/badge/Español-Clic-eab308?style=flat-square)](#)

![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat-square&logo=flask&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-JS%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)

[![Telegram](https://img.shields.io/badge/Telegram-Canal-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/AstraxMCP)
[![YouTube](https://img.shields.io/badge/YouTube-@AstraxOf-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@AstraxOf)
[![Sitio web](https://img.shields.io/badge/astrabots.pro-0f766e?style=flat-square&logo=googlechrome&logoColor=white)](https://astrabots.pro)
[![GitHub](https://img.shields.io/badge/GitHub-AstraxOf-181717?style=flat-square&logo=github)](https://github.com/AstraxOf)

<br/>

[![Descargar ZIP](https://img.shields.io/badge/📥%20Descargar-Código%20Fuente%20(ZIP)-22c55e?style=for-the-badge&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner/archive/refs/heads/main.zip)

</div>

---

> **IPTV Player & Scanner** te permite reproducir canales IPTV en vivo directamente desde tu navegador, además de verificar y escanear en tiempo real el estado de las conexiones de tu lista M3U.

---

## 🚀 Características

- 📺 **Reproductor de IPTV en vivo:** Reproduce enlaces de transmisión HTTP/HTTPS directamente en el navegador.
- ⚡ **Escáner de Canales:** Analiza tus listas M3U para detectar qué enlaces están funcionales y cuáles están caídos.
- 🎨 **Interfaz Web Moderna:** Diseño limpio, adaptable y optimizado construido con HTML5, CSS3 y JavaScript.
- 🛠️ **Backend con Flask:** Desarrollado sobre un servidor ligero en Python (`app.py`) para gestionar la lógica de escaneo y reproducción.

---

## 📋 Requisitos Previos

- **Python 3.8 o superior** instalado en el sistema.
- Librerías estándar de Python (`Flask`, `requests`, etc.).

---

## 📥 Instalación y Descarga

### Opción 1: Descarga directa (ZIP)
Haz clic en el siguiente botón para descargar la última versión del proyecto:

[![Descargar ZIP](https://img.shields.io/badge/Descargar-ZIP-22c55e?style=flat-square&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner/archive/refs/heads/main.zip)

### Opción 2: Clonar con Git

```bash
git clone https://github.com/AstraxOf/IPTV-Player-Scanner.git
cd IPTV-Player-Scanner
```

### Configuración e Inicio

1. **Crea un entorno virtual (Opcional pero recomendado):**
   ```bash
   python -m venv venv
   # En Windows:
   venv\Scripts\activate
   # En macOS/Linux:
   source venv/bin/activate
   ```

2. **Instala las dependencias necesarias:**
   ```bash
   pip install flask requests
   ```

3. **Inicia la aplicación:**
   ```bash
   python app.py
   ```

4. **Abre en el navegador:**
   Ingresa a `http://127.0.0.1:5000` en tu navegador web.

---

## 📁 Estructura del Proyecto

```text
IPTV Player & Scanner/
│
├── app.py                  # Script principal del servidor Flask
├── static/
│   ├── css/
│   │   └── style.css       # Estilos personalizados y diseño responsivo
│   └── js/
│       └── app.js          # Lógica de reproducción e interacción de la interfaz
└── templates/
    └── index.html          # Plantilla principal de la interfaz web
```

---

## 🤝 Comunidad y Redes Sociales

[![Canal de Telegram](https://img.shields.io/badge/Telegram-Canal%20oficial-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/AstraxMCP)
[![YouTube](https://img.shields.io/badge/YouTube-@AstraxOf-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@AstraxOf)
[![Creador en Telegram](https://img.shields.io/badge/Creador-@RufusOficial-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/RufusOficial)
[![Correo](https://img.shields.io/badge/Correo-avpn497%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:avpn497@gmail.com)

---

## 📄 Licencia

Este proyecto está distribuido bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.

<div align="center">

Hecho con 💙 por Rufus · [@AstraxOf](https://github.com/AstraxOf) · [astrabots.pro](https://astrabots.pro)

</div>
