<a name="module_N2"></a>

## N2
N2.js, a 2d rigid-body physics engine written in javascript ES6.


* [N2](#module_N2)
    * [~Vec2](#module_N2..Vec2)
        * [new Vec2(x, y)](#new_module_N2..Vec2_new)
        * [.clone()](#module_N2..Vec2+clone) ⇒ <code>Vec2</code>
        * [.lengthSqr()](#module_N2..Vec2+lengthSqr) ⇒ <code>number</code>
        * [.length()](#module_N2..Vec2+length) ⇒ <code>number</code>
        * [.normalize()](#module_N2..Vec2+normalize) ⇒ <code>Vec2</code>
        * [.assign()](#module_N2..Vec2+assign) ⇒ <code>Vec2</code>
        * [.rotatedCCW()](#module_N2..Vec2+rotatedCCW) ⇒ <code>Vec2</code>
        * [.rotatedCW()](#module_N2..Vec2+rotatedCW) ⇒ <code>Vec2</code>
        * [.add(v)](#module_N2..Vec2+add) ⇒ <code>Vec2</code>
        * [.sub(v)](#module_N2..Vec2+sub) ⇒ <code>Vec2</code>
        * [.addOfMultiplied(v, f)](#module_N2..Vec2+addOfMultiplied) ⇒ <code>Vec2</code>
        * [.subOfMultiplied(v, f)](#module_N2..Vec2+subOfMultiplied) ⇒ <code>Vec2</code>
        * [.multiply(f)](#module_N2..Vec2+multiply) ⇒ <code>Vec2</code>
        * [.dot(v)](#module_N2..Vec2+dot) ⇒ <code>number</code>
        * [.cross(v)](#module_N2..Vec2+cross) ⇒ <code>number</code>
        * [.angle(v)](#module_N2..Vec2+angle) ⇒ <code>number</code>
        * [.distanceSqr(v)](#module_N2..Vec2+distanceSqr) ⇒ <code>number</code>
        * [.distance(v)](#module_N2..Vec2+distance) ⇒ <code>number</code>
    * [~World](#module_N2..World)
        * [.start()](#module_N2..World+start)
        * [.pause()](#module_N2..World+pause)
        * [.tick(dt)](#module_N2..World+tick)
        * [.add(body)](#module_N2..World+add)
        * [.onTick(callback)](#module_N2..World+onTick)
    * [~Ticker](#module_N2..Ticker)
        * [.timeout(callback, timeStep)](#module_N2..Ticker+timeout) ⇒ <code>number</code>
        * [.cancel(The)](#module_N2..Ticker+cancel)
    * [~AABB](#module_N2..AABB)
    * [~Body](#module_N2..Body)
        * [.applyImpulse(impulse, point)](#module_N2..Body+applyImpulse)
        * [.tick(dt)](#module_N2..Body+tick)
    * [~Circle](#module_N2..Circle) ⇐ <code>Body</code>
    * [~Rect](#module_N2..Rect) ⇐ <code>Body</code>
    * [~Render](#module_N2..Render)
        * [new Render(selector)](#new_module_N2..Render_new)
        * [.clear()](#module_N2..Render+clear)
        * [.circle(x, y, r, rotation)](#module_N2..Render+circle)
        * [.rect(x, y, w, h, rotation)](#module_N2..Render+rect)

<a name="module_N2..Vec2"></a>

### N2~Vec2
Class representing a (2d) vector, and a point.

**Kind**: inner class of [<code>N2</code>](#module_N2)  

* [~Vec2](#module_N2..Vec2)
    * [new Vec2(x, y)](#new_module_N2..Vec2_new)
    * [.clone()](#module_N2..Vec2+clone) ⇒ <code>Vec2</code>
    * [.lengthSqr()](#module_N2..Vec2+lengthSqr) ⇒ <code>number</code>
    * [.length()](#module_N2..Vec2+length) ⇒ <code>number</code>
    * [.normalize()](#module_N2..Vec2+normalize) ⇒ <code>Vec2</code>
    * [.assign()](#module_N2..Vec2+assign) ⇒ <code>Vec2</code>
    * [.rotatedCCW()](#module_N2..Vec2+rotatedCCW) ⇒ <code>Vec2</code>
    * [.rotatedCW()](#module_N2..Vec2+rotatedCW) ⇒ <code>Vec2</code>
    * [.add(v)](#module_N2..Vec2+add) ⇒ <code>Vec2</code>
    * [.sub(v)](#module_N2..Vec2+sub) ⇒ <code>Vec2</code>
    * [.addOfMultiplied(v, f)](#module_N2..Vec2+addOfMultiplied) ⇒ <code>Vec2</code>
    * [.subOfMultiplied(v, f)](#module_N2..Vec2+subOfMultiplied) ⇒ <code>Vec2</code>
    * [.multiply(f)](#module_N2..Vec2+multiply) ⇒ <code>Vec2</code>
    * [.dot(v)](#module_N2..Vec2+dot) ⇒ <code>number</code>
    * [.cross(v)](#module_N2..Vec2+cross) ⇒ <code>number</code>
    * [.angle(v)](#module_N2..Vec2+angle) ⇒ <code>number</code>
    * [.distanceSqr(v)](#module_N2..Vec2+distanceSqr) ⇒ <code>number</code>
    * [.distance(v)](#module_N2..Vec2+distance) ⇒ <code>number</code>

<a name="new_module_N2..Vec2_new"></a>

#### new Vec2(x, y)
Create a vector.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x coordinate. |
| y | <code>number</code> | The y coordinate. |

<a name="module_N2..Vec2+clone"></a>

#### vec2.clone() ⇒ <code>Vec2</code>
Clone this vector a new instance.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - The cloned vector.  
<a name="module_N2..Vec2+lengthSqr"></a>

#### vec2.lengthSqr() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The squared length.  
<a name="module_N2..Vec2+length"></a>

#### vec2.length() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The length of vector.  
<a name="module_N2..Vec2+normalize"></a>

#### vec2.normalize() ⇒ <code>Vec2</code>
Normalize the vector.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  
<a name="module_N2..Vec2+assign"></a>

#### vec2.assign() ⇒ <code>Vec2</code>
Assign with another vector.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  
<a name="module_N2..Vec2+rotatedCCW"></a>

#### vec2.rotatedCCW() ⇒ <code>Vec2</code>
rotate counter clock wise with 90 degrees.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Rotated result.  
<a name="module_N2..Vec2+rotatedCW"></a>

#### vec2.rotatedCW() ⇒ <code>Vec2</code>
rotate clock wise with 90 degrees.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Rotated result.  
<a name="module_N2..Vec2+add"></a>

#### vec2.add(v) ⇒ <code>Vec2</code>
Add another vector to this.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vec2</code> | another vector. |

<a name="module_N2..Vec2+sub"></a>

#### vec2.sub(v) ⇒ <code>Vec2</code>
Subtract another vector from this.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vec2</code> | another vector. |

<a name="module_N2..Vec2+addOfMultiplied"></a>

#### vec2.addOfMultiplied(v, f) ⇒ <code>Vec2</code>
Same as this.add(v.multiply(f)).

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vec2</code> | another vector. |
| f | <code>number</code> | the scale of another vector. |

<a name="module_N2..Vec2+subOfMultiplied"></a>

#### vec2.subOfMultiplied(v, f) ⇒ <code>Vec2</code>
Same as this.sub(v.multiply(f)).

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>Vec2</code> | another vector. |
| f | <code>number</code> | the scale of another vector. |

<a name="module_N2..Vec2+multiply"></a>

#### vec2.multiply(f) ⇒ <code>Vec2</code>
Multiply a scalar to this vector.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>Vec2</code> - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>number</code> | the scalar. |

<a name="module_N2..Vec2+dot"></a>

#### vec2.dot(v) ⇒ <code>number</code>
Calculate the dot product with another vector.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The dot product.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another vector. |

<a name="module_N2..Vec2+cross"></a>

#### vec2.cross(v) ⇒ <code>number</code>
Calculate the (2d) cross product with another vector.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The (2d) cross product.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another vector. |

<a name="module_N2..Vec2+angle"></a>

#### vec2.angle(v) ⇒ <code>number</code>
Calculate the angle between this and another vector.

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The angle between them.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another vector. |

<a name="module_N2..Vec2+distanceSqr"></a>

#### vec2.distanceSqr(v) ⇒ <code>number</code>
Calculate the squared distance between two point (i.e. vector).

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The squared distance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another point (vector). |

<a name="module_N2..Vec2+distance"></a>

#### vec2.distance(v) ⇒ <code>number</code>
Calculate the distance between two point (i.e. vector).

**Kind**: instance method of [<code>Vec2</code>](#module_N2..Vec2)  
**Returns**: <code>number</code> - The distance between them.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another point (vector). |

<a name="module_N2..World"></a>

### N2~World
Class representing a World.
Contain multiple, variable of bodies.

**Kind**: inner class of [<code>N2</code>](#module_N2)  

* [~World](#module_N2..World)
    * [.start()](#module_N2..World+start)
    * [.pause()](#module_N2..World+pause)
    * [.tick(dt)](#module_N2..World+tick)
    * [.add(body)](#module_N2..World+add)
    * [.onTick(callback)](#module_N2..World+onTick)

<a name="module_N2..World+start"></a>

#### world.start()
Start acting the world by time.

**Kind**: instance method of [<code>World</code>](#module_N2..World)  
<a name="module_N2..World+pause"></a>

#### world.pause()
Pause the world.

**Kind**: instance method of [<code>World</code>](#module_N2..World)  
<a name="module_N2..World+tick"></a>

#### world.tick(dt)
Timer tick callback.

**Kind**: instance method of [<code>World</code>](#module_N2..World)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time passed. |

<a name="module_N2..World+add"></a>

#### world.add(body)
Add a body to the current world.

**Kind**: instance method of [<code>World</code>](#module_N2..World)  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Body</code> | The body to add. |

<a name="module_N2..World+onTick"></a>

#### world.onTick(callback)
Set timer tick callback.

**Kind**: instance method of [<code>World</code>](#module_N2..World)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Called on an timer tick(). |

<a name="module_N2..Ticker"></a>

### N2~Ticker
Class to control timer ticks.

**Kind**: inner class of [<code>N2</code>](#module_N2)  

* [~Ticker](#module_N2..Ticker)
    * [.timeout(callback, timeStep)](#module_N2..Ticker+timeout) ⇒ <code>number</code>
    * [.cancel(The)](#module_N2..Ticker+cancel)

<a name="module_N2..Ticker+timeout"></a>

#### ticker.timeout(callback, timeStep) ⇒ <code>number</code>
Set a timeout callback.

**Kind**: instance method of [<code>Ticker</code>](#module_N2..Ticker)  
**Returns**: <code>number</code> - The timer id.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Called when timeStep passed. |
| timeStep | <code>function</code> | How long to call. |

<a name="module_N2..Ticker+cancel"></a>

#### ticker.cancel(The)
Cancel the given timer.

**Kind**: instance method of [<code>Ticker</code>](#module_N2..Ticker)  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | timer id. |

<a name="module_N2..AABB"></a>

### N2~AABB
Class representing an AABB box.
Use for pre-collision detect. (uncompleted)

**Kind**: inner class of [<code>N2</code>](#module_N2)  
<a name="module_N2..Body"></a>

### N2~Body
Class representing a rigid body.

**Kind**: inner class of [<code>N2</code>](#module_N2)  

* [~Body](#module_N2..Body)
    * [.applyImpulse(impulse, point)](#module_N2..Body+applyImpulse)
    * [.tick(dt)](#module_N2..Body+tick)

<a name="module_N2..Body+applyImpulse"></a>

#### body.applyImpulse(impulse, point)
Apply an impulse on a specific point.

**Kind**: instance method of [<code>Body</code>](#module_N2..Body)  

| Param | Type | Description |
| --- | --- | --- |
| impulse | <code>Vec2</code> | the impulse vector. |
| point | <code>Vec2</code> | the point it acts. |

<a name="module_N2..Body+tick"></a>

#### body.tick(dt)
Timer tick callback.

**Kind**: instance method of [<code>Body</code>](#module_N2..Body)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time passed. |

<a name="module_N2..Circle"></a>

### N2~Circle ⇐ <code>Body</code>
A kind of rigid-body: a circle (i.e. 2d ball).

**Kind**: inner class of [<code>N2</code>](#module_N2)  
**Extends**: <code>Body</code>  
<a name="module_N2..Rect"></a>

### N2~Rect ⇐ <code>Body</code>
A kind of rigid-body: a rectangle.

**Kind**: inner class of [<code>N2</code>](#module_N2)  
**Extends**: <code>Body</code>  
<a name="module_N2..Render"></a>

### N2~Render
The class used to render objects on canvas.

**Kind**: inner class of [<code>N2</code>](#module_N2)  

* [~Render](#module_N2..Render)
    * [new Render(selector)](#new_module_N2..Render_new)
    * [.clear()](#module_N2..Render+clear)
    * [.circle(x, y, r, rotation)](#module_N2..Render+circle)
    * [.rect(x, y, w, h, rotation)](#module_N2..Render+rect)

<a name="new_module_N2..Render_new"></a>

#### new Render(selector)
Create a render instance.


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The query selector. |

<a name="module_N2..Render+clear"></a>

#### render.clear()
Clear the canvas.

**Kind**: instance method of [<code>Render</code>](#module_N2..Render)  
<a name="module_N2..Render+circle"></a>

#### render.circle(x, y, r, rotation)
Draw a circle.

**Kind**: instance method of [<code>Render</code>](#module_N2..Render)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x cooridate of center. |
| y | <code>number</code> | The y cooridate of center. |
| r | <code>number</code> | The radius of the circle. |
| rotation | <code>number</code> | The rotated angle of the circle. |

<a name="module_N2..Render+rect"></a>

#### render.rect(x, y, w, h, rotation)
Draw a rectangle.

**Kind**: instance method of [<code>Render</code>](#module_N2..Render)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x cooridate of center. |
| y | <code>number</code> | The y cooridate of center. |
| w | <code>number</code> | The width of the rectangle. |
| h | <code>number</code> | The height of the rectangle. |
| rotation | <code>number</code> | The rotated angle of the rectangle. |

