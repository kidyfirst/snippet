set local= 本地连接
set wireless = 无线网络连接
echo %local%
ipconfig /all|findstr /i %local% > %TMP%\temp.txt
for /f %i in (%TMP%\temp.txt) do set localIsEnable=%i
echo %localIsEnable%
if not "%localIsEnable%"=="" goto :local_disabled
else
goto :local_enabled
:local_disabled
netsh interface set interface '%local%' disabled
netsh interface set interface '%wireless%' enabled
:local_enabled
netsh interface set interface '%wireless%' disabled
netsh interface set interface '%local%' enabled