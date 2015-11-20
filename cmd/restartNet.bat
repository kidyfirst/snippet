@echo off
set local=本地连接
set wireless=无线网络连接
echo 检查当前网络连接...
ipconfig /all|findstr /i %local% > %TMP%\temp.txt
for /f "delims=" %%i in (%TMP%\temp.txt) do set localIsEnable=%%i
if not "%localIsEnable%"=="" (
echo 启动"%wireless%"，请设置连接热点
echo 启动中...
goto :local_disabled
) else (
echo 启动"%local%"
echo 启动中...
goto :local_enabled
)
:finish
echo 完成
ping -n 2 127.0.0.1>nul
exit

:local_disabled
netsh interface set interface %local% disabled>nul
netsh interface set interface %wireless% enabled>nul
::netsh int set int name=%wireless% admin=enabled connect=connected>nul
goto :finish
:local_enabled
netsh interface set interface %wireless% disabled>nul
::netsh int set int name=%wireless% admin=disabled connect=connected>nul
netsh interface set interface %local% enabled>nul
goto :finish

:end