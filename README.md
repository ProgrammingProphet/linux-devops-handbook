# 🐧 DevOps Linux Handbook

A comprehensive, production-ready Linux guide for DevOps Engineers. This static website covers everything from fundamentals to advanced troubleshooting, with a clean developer-focused interface.

🔗 **Live Demo:** [https://programmingprophet.github.io/linux-devops-handbook](https://programmingprophet.github.io/linux-devops-handbook)

![DevOps Linux Handbook Preview](image.png)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Content Structure](#content-structure)
- [Technology Stack](#technology-stack)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The **DevOps Linux Handbook** is a static educational website designed specifically for DevOps Engineers. It bridges the gap between basic Linux knowledge and production-level troubleshooting skills. Whether you're preparing for interviews or debugging a live server, this handbook provides practical, scenario-based examples.

## ✨ Features

### Content Features
- **14 Comprehensive Sections** covering beginner to advanced topics
- **100+ Linux Commands** with real DevOps use cases
- **Structured Command Documentation**:
  - 📘 Description
  - 🧠 Why DevOps Use It
  - 🛠 Syntax
  - 💻 Practical Examples
  - 🎯 Real-world Scenarios
  - ⚠ Common Mistakes
- **Interview Questions** with detailed answers
- **Troubleshooting Scenarios** for production issues
- **Command Comparison Tables**
- **Quick Cheat Sheet** for daily reference

### Technical Features
- 🌓 **Dark/Light Mode** with persistent preference
- 🔍 **Live Search** across all content
- 🏷️ **Category Filters** (Basic, Networking, Process, Storage, Security)
- 📋 **Copy-to-Clipboard** for all commands
- 📱 **Fully Responsive** design
- 🎨 **Developer-focused UI** with monospace fonts
- ⚡ **Collapsible Sections** for better navigation
- 🔗 **Sticky Sidebar** for easy access

## 📚 Content Structure

### 1. Linux Fundamentals
History, architecture, kernel, distributions, FHS, shell vs GUI

### 2. Essential Commands
pwd, ls, cd, cp, mv, rm, cat, tail, head, grep, find, history and more

### 3. File Permissions & Ownership
chmod, chown, umask, SUID, SGID, sticky bit with production scenarios

### 4. User & Group Management
useradd, groupadd, passwd, sudo, /etc/passwd, /etc/shadow

### 5. Process Management
ps, top, htop, kill, systemctl, bg/fg, jobs, nice

### 6. Package Management
apt, yum, dnf, rpm, dpkg

### 7. Disk & Volume Management
df, du, mount, lsblk, fdisk, LVM (pvcreate, vgcreate, lvcreate)

### 8. Networking Commands
ip, ss, netstat, ping, traceroute, curl, wget, ssh, scp, dig, nslookup

### 9. Logs & Monitoring
/var/log, journalctl, dmesg, log rotation, tail -f

### 10. Cron & Job Scheduling
crontab syntax, systemd timers, at command

### 11. Shell Scripting
Variables, conditions, loops, functions, exit codes, real DevOps scripts

### 12. Advanced Tools
grep, awk, sed, xargs, find, tar, strace, lsof, environment variables

### 13. Real DevOps Troubleshooting
Disk full issues, high CPU debugging, port conflicts, SSH connection refused

### 14. Interview Questions & Answers
Basic, intermediate, advanced, and scenario-based questions

## 🛠 Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, flexbox, grid
- **JavaScript** - Vanilla JS (no frameworks)
- **Prism.js** - Syntax highlighting
- **Font Awesome 6** - Icons
- **Google Fonts** - Inter font family

## 💻 Local Development

### Prerequisites
- Any modern web browser
- Code editor (VS Code recommended)
- Live server extension (optional)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/programmingprophet/linux-devops-handbook.git
   cd linux-devops-handbook
   ```

2. **Project Structure**
   ```
   linux-devops-handbook/
   ├── index.html          # Main HTML file
   ├── styles.css          # All styles
   ├── script.js           # JavaScript functionality
   ├── README.md           # Documentation
   └── image.png           # Preview image
   ```

3. **Run locally**
   - Open `index.html` directly in browser, or
   - Use Live Server in VS Code for auto-reload

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/programmingprophet/linux-devops-handbook.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository **Settings**
   - Navigate to **Pages** section
   - Select **main** branch as source
   - Save and wait for deployment

3. **Access your site**
   - Your site will be available at: `https://[username].github.io/linux-devops-handbook`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest new features or commands
- 📝 Improve documentation
- 🔧 Add more DevOps scenarios
- 🌐 Fix typos or formatting

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by real DevOps production challenges
- Built for the DevOps community
- Special thanks to all contributors

## 📧 Contact

- **GitHub:** [@programmingprophet](https://github.com/programmingprophet)
- **Project Link:** [https://github.com/programmingprophet/linux-devops-handbook](https://github.com/programmingprophet/linux-devops-handbook)

---

⭐ **Star this repo** if you find it helpful!  
🐛 Found an issue? [Report it here](https://github.com/programmingprophet/linux-devops-handbook/issues)

---

*"Linux Handbook for Production DevOps Engineers"*
