V=@

OSRCS=newton.js \
      Vec2.js World.js Ticker.js \
      AABB.js Body.js Circle.js Rect.js \
      Collide.js Render.js

SRCS=$(OSRCS:%=src/%)

all: built-js docs/docs

built-js: build/newton.js build/newton.min.js
	$Vcp $^ docs/js/

docs/docs: $(SRCS)
	@echo ' +' $@
	$Vjsdoc $^ -d $@

clean:
	@echo ' -' build/*
	$V-rm -rf build/*

build/newton.min.js: build/newton.js
	@echo ' +' $@
	$V(sh tools/jsmin.sh < $< > /tmp/$$$$; cat scr/COPYING.js; \
	   tail -n `wc -l /tmp/$$$$ | awk '{print $1}'` < /tmp/$$$$) > $@

build/newton.js: $(SRCS)
	@echo ' +' $@
	$V(cat scr/node-head.js scr/es-class.js; \
		cat $^ | awk -f scr/es-class.awk; \
		cat scr/node-tail.js) > $@

.PHONY: all clean
