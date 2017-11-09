# transformer-js
[![CircleCI](https://circleci.com/gh/peterjcaulfield/transformer-js/tree/master.svg?style=svg)](https://circleci.com/gh/peterjcaulfield/transformer-js/tree/master)

transformer-js is a library for performing transformations on objects. There are many use cases. One
example is log redaction:

```javascript
import transformer from './transformer-js'

const config = {
  transform: val => '[REDACTED]',
  matchers: [{
    key: /^token/
  }]
}

const transform = transformer(config)

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
<dt><a href="#matcher">matcher</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#transformer">transformer</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="transformerFactory"></a>

## transformerFactory(transformerConfig) ⇒ [<code>transformer</code>](#transformer)
**Kind**: global function  
**Returns**: [<code>transformer</code>](#transformer) - a transformer instance  

| Param | Type | Description |
| --- | --- | --- |
| transformerConfig | <code>Object</code> |  |
| transformerConfig.transform | <code>function</code> | function to compute new value from any value matched by the matcher. If not defined the default transform will be used. |
| transformerConfig.matchers | [<code>Array.&lt;matcher&gt;</code>](#matcher) | array of matcher objects |

<a name="matcher"></a>

## matcher : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| transform | <code>function</code> | default transform that is applied to any value matched unless |
| key | <code>Rejex</code> \| <code>function</code> | used to peform matching on keys. |
| value | <code>Rejex</code> \| <code>function</code> | used to perform matching on values. |

<a name="transformer"></a>

## transformer : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| map | <code>function</code> | executes the transformer and returns a new transformed object |

