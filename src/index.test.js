import transformer from './index.js'

test('transformer should perform transform when rejex matcher matches key', () => {
  const config = {
    transform: val => '[REDACTED]',
    matchers: [{
      key: /^token/
    }]
  }

  const obj = {
    id: 1,
    token: 'ajw93kuskhgk=='
  }

  const expected = {
    id: 1,
    token: '[REDACTED]'
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})

test('transformer should perform transform when rejex matcher matches value', () => {
  const config = {
    transform: val => '[REDACTED]',
    matchers: [{
      value: /^postgres:\/\//
    }]
  }

  const obj = {
    id: 1,
    conn: 'postgres://user:pass@localhost'
  }

  const expected = {
    id: 1,
    conn: '[REDACTED]'
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})

test('transformer should perform transform when function matcher matches', () => {
  const config = {
    transform: val => '[REDACTED]',
    matchers: [{
      key: key => key === 'token'
    }]
  }

  const obj = {
    id: 1,
    token: 'ajw93kuskhgk=='
  }

  const expected = {
    id: 1,
    token: '[REDACTED]'
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})

test('transformer should perform transform on nested props', () => {
  const config = {
    transform: val => '[REDACTED]',
    matchers: [{
      key: /^token/
    }, {
      key: /^card/
    }]
  }

  const obj = {
    id: 1,
    request: {
      token: 'ajw93kuskhgk==',
      payload: {
        card: '2222-5555-5555-2222',
        status: 'registered'
      }
    }
  }

  const expected = {
    id: 1,
    request: {
      token: '[REDACTED]',
      payload: {
        card: '[REDACTED]',
        status: 'registered'
      }
    }
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})

test('transformer should use matcher transform if defined', () => {
  const config = {
    transform: val => '[REDACTED]',
    matchers: [{
      key: /^token/
    }, {
      key: /^card/,
      transform: val => {
        /* eslint-disable no-unused-vars */
        const [a, b, c, d] = val.split('-')
        return `xxxx-xxxx-xxxx-${d}`
      }
    }]
  }

  const obj = {
    id: 1,
    request: {
      token: 'ajw93kuskhgk==',
      payload: {
        card: '2222-5555-5555-2222',
        status: 'registered'
      }
    }
  }

  const expected = {
    id: 1,
    request: {
      token: '[REDACTED]',
      payload: {
        card: 'xxxx-xxxx-xxxx-2222',
        status: 'registered'
      }
    }
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})

test('transformer should skip key matching with option set', () => {
  const config = {
    matchKeys: false,
    transform: val => '[REDACTED]',
    matchers: [{
      key: /^token/ // should be ignored
    }]
  }

  const obj = {
    id: 1,
    token: 'ajw93kuskhgk=='
  }

  const expected = {
    id: 1,
    token: 'ajw93kuskhgk=='
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})

test('transformer should skip value matching with option set', () => {
  const config = {
    matchValues: false,
    transform: val => '[REDACTED]',
    matchers: [{
      value: /^postgres:\/\//
    }]
  }

  const obj = {
    id: 1,
    conn: 'postgres://user:pass@localhost'
  }

  const expected = {
    id: 1,
    conn: 'postgres://user:pass@localhost'
  }

  const transform = transformer(config)

  expect(transform.map(obj)).toEqual(expected)
})
