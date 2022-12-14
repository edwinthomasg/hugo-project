// cage.js
const fs = require('fs')
const path = require('path')
const wrap = (module, name, wrapper) => {
  const original = module[name]
  module[name] = wrapper(original)
}
console.log("helo")
wrap(fs, 'readFileSync', (readFileSync) => (...args) => {
  console.log(args)
  const [filepath] = args
  const fullpath = path.resolve(filepath)
  if (fullpath.startsWith('/system/')) {
    throw new Error('You do not have permissions to access this file')
  }
  return readFileSync(...args)
})
// Prevent further changes
Object.freeze(fs)