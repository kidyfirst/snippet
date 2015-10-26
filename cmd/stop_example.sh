#!/bin/sh
cd -P `dirname $0`
shell_dir=`pwd`
base_dir=`dirname $shell_dir`
[ -d ../logs ] || mkdir ../logs
export PATH=$base_dir/node/bin:$PATH
export NODE_ENV=production 
cd $base_dir

killall -9 node
