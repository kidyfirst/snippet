@ECHO OFF
ECHO 终止Apache...
TASKKILL /F /IM "httpd.exe"

ECHO.

ECHO 重新启动Apache...
CMD /C .\bin\apache\bin\httpd.exe

ECHO.
PAUSE