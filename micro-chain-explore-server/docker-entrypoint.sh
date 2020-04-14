#!/bin/sh

#启动接口服务
pm2 start ecosystem.config.js &

#启动区块同步脚本
./start.sh
