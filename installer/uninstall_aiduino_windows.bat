@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

echo.
echo  ==========================================
echo      AI.duino Plugin Uninstaller
echo  ==========================================
echo.

set "EXTENSIONS_DIR=%USERPROFILE%\.arduinoIDE\extensions"
set "DEPLOYED_DIR=%USERPROFILE%\.arduinoIDE\deployedPlugins"

set "FOUND=0"

if exist "%EXTENSIONS_DIR%\aiduino*.vsix" (
    echo  [..] Removing files...
    del /q "%EXTENSIONS_DIR%\aiduino*.vsix" 2>nul
    echo       Deleted from %EXTENSIONS_DIR%
    set "FOUND=1"
)

for /d %%D in ("%DEPLOYED_DIR%\aiduino*") do (
    echo  [..] Removing plugin: %%~nxD
    rmdir /s /q "%%D"
    set "FOUND=1"
)

if "%FOUND%"=="0" (
    echo  [i] AI.duino not found or already removed.
) else (
    echo.
    echo  ==========================================
    echo      SUCCESS! Plugin uninstalled.
    echo  ==========================================
    echo.
    echo  Please restart Arduino IDE to finish.
)

echo.
pause
