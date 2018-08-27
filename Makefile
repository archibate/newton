V=@

OSRCS=N2.js \
      Vec2.js World.js Ticker.js \
      AABB.js Body.js Circle.js Rect.js \
      Collide.js Render.js

SRCS=$(OSRCS:%=src/%)

all: built-js docs/docs

built-js: build/N2.js build/N2.min.js
	$Vcp $^ docs/js/

docs/docs: $(SRCS)
	@echo ' +' $@
	$Vjsdoc $^ -d $@

clean:
	@echo ' -' build/*
	$V-rm -rf build/*

build/N2.min.js: build/N2.js
	@echo ' +' $@
	$V(tools/jsmin.exe < $< > /tmp/$$$$; cat COPYING.js; \
	   tail -n `wc -l /tmp/$$$$ | awk '{print $1}'` < /tmp/$$$$) > $@

build/N2.js: $(SRCS)
	@echo ' +' $@
	$Vcat node-head.js $^ node-tail.js > $@

.PHONY: all clean
