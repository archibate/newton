## Classes

<dl>
<dt><a href="#Vec2">Vec2</a></dt>
<dd><p>Class representing a (2d) vector, and a point.</p>
</dd>
<dt><a href="#World">World</a></dt>
<dd><p>Class representing a World.
Contain multiple, variable of bodies.</p>
</dd>
<dt><a href="#Ticker">Ticker</a></dt>
<dd><p>Class to control timer ticks.</p>
</dd>
<dt><a href="#AABB">AABB</a></dt>
<dd><p>Class representing an AABB box.
Use for pre-collision detect. (uncompleted)</p>
</dd>
<dt><a href="#Body">Body</a></dt>
<dd><p>Class representing a rigid body.</p>
</dd>
<dt><a href="#Circle">Circle</a> ⇐ <code><a href="#Body">Body</a></code></dt>
<dd><p>A kind of rigid-body: a circle (i.e. 2d ball).</p>
</dd>
<dt><a href="#Rect">Rect</a> ⇐ <code><a href="#Body">Body</a></code></dt>
<dd><p>A kind of rigid-body: a rectangle.</p>
</dd>
<dt><a href="#Render">Render</a></dt>
<dd><p>The class used to render objects on canvas.</p>
</dd>
</dl>

<a name="Vec2"></a>

## Vec2
Class representing a (2d) vector, and a point.

**Kind**: global class  

