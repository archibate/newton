V=@

SRCS=N2.node-head.js \
     Class.js Vec2.js World.js Ticker.js \
     AABB.js Body.js Circle.js Rect.js \
     Collide.js Render.js \
     N2.node-tail.js

init-docs: build/N2.min.js build/N2.js
	@echo ' *' init-docs
	$Vcp $^ docs/js/

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
