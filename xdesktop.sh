#!/bin/sh
apt-get update
apt-get upgrade
apt-get install xfce -y
apt-get install task-xfce-desktop -y
systemctl set-default graphical.target
apt-get install xrdp vino -y
apt-get remove tightvncserver
#etc.
