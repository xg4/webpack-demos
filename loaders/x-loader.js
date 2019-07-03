module.exports = function(content, map, meta) {
  console.log('The loader x is used')
  console.log(this.data)
  return content
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  console.log(remainingRequest, '\n')
  console.log(precedingRequest, '\n')
  console.log(data, '\n')
  // if (somothingFlag()) {
  //   return 'module.exports = require(' + JSON.stringify('-!' + remaining) + ');'
  // }
  data.value = 1
}

// module.exports.raw = true
