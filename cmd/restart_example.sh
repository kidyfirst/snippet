#!/bin/sh
cd -P `dirname $0`
shell_dir=`pwd`
base_dir=`dirname $shell_dir`

function createpid {
        local name=`basename $0`
        pidfile="`pwd`/.${name}.pid"
        trap 'rm $pidfile; exit' INT TERM
        if [ -e $pidfile ];
        then
            local pid=`cat $pidfile`
            ps -p $pid -o 'args='|grep ${name}|grep -Ev "^vi |^vim |^grep"
            if [ $? -eq 0 ]; then
               echo "$0 has already there, exit..."
               exit
            fi
        fi
        echo $$ > $pidfile
        if [ $? -ne 0 ];then
            echo "create pid file error,exit."
            exit 1
        fi
        chmod 666 $pidfile
}
createpid


[ -d ../logs ] || mkdir ../logs
export PATH=$base_dir/node/bin:$PATH
export NODE_ENV=production 
cd $base_dir
killall -9 node
nohup node --harmony app.js  >/dev/null 2>&1 &
