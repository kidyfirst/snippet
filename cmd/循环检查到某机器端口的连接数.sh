#!/bin/bash
while true
do
netstat -anp | grep 10.153.130.84  | grep 8081 | wc -l >> log_connection_count
sleep 3
done