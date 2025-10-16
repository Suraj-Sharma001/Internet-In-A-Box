# 🍓 Raspberry Pi Deployment Guide

## Complete Guide to Deploy Internet-in-a-Box on Raspberry Pi

This guide will walk you through setting up Internet-in-a-Box on a Raspberry Pi to create a local offline knowledge hub accessible to anyone on your network.

## 📋 Requirements

### Hardware
- Raspberry Pi (3B+, 4, or 5 recommended)
- MicroSD card (32GB minimum, 64GB+ recommended)
- Power supply for Raspberry Pi
- Ethernet cable or WiFi access
- (Optional) External USB drive for storage

### Software
- Raspberry Pi OS (Lite or Desktop)
- Node.js v18+
- Git

## 🔧 Step-by-Step Setup

### 1. Prepare Raspberry Pi

#### Install Raspberry Pi OS
1. Download Raspberry Pi Imager: https://www.raspberrypi.com/software/
2. Flash Raspberry Pi OS to your microSD card
3. Enable SSH (create empty file named `ssh` in boot partition)
4. Configure WiFi (optional): Create `wpa_supplicant.conf` in boot partition

#### First Boot
```bash
# Default credentials
Username: pi
Password: raspberry

# Change password immediately
passwd

# Update system
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install Git

```bash
sudo apt install git -y
```

### 4. Transfer Project to Raspberry Pi

#### Option A: Using Git (Recommended)
```bash
cd ~
git clone <your-repository-url> Internet-In-Box
cd Internet-In-Box
```

#### Option B: Using SCP from your computer
```bash
# From your development computer
scp -r "c:\Games\!Projects\Internet-In-Box" pi@raspberrypi.local:~/
```

### 5. Build the Project

```bash
cd ~/Internet-In-Box
npm install
npm run build
```

This creates a `dist/` folder with optimized production files.

### 6. Install Web Server

#### Option A: Using serve (Simple)
```bash
sudo npm install -g serve
```

#### Option B: Using nginx (Advanced)
```bash
sudo apt install nginx -y
```

### 7. Run the Application

#### Using serve
```bash
# Run on port 80 (requires sudo)
sudo serve -s dist -l 80

