@echo off
setlocal EnableDelayedExpansion

cd /d %~dp0
set iroot=%cd%\

if "%~d1"=="" goto :dragndrophere

echo Creating link: %~nx1
echo Assigned to: %~dpnx1

set dest="%iroot%%~nx1"

if exist %dest% call :EnsureDest dest %dest%

junction %dest% %1

echo Done!

:Exit

pause

exit

:EnsureDest

set index=0

:Indexing

set /a index=1+%index%

if exist "%~dpnx2(%index%)" goto :Indexing

set %1="%~dpnx2(%index%)"

goto :eof

:dragndrophere

set /p input=Drag and Drop a Folder Here and Hit the Enter key:

call hardlink %input%

:end

