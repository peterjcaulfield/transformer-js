# transformer-js

Library for performing transformations on objects. There are many use cases. One
example is log redaction:

```javascript
// log redaction with transformer-js

import transformerFactory from 'transformer-js'

const config = {
  transform: val => '[REDACTED]',
  matchers: [{
    key: /^token/
  }]
}

const transform = transformerFactory(config)


const logObj = {
  id: 1,
  token: 'dfadf2334hjlkjkxxnqqkkq4=='
}

console.log(transform.map(logObj))


// outputs

{
  id: 1,
  token: '[REDACTED]'
}
```

Examples directory coming soon...

## API

## Functions

<dl>
<dt><a href="#transformerFactory">transformerFactory(transformerConfig)</a> ⇒ <code><a href="#transformer">transformer</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#transformer">transformer</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="transformerFactory"></a>

## transformerFactory(transformerConfig) ⇒ [<code>transformer</code>](#transformer)
**Kind**: global function  
**Returns**: [<code>transformer</code>](#transformer) - - a transformer instance  

| Param | Type | Description |
| --- | --- | --- |
| transformerConfig | <code>Object</code> |  |
| transformerConfig.transform | <code>function</code> | function to compute new value from any value matched by the matcher. If not defined the default transform will be used. |
| transformerConfig.key | <code>Rejex</code> \| <code>function</code> | used to peform matching on keys. |
| transformerConfig.value | <code>Rejex</code> \| <code>function</code> | used to perform matching on values. |

<a name="transformer"></a>

## transformer : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| map | <code>function</code> | executes the transformer and returns a new transformed object |

