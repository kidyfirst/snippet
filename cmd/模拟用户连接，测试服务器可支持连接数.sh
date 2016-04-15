#!/bin/bash

if [ ! -n "$1" ] ;then
    echo "you have not input a number!"
else
    c=$1
    while [ $c -gt 0 ]
    do
        c=$(($c-1))
        {
        curl -s --connect-timeout 10 http://10.153.130.84:8081/jsonp?test=1\&cb=jQuery19101696983754077237_1460434\&uin=383466934\&skey=txqyzfi > /dev/null 2>&1
         }&
        sleep 0.05
    done
fi