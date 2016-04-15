#!/bin/bash

if [ ! -n "$1" ] ;then
    echo "you have not input a number!"
else
        url=http://10.153.130.84:8081/jsonp?test=1\&cb=jQuery19101696983754077237_1460434\&uin=383466934\&skey=txqyzfi
        one=100
        c=$(($1/100))
        count=$c
        t=$1
        start=$(date +%s)
        while [ $c -gt 0 ]
        do
                c=$(($c-1))
                {
                        /usr/local/apache/bin/ab  -k -n $one -c $one $url > /dev/null 2>&1
                }&
                echo $(($t-($c*$one))) >> log_connection_send.log
                sleep 0.5
        done
        wait
        end=$(date +%s)
        echo "total send $(($count*$one)) request, spend time $(($end-$start))(s)!"
fi



#./fileName -100  ##发送url 100次