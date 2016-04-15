#!/bin/bash
#Web Bench进行并发压力测试，选择的页面是phpinfo.php，
#并发请求开始5个，每次循环增加5个进入下轮的循环，每一轮循环持续60s，
#到达最大200个并发时结束。这样就可以持续做40分钟的测试
for n in `seq 5 5 200` ;
do
webbench -c $n -t 60 http://127.0.0.1/phpinfo.php 2>/dev/null | grep Speed | awk '{print $1}' | awk -F= '{print $2}' ;
done