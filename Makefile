V=@

SRCS=N2.version.js N2.node-head.js \
     Vec2.js World.js Ticker.js \
     AABB.js Body.js Circle.js Rect.js \
     Collide.js Render.js \
     N2.node-tail.js

all: built-js docs/API.html

built-js: build/N2.js build/N2.min.js
	$Vcp $^ docs/js/

docs/API.html: docs/API.md
	@echo ' +' $@
	$Vmarked docs/API.md > docs/API.html

docs/API.md: build/N2.js
	@echo ' +' $@
	$Vjsdoc2md build/N2.js > docs/API.md

clean:
	@echo ' -' build/*
	$V-rm -rf build/*

build/N2.min.js: build/N2.js
	@echo ' +' $@
	$V(tools/jsmin.exe < $< > /tmp/$$$$; cat src/N2.version.js; \
	   tail -n `wc -l /tmp/$$$$ | awk '{print $1}'` < /tmp/$$$$) > $@

build/N2.js: $(SRCS:%=src/%)
	@echo ' +' $@
	$Vcat $^ > $@

.PHONY: all clean
