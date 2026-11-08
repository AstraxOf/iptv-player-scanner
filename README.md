<div align="center">

<h1 align="center">📺 IPTV Player & Scanner</h1>

**A lightweight, high-performance web-based IP range scanner and IPTV player powered by Python & Flask.**

[![English](https://img.shields.io/badge/English-Click-2563eb?style=flat-square)](#)
[![Español](https://img.shields.io/badge/Español-Clic-eab308?style=flat-square)](README.es.md)

![License MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat-square&logo=flask&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-JS%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)

<!-- Repository Statistics -->
[![GitHub Downloads (All Releases)](https://img.shields.io/github/downloads/AstraxOf/IPTV-Player-Scanner/total?style=flat-square&logo=github&color=22c55e&label=Total%20Downloads)](https://github.com/AstraxOf/IPTV-Player-Scanner/releases)
[![GitHub Clones](https://img.shields.io/badge/dynamic/json?color=blue&label=Clones&query=count&url=https%3A%2F%2Fimg.shields.io%2Fbadge%2Fdynamic%2Fjson%3Fcolor%3Dblue%26label%3DClones%26query%3Dcount%26url%3Dhttps%3A%2F%2Fapi.github.com%2Frepos%2FAstraxOf%2FIPTV-Player-Scanner%2Ftraffic%2Fclones&style=flat-square&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner)
[![GitHub Release](https://img.shields.io/github/v/release/AstraxOf/IPTV-Player-Scanner?style=flat-square&logo=github&color=orange)](https://github.com/AstraxOf/IPTV-Player-Scanner/releases/latest)

[![Telegram](https://img.shields.io/badge/Telegram-Channel-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/AstraxMCP)
[![YouTube](https://img.shields.io/badge/YouTube-@AstraxOf-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@AstraxOf)
[![Website](https://img.shields.io/badge/astrabots.pro-0f766e?style=flat-square&logo=googlechrome&logoColor=white)](https://astrabots.pro)
[![GitHub](https://img.shields.io/badge/GitHub-AstraxOf-181717?style=flat-square&logo=github)](https://github.com/AstraxOf)

<br/>

[![Download ZIP](https://img.shields.io/badge/📥%20Download-Source%20Code%20(ZIP)-22c55e?style=for-the-badge&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner/archive/refs/heads/main.zip)

</div>

---

> **IPTV Player & Scanner** is a modern web application designed to scan network ranges, discover active IPTV servers, and stream live channels directly from your browser or external media players.

---

## 🚀 Key Features

- 🌐 **IP Range Scanner:** Search and scan custom subnet ranges and target custom ports to discover active IPTV servers.
- 🔌 **Default Port 8000 Support:** Configured out-of-the-box to target port 8000, optimizing the discovery of standard M3U playlist streams.
- 📺 **Integrated Web Player:** Stream live channels directly inside your browser interface.
- 🎨 **Modern Responsive UI:** Clean, dark-themed dashboard built with HTML5, CSS3, and Vanilla JavaScript.
- 🛠️ **Lightweight Flask Backend:** Powered by a clean Python (`app.py`) engine managing background requests smoothly.

---

## ⚠️ Important Note About the Web Player

While this tool includes a convenient **built-in browser player**, certain legacy streams or older broadcast formats (such as raw MPEG-TS / `.ts`) may occasionally experience buffering or fail to load due to native browser codec restrictions.

💡 **Recommendation:** For an optimal viewing experience with 100% compatibility across all streams, open the playlist links using **VLC Media Player** or any dedicated IPTV client supporting M3U lists.

---

## 📋 System Requirements

- **Python 3.8+**
- Core dependencies: `Flask`, `requests`

---

## 📥 Installation & Setup

### Option 1: Direct ZIP Download
Click below to download the latest source package:

[![Download ZIP](https://img.shields.io/badge/Download-ZIP-22c55e?style=flat-square&logo=github)](https://github.com/AstraxOf/IPTV-Player-Scanner/archive/refs/heads/main.zip)

### Option 2: Clone via Terminal

```bash
git clone [https://github.com/AstraxOf/IPTV-Player-Scanner.git](https://github.com/AstraxOf/IPTV-Player-Scanner.git)
cd IPTV-Player-Scanner
