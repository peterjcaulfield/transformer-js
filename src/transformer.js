const traverse = require('traverse')

const KEY_MATCH = 'key'
const VALUE_MATCH = 'value'

const test = (prop, config, TYPE) => (
  config.find(obj => {
    const matcher = obj[TYPE]
    if (matcher) {
      if (typeof matcher === 'function') {
        return matcher(prop)
      } else if (typeof matcher === 'object') {
        return matcher.test(prop)
      }
    }
    return false
  })
)

const matcher = (prop, config, TYPE) => {
  const match = test(prop, config.matchers, TYPE)
  if (match) {
    return match.transform ? match.transform : config.transform
  }
}

/**
 * @typedef transformer
 * @type Object
 * @property {Function} map - executes the transformer and returns a new
 * transformed object
 */

/**
 * @typedef matcher
 * @type Object
 * @property {Function} [transform] - default transform that is applied to any
 * value matched unless
 * @property {(Rejex|Function)} [key] - used to peform matching on keys.
 * @property {(Rejex|Function)} [value] - used to perform matching on values.
 */

/**
 * @function transformerFactory
 * @param {Object} transformerConfig
 * @param {Function} transformerConfig.transform - function to compute new
 * value from any value matched by the matcher. If not defined the default
 * transform will be used.
 * @param {Array<matcher>} transformerConfig.matchers - array of matcher objects
 * @return {transformer} a transformer instance
 */
const transformerFactory = userConfig => {
  const config = Object.assign(
    {
      matchValues: true,
      matchkeys: true
    },
    userConfig
  )

  const { matchKeys, matchValues } = config
  const map = obj =>
    traverse(obj).map(function (val) {
      let transform
      if (matchKeys === false) {
        if (!this.isLeaf) return
        transform = matcher(val, config, VALUE_MATCH)
      } else if (matchValues === false) {
        transform = matcher(this.key, config, KEY_MATCH)
      } else {
        transform = matcher(this.key, config, KEY_MATCH) || matcher(val, config, VALUE_MATCH)
      }
      if (typeof transform === 'function') {
        this.update(transform(val))
      }
    })

  return { map }
}

export default transformerFactory
