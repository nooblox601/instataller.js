const fs = require("fs");
const https = require("https");
const { exec } = require("child_process");

class Installer {
  static download(url, out) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(out);
      https.get(url, res => {
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      }).on("error", reject);
    });
  }

  static installExe(file) {
    exec(`"${file}"`);
  }

  static installMSIX(file) {
    exec(`powershell Add-AppxPackage -Path "${file}"`);
  }

  static installPWA(url) {
    exec(`start msedge --install-app=${url}`);
  }
}

module.exports = Installer;
