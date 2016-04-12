#!/bin/bash
ulimit -n 1000000
#url=http://localhost:9090/jsonp?test=1\&cb=jQuery19101696983754077237_1460434\&uin=383466934\&skey=txqyzf
#post:	curl --data "status=1000&uuid=" http://localhost:9090/status?test=1\&status=1000
#get:	 curl http://localhost:9090/jsonp?test=1\&cb=jQuery19101696983754077237_1460434\&uin=383466934\&skey=txqyzf
for c in 1 2 5 10 20 50 100 150 200 500 1000 2000
do
	i=0
	for (( i=0; i<5; i++ ))
	do
		echo $url $c $i
		/usr/local/apache/bin/ab -n 10000 -c $c $url >> log_$c
	done
done
