@echo off
set local=��������
set wireless=������������
echo ��鵱ǰ��������...
ipconfig /all|findstr /i %local% > %TMP%\temp.txt
for /f "delims=" %%i in (%TMP%\temp.txt) do set localIsEnable=%%i
if not "%localIsEnable%"=="" (
echo ����"%wireless%"�������������ȵ�
echo ������...
goto :local_disabled
) else (
echo ����"%local%"
echo ������...
goto :local_enabled
)
:finish
echo ���
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