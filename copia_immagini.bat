@echo off
echo Copio le immagini nella cartella images...
set SRC=C:\Users\rosar\.gemini\antigravity\brain\f44f1fe4-dad1-4ae1-9491-c07da420886b
set DST=C:\Users\rosar\OneDrive\Desktop\app magliette\images

if not exist "%DST%" mkdir "%DST%"

copy "%SRC%\hero_banner_1777025915870.png"   "%DST%\hero_banner.png"  /Y
copy "%SRC%\jersey_italia_1777025929990.png"  "%DST%\jersey_italia.png" /Y
copy "%SRC%\jersey_brazil_1777025943381.png"  "%DST%\jersey_brazil.png" /Y
copy "%SRC%\jersey_argentina_1777026120917.png" "%DST%\jersey_argentina.png" /Y
copy "%SRC%\jersey_spain_1777026256345.png"   "%DST%\jersey_spain.png"  /Y
copy "%SRC%\jersey_germany_1777026566602.png" "%DST%\jersey_germany.png" /Y

echo.
echo Fatto! Tutte le immagini sono state copiate.
pause
