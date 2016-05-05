@echo on
rem 下面2行命令表示执行完后关闭窗口，并且让进程在后台执行
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close)&&exit
:begin
set host=127.0.0.1
set port=8080
nodeppt start -p %port% -d ppts -H %host%
echo "Server running on %host%:%port%"
ping 127.0.0.1 -n 3 -w 1000 > nul