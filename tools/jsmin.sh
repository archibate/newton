#!/bin/bash
if which uglifyjs > /dev/null
then exec uglifyjs $*
else exec tools/jsmin.exe < $1 > $3
fi
