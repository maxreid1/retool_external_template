/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('../config.js')

// appends to config setting for demo purposes
// config.api.testResponse = `Title from config.js: "${config.api.testResponse}" (additional config has been added via /backend/config.js)`
config.api.testResponse = 'TEST RESPONSE FROM backend/config.js'

module.exports = config