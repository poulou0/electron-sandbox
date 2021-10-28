### Installation

```shell
git clone git@github.com:poulou0/electron-sandbox.git && \
cd electron-sandbox && \
npm install && \
npm start
```

### Make a linux .AppImage

Run script on a Debian-based linux distro (`electron-builder` makes it double the size)

https://youtu.be/p8HNTJPIpwY

https://github.com/AppImage/AppImageKit/releases/latest

```shell
npx electron-packager . electron-sandbox --platform=linux --asar && \

cd electron-sandbox-linux-x64 && \
mkdir -p usr/bin && \
ls | grep -v usr | xargs mv -t usr/bin && \
echo "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQAAAAB0CZXLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAnRSTlMAAHaTzTgAAAACYktHRAAB3YoTpAAAAAd0SU1FB+UKHQsLOkszWOoAAAAfSURBVGje7cEBDQAAAMKg909tDjegAAAAAAAAAAC+DSEAAAF/GZynAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEwLTI5VDA5OjExOjU4KzAyOjAwD0uR8wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0xMC0yOVQwOToxMTo1OCswMjowMH4WKU8AAAAASUVORK5CYII=" | base64 --decode > icon.png && \
printf "#\!/bin/bash\nSELF=\$(readlink -f \"\$0\")\nHERE=\${SELF%%/*}\nexec \"\${HERE}/usr/bin/electron-sandbox\"" > AppRun && \
chmod +x AppRun && \
printf "[Desktop Entry]\nName=electron sandbox\nExec=electron-sandbox\nIcon=icon\nType=Application\nCategories=Utility" > electron-sandbox.desktop && \
wget -N https://github.com/AppImage/AppImageKit/releases/download/13/appimagetool-x86_64.AppImage -PO ~/Downloads/ && \
ARCH=x86_64 ~/Downloads/appimagetool-x86_64.AppImage .
```

### Make a MacOS .dmg

Run script on macOS

```shell
npx electron-packager . electron-sandbox --platform=darwin --asar && \
cd electron-sandbox-darwin-x64 && \
npx electron-installer-dmg ./electron-sandbox.app electron-sandbox
```

### Make a portable Windows .exe

Run script on a Debian-based linux distro

*Note: remove the `--ia32` for x64 binary*

```shell
sudo apt install wine && \
npx electron-builder build --ia32 --win portable
```