# Or run on port 3000 (no sudo needed)
serve -s dist -l 3000
```

#### Using nginx
```bash
# Copy build files to nginx directory
sudo cp -r dist/* /var/www/html/

# Restart nginx
sudo systemctl restart nginx
```

### 8. Access Your Internet-in-a-Box

#### Find Raspberry Pi IP Address
```bash
hostname -I
# Example output: 192.168.1.100
```

#### Access from Other Devices
- Open browser on any device on the same network
- Navigate to: `http://192.168.1.100` (use your Pi's IP)
- Or use: `http://raspberrypi.local` (if mDNS is enabled)

## 🚀 Auto-Start on Boot

### Create Systemd Service

1. **Create service file**
```bash
sudo nano /etc/systemd/system/internet-in-box.service
```

2. **Add configuration** (using serve)
```ini
[Unit]
Description=Internet-in-a-Box Offline Knowledge System
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/Internet-In-Box/dist
ExecStart=/usr/bin/serve -s . -l 80
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

3. **For nginx configuration**
```ini
[Unit]
Description=Internet-in-a-Box via Nginx
After=network.target nginx.service

[Service]
Type=oneshot
ExecStart=/bin/true
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

4. **Enable and start service**
```bash
sudo systemctl daemon-reload
sudo systemctl enable internet-in-box
sudo systemctl start internet-in-box
sudo systemctl status internet-in-box
```

## 💾 Storage Configuration

### Mount External Drive (Optional but Recommended)

1. **Connect USB drive to Raspberry Pi**

2. **Find drive**
```bash
sudo fdisk -l
# Look for your drive (e.g., /dev/sda1)
```

3. **Create mount point**
```bash
sudo mkdir -p /mnt/knowledge-storage
```

4. **Mount drive**
```bash
sudo mount /dev/sda1 /mnt/knowledge-storage
```

5. **Auto-mount on boot**
```bash
# Get UUID
sudo blkid

# Edit fstab
sudo nano /etc/fstab

# Add line (replace UUID)
UUID=your-uuid-here /mnt/knowledge-storage ext4 defaults,nofail 0 2
```

6. **Set permissions**
```bash
sudo chown -R pi:pi /mnt/knowledge-storage
```

## 🔒 Security Recommendations

### 1. Change Default Password
```bash
passwd
```

### 2. Configure Firewall
```bash
sudo apt install ufw -y
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 3. Disable SSH Root Login
```bash
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart ssh
```

### 4. Keep System Updated
```bash
# Create update script
nano ~/update-system.sh
```

Add:
```bash
#!/bin/bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
```

Make executable:
```bash
chmod +x ~/update-system.sh
```

## 📊 Performance Optimization

### 1. Increase Swap (for Pi with limited RAM)
```bash
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
# Change CONF_SWAPSIZE=100 to CONF_SWAPSIZE=2048
sudo dphys-swapfile setup
sudo dphys-swapfile swapon
```

### 2. Overclock (Optional - for Pi 4/5)
```bash
sudo nano /boot/config.txt
# Add:
# over_voltage=2
# arm_freq=1750
```

### 3. Disable Unused Services
```bash
sudo systemctl disable bluetooth
sudo systemctl disable avahi-daemon
```

## 🌐 Network Configuration

### Set Static IP Address

1. **Edit dhcpcd.conf**
```bash
sudo nano /etc/dhcpcd.conf
```

2. **Add at the end**
```
interface eth0
static ip_address=192.168.1.100/24
static routers=192.168.1.1
static domain_name_servers=192.168.1.1 8.8.8.8
```

3. **Restart networking**
```bash
sudo systemctl restart dhcpcd
```

### Enable WiFi Access Point (Create Hotspot)

For complete offline operation, turn Pi into WiFi hotspot:

```bash
sudo apt install hostapd dnsmasq -y
```

Configure as per: https://www.raspberrypi.com/documentation/computers/configuration.html#setting-up-a-routed-wireless-access-point

## 🔄 Updating Content

### Method 1: Manual Update
```bash
cd ~/Internet-In-Box
git pull origin main
npm install
npm run build
sudo systemctl restart internet-in-box
```

### Method 2: Automated Update Script
Create `update.sh`:
```bash
#!/bin/bash
cd ~/Internet-In-Box
git pull origin main
npm install
npm run build
sudo systemctl restart internet-in-box
echo "Update completed at $(date)"
```

Make executable:
```bash
chmod +x update.sh
```

Schedule with cron (weekly updates):
```bash
crontab -e
# Add: 0 2 * * 0 /home/pi/update.sh
```

## 📱 Accessing from Different Devices

### Desktop/Laptop
- URL: `http://raspberrypi.local` or `http://192.168.1.100`

### Mobile Phone/Tablet
1. Connect to same WiFi network
2. Open browser
3. Navigate to Pi's IP address

### Offline Access
- If Pi is configured as WiFi hotspot
- Connect to Pi's WiFi network
- Access via default gateway IP (usually `192.168.4.1`)

## 🛠️ Troubleshooting

### Service Won't Start
```bash
sudo systemctl status internet-in-box
journalctl -u internet-in-box -n 50
```

### Cannot Access from Network
```bash
# Check if service is running
sudo netstat -tulpn | grep :80

# Check firewall
sudo ufw status

# Test locally
curl http://localhost
```

### Out of Storage
```bash
# Check disk usage
df -h

# Clean package cache
sudo apt clean
sudo apt autoremove -y

# Clear npm cache
npm cache clean --force
```

### Performance Issues
```bash
# Check system resources
htop

# Check temperature
vcgencmd measure_temp

# Reduce running processes
sudo systemctl list-units --type=service --state=running
```

## 📈 Monitoring

### System Stats Dashboard
```bash
# Install monitoring tools
sudo apt install htop glances -y

# Run monitoring
htop
# or
glances
```

### Access Logs
```bash
# For nginx
sudo tail -f /var/log/nginx/access.log

# For systemd service
journalctl -u internet-in-box -f
```

## 🎯 Production Checklist

- [ ] Raspberry Pi OS installed and updated
- [ ] Node.js installed
- [ ] Project cloned/transferred
- [ ] Project built (`npm run build`)
- [ ] Web server installed and configured
- [ ] Service auto-starts on boot
- [ ] External storage mounted (if using)
- [ ] Static IP configured
- [ ] Firewall configured
- [ ] SSH secured
- [ ] Tested from multiple devices
- [ ] Backup strategy in place

## 💡 Tips

1. **Use external storage** for large content libraries
2. **Set static IP** for consistent access
3. **Regular backups** of configuration and user data
4. **Monitor temperature** - add heatsinks/fan if needed
5. **Label your Pi** with IP address for easy reference
6. **Document your setup** for future maintenance

## 🚨 Emergency Recovery

### Backup Important Files
```bash
# Backup user data
tar -czf ~/backup-$(date +%Y%m%d).tar.gz /mnt/knowledge-storage

# Backup service config
sudo cp /etc/systemd/system/internet-in-box.service ~/
```

### Reset to Fresh Install
```bash
cd ~/Internet-In-Box
git reset --hard
git pull origin main
npm install
npm run build
sudo systemctl restart internet-in-box
```

## 📞 Support

If you encounter issues:
1. Check logs: `journalctl -u internet-in-box`
2. Verify network connectivity
3. Ensure sufficient storage space
4. Check Pi temperature (should be < 80°C)

---

**Your Internet-in-a-Box is now ready to serve offline knowledge!** 🎉
