exports.fetch = function(json, key) {
  if(key == null) return json
  let path = key.split('.')
  return path.reduce((json, entry) => {
    return json ? json[entry] : undefined
  }, json)
}

exports.shallowMerge = function(source, target) {
  let merge = {}
  for(let key in source) { merge[key] = source[key] }
  for(let key in target) { merge[key] = target[key] }
  return merge
}