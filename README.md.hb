# transformer-js

Library for performing transformations on objects. There are many use cases. One
example is log redaction:

```javascript
// log redaction with transformer-js

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

{{> main}}
