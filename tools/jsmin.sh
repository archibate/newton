#!/bin/bash
if which uglifyjs
then exec uglifyjs
else exec tools/jsmin.exe
fi
