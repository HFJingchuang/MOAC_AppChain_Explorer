#!/bin/bash
while true; do
ps_out=`ps -ef | grep $1 | grep -v 'grep' | grep -v $0`
result=$(echo $ps_out | grep "$1")
if [[ "$result" == "" ]];then
# echo "Running"
`nohup sails run sync-micro-chain \&`
# else
# echo "Not Running"
fi
# echo $ps_out
sleep 5
done