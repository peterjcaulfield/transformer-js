# transformer-js
[![npm version](https://badge.fury.io/js/transformer-js.svg)](https://badge.fury.io/js/transformer-js)
[![codecov](https://codecov.io/gh/peterjcaulfield/transformer-js/branch/master/graph/badge.svg)](https://codecov.io/gh/peterjcaulfield/transformer-js)
[![CircleCI](https://circleci.com/gh/peterjcaulfield/transformer-js/tree/master.svg?style=svg)](https://circleci.com/gh/peterjcaulfield/transformer-js/tree/master)

transformer-js is a library for performing transformations on objects. There are many use cases. One
example is log redaction:

```javascript
import transformerFactory from './transformer-js'

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

{{> main}}
