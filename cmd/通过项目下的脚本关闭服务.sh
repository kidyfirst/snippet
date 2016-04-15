#!/bin/sh
cd -P `dirname $0`   #进入当前shell所在目录
shell_dir=`pwd`      #获取脚本所在目录，作为后面使用的相对路径
base_dir=`dirname $shell_dir`  #获取项目目录（假设脚本目录为项目目录下一级，如project/bin)
[ -d ../logs ] || mkdir ../logs  #项目下logs目录是否存在，不存在则创建
export PATH=$base_dir/node/bin:$PATH   #设置node环境变量
export NODE_ENV=production
cd $base_dir   #进入项目目录

killall -9 node    #杀死所有名字为node的进程



#如果文件夹不存在，创建文件夹
if [ ! -d "/myfolder" ]; then
  mkdir /myfolder
fi

#shell判断文件,目录是否存在或者具有权限


folder="/var/www/"
file="/var/www/log"

# -x 参数判断 $folder 是否存在并且是否具有可执行权限
if [ ! -x "$folder"]; then
  mkdir "$folder"
fi

# -d 参数判断 $folder 是否存在
if [ ! -d "$folder"]; then
  mkdir "$folder"
fi

# -f 参数判断 $file 是否存在
if [ ! -f "$file" ]; then
  touch "$file"
fi

# -n 判断一个变量是否有值
if [ ! -n "$var" ]; then
  echo "$var is empty"
  exit 0
fi

# 判断两个变量是否相等
if [ "$var1" = "$var2" ]; then
  echo '$var1 eq $var2'
else
  echo '$var1 not eq $var2'
fi
