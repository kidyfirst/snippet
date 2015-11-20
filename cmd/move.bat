@echo off
setlocal EnableDelayedExpansion

cd /d %~dp0
set iroot=%cd%\

if "%~d1"=="" goto :dragndrophere

echo Moving: %~nx1
echo From: %~dp1
echo To: %iroot%

echo.
echo Locking %1

ren %1 "%~nx1-LockForMove"

if exist %1 goto LockFail

set dest="%iroot%%~nx1"

if exist %dest% call :EnsureDest dest %dest%

xcopy /s /h /r /y /i "%~dpnx1-LockForMove" %dest%

move %1 %dest%

rd /s /q "%~dpnx1-LockForMove"

echo Done!

:Exit

pause

exit

:LockFail
echo Lock Failed!

goto Exit

:EnsureDest

set index=0

:Indexing

set /a index=1+%index%

if exist "%~dpnx2(%index%)" goto :Indexing

set %1="%~dpnx2(%index%)"

goto :eof

:dragndrophere

set /p input=Drag and Drop a Folder Here and Hit the Enter key:

call clear %input%

:end
