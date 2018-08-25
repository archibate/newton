V=@

SRCS=N2.node-head.js \
     Class.js Vec2.js World.js Ticker.js Body.js \
     Circle.js Rect.js Render.js \
     N2.node-tail.js

all: build/N2.min.js build/N2.js

clean:
	@echo ' -' build/*
	$V-rm -rf build/*

build/N2.min.js: build/N2.js
	@echo ' +' $@
	$Vtools/jsmin.exe < $< | cat src/N2.version.js - > $@

build/N2.js: $(SRCS:%=src/%)
	@echo ' +' $@
	$Vcat $^ > $@

.PHONY: all clean