* [Vec2](#Vec2)
    * [new Vec2(x, y)](#new_Vec2_new)
    * [.clone()](#Vec2+clone) ⇒ [<code>Vec2</code>](#Vec2)
    * [.lengthSqr()](#Vec2+lengthSqr) ⇒ <code>number</code>
    * [.length()](#Vec2+length) ⇒ <code>number</code>
    * [.normalize()](#Vec2+normalize) ⇒ [<code>Vec2</code>](#Vec2)
    * [.assign()](#Vec2+assign) ⇒ [<code>Vec2</code>](#Vec2)
    * [.rotatedCCW()](#Vec2+rotatedCCW) ⇒ [<code>Vec2</code>](#Vec2)
    * [.rotatedCW()](#Vec2+rotatedCW) ⇒ [<code>Vec2</code>](#Vec2)
    * [.add(v)](#Vec2+add) ⇒ [<code>Vec2</code>](#Vec2)
    * [.sub(v)](#Vec2+sub) ⇒ [<code>Vec2</code>](#Vec2)
    * [.addOfMultiplied(v, f)](#Vec2+addOfMultiplied) ⇒ [<code>Vec2</code>](#Vec2)
    * [.subOfMultiplied(v, f)](#Vec2+subOfMultiplied) ⇒ [<code>Vec2</code>](#Vec2)
    * [.multiply(f)](#Vec2+multiply) ⇒ [<code>Vec2</code>](#Vec2)
    * [.dot(v)](#Vec2+dot) ⇒ <code>number</code>
    * [.cross(v)](#Vec2+cross) ⇒ <code>number</code>
    * [.angle(v)](#Vec2+angle) ⇒ <code>number</code>
    * [.distanceSqr(v)](#Vec2+distanceSqr) ⇒ <code>number</code>
    * [.distance(v)](#Vec2+distance) ⇒ <code>number</code>

<a name="new_Vec2_new"></a>

### new Vec2(x, y)
Create a vector.


| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x coordinate. |
| y | <code>number</code> | The y coordinate. |

<a name="Vec2+clone"></a>

### vec2.clone() ⇒ [<code>Vec2</code>](#Vec2)
Clone this vector a new instance.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - The cloned vector.  
<a name="Vec2+lengthSqr"></a>

### vec2.lengthSqr() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The squared length.  
<a name="Vec2+length"></a>

### vec2.length() ⇒ <code>number</code>
**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The length of vector.  
<a name="Vec2+normalize"></a>

### vec2.normalize() ⇒ [<code>Vec2</code>](#Vec2)
Normalize the vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  
<a name="Vec2+assign"></a>

### vec2.assign() ⇒ [<code>Vec2</code>](#Vec2)
Assign with another vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  
<a name="Vec2+rotatedCCW"></a>

### vec2.rotatedCCW() ⇒ [<code>Vec2</code>](#Vec2)
rotate counter clock wise with 90 degrees.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Rotated result.  
<a name="Vec2+rotatedCW"></a>

### vec2.rotatedCW() ⇒ [<code>Vec2</code>](#Vec2)
rotate clock wise with 90 degrees.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Rotated result.  
<a name="Vec2+add"></a>

### vec2.add(v) ⇒ [<code>Vec2</code>](#Vec2)
Add another vector to this.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | [<code>Vec2</code>](#Vec2) | another vector. |

<a name="Vec2+sub"></a>

### vec2.sub(v) ⇒ [<code>Vec2</code>](#Vec2)
Subtract another vector from this.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | [<code>Vec2</code>](#Vec2) | another vector. |

<a name="Vec2+addOfMultiplied"></a>

### vec2.addOfMultiplied(v, f) ⇒ [<code>Vec2</code>](#Vec2)
Same as this.add(v.multiply(f)).

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | [<code>Vec2</code>](#Vec2) | another vector. |
| f | <code>number</code> | the scale of another vector. |

<a name="Vec2+subOfMultiplied"></a>

### vec2.subOfMultiplied(v, f) ⇒ [<code>Vec2</code>](#Vec2)
Same as this.sub(v.multiply(f)).

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| v | [<code>Vec2</code>](#Vec2) | another vector. |
| f | <code>number</code> | the scale of another vector. |

<a name="Vec2+multiply"></a>

### vec2.multiply(f) ⇒ [<code>Vec2</code>](#Vec2)
Multiply a scalar to this vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - Instance of this.  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>number</code> | the scalar. |

<a name="Vec2+dot"></a>

### vec2.dot(v) ⇒ <code>number</code>
Calculate the dot product with another vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The dot product.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another vector. |

<a name="Vec2+cross"></a>

### vec2.cross(v) ⇒ <code>number</code>
Calculate the (2d) cross product with another vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The (2d) cross product.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another vector. |

<a name="Vec2+angle"></a>

### vec2.angle(v) ⇒ <code>number</code>
Calculate the angle between this and another vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The angle between them.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another vector. |

<a name="Vec2+distanceSqr"></a>

### vec2.distanceSqr(v) ⇒ <code>number</code>
Calculate the squared distance between two point (i.e. vector).

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The squared distance.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another point (vector). |

<a name="Vec2+distance"></a>

### vec2.distance(v) ⇒ <code>number</code>
Calculate the distance between two point (i.e. vector).

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - The distance between them.  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | another point (vector). |

<a name="World"></a>

## World
Class representing a World.
Contain multiple, variable of bodies.

**Kind**: global class  

* [World](#World)
    * [.start()](#World+start)
    * [.pause()](#World+pause)
    * [.tick(dt)](#World+tick)
    * [.add(body)](#World+add)
    * [.onTick(callback)](#World+onTick)

<a name="World+start"></a>

### world.start()
Start acting the world by time.

**Kind**: instance method of [<code>World</code>](#World)  
<a name="World+pause"></a>

### world.pause()
Pause the world.

**Kind**: instance method of [<code>World</code>](#World)  
<a name="World+tick"></a>

### world.tick(dt)
Timer tick callback.

**Kind**: instance method of [<code>World</code>](#World)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time passed. |

<a name="World+add"></a>

### world.add(body)
Add a body to the current world.

**Kind**: instance method of [<code>World</code>](#World)  

| Param | Type | Description |
| --- | --- | --- |
| body | [<code>Body</code>](#Body) | The body to add. |

<a name="World+onTick"></a>

### world.onTick(callback)
Set timer tick callback.

**Kind**: instance method of [<code>World</code>](#World)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Called on an timer tick(). |

<a name="Ticker"></a>

## Ticker
Class to control timer ticks.

**Kind**: global class  

* [Ticker](#Ticker)
    * [.timeout(callback, timeStep)](#Ticker+timeout) ⇒ <code>number</code>
    * [.cancel(The)](#Ticker+cancel)

<a name="Ticker+timeout"></a>

### ticker.timeout(callback, timeStep) ⇒ <code>number</code>
Set a timeout callback.

**Kind**: instance method of [<code>Ticker</code>](#Ticker)  
**Returns**: <code>number</code> - The timer id.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Called when timeStep passed. |
| timeStep | <code>function</code> | How long to call. |

<a name="Ticker+cancel"></a>

### ticker.cancel(The)
Cancel the given timer.

**Kind**: instance method of [<code>Ticker</code>](#Ticker)  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | timer id. |

<a name="AABB"></a>

## AABB
Class representing an AABB box.
Use for pre-collision detect. (uncompleted)

**Kind**: global class  
<a name="Body"></a>

## Body
Class representing a rigid body.

**Kind**: global class  

* [Body](#Body)
    * [.applyImpulse(impulse, point)](#Body+applyImpulse)
    * [.tick(dt)](#Body+tick)

<a name="Body+applyImpulse"></a>

### body.applyImpulse(impulse, point)
Apply an impulse on a specific point.

**Kind**: instance method of [<code>Body</code>](#Body)  

| Param | Type | Description |
| --- | --- | --- |
| impulse | [<code>Vec2</code>](#Vec2) | the impulse vector. |
| point | [<code>Vec2</code>](#Vec2) | the point it acts. |

<a name="Body+tick"></a>

### body.tick(dt)
Timer tick callback.

**Kind**: instance method of [<code>Body</code>](#Body)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time passed. |

<a name="Circle"></a>

## Circle ⇐ [<code>Body</code>](#Body)
A kind of rigid-body: a circle (i.e. 2d ball).

**Kind**: global class  
**Extends**: [<code>Body</code>](#Body)  

* [Circle](#Circle) ⇐ [<code>Body</code>](#Body)
    * [.applyImpulse(impulse, point)](#Body+applyImpulse)
    * [.tick(dt)](#Body+tick)

<a name="Body+applyImpulse"></a>

### circle.applyImpulse(impulse, point)
Apply an impulse on a specific point.

**Kind**: instance method of [<code>Circle</code>](#Circle)  

| Param | Type | Description |
| --- | --- | --- |
| impulse | [<code>Vec2</code>](#Vec2) | the impulse vector. |
| point | [<code>Vec2</code>](#Vec2) | the point it acts. |

<a name="Body+tick"></a>

### circle.tick(dt)
Timer tick callback.

**Kind**: instance method of [<code>Circle</code>](#Circle)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time passed. |

<a name="Rect"></a>

## Rect ⇐ [<code>Body</code>](#Body)
A kind of rigid-body: a rectangle.

**Kind**: global class  
**Extends**: [<code>Body</code>](#Body)  

* [Rect](#Rect) ⇐ [<code>Body</code>](#Body)
    * [.applyImpulse(impulse, point)](#Body+applyImpulse)
    * [.tick(dt)](#Body+tick)

<a name="Body+applyImpulse"></a>

### rect.applyImpulse(impulse, point)
Apply an impulse on a specific point.

**Kind**: instance method of [<code>Rect</code>](#Rect)  

| Param | Type | Description |
| --- | --- | --- |
| impulse | [<code>Vec2</code>](#Vec2) | the impulse vector. |
| point | [<code>Vec2</code>](#Vec2) | the point it acts. |

<a name="Body+tick"></a>

### rect.tick(dt)
Timer tick callback.

**Kind**: instance method of [<code>Rect</code>](#Rect)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time passed. |

<a name="Render"></a>

## Render
The class used to render objects on canvas.

**Kind**: global class  

* [Render](#Render)
    * [new Render(selector)](#new_Render_new)
    * [.clear()](#Render+clear)
    * [.circle(x, y, r, rotation)](#Render+circle)
    * [.rect(x, y, w, h, rotation)](#Render+rect)

<a name="new_Render_new"></a>

### new Render(selector)
Create a render instance.


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The query selector. |

<a name="Render+clear"></a>

### render.clear()
Clear the canvas.

**Kind**: instance method of [<code>Render</code>](#Render)  
<a name="Render+circle"></a>

### render.circle(x, y, r, rotation)
Draw a circle.

**Kind**: instance method of [<code>Render</code>](#Render)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x cooridate of center. |
| y | <code>number</code> | The y cooridate of center. |
| r | <code>number</code> | The radius of the circle. |
| rotation | <code>number</code> | The rotated angle of the circle. |

<a name="Render+rect"></a>

### render.rect(x, y, w, h, rotation)
Draw a rectangle.

**Kind**: instance method of [<code>Render</code>](#Render)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x cooridate of center. |
| y | <code>number</code> | The y cooridate of center. |
| w | <code>number</code> | The width of the rectangle. |
| h | <code>number</code> | The height of the rectangle. |
| rotation | <code>number</code> | The rotated angle of the rectangle. |

