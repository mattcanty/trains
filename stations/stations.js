var stationCodes = require('./stationCodes').stationCodes

exports.findMatches = function(query, callback){
  var query = query.toUpperCase().trim()
  var matches = new Array();
  var exactMatches = new Array();
  
  var exactMatchResults = stationCodes.forEach(function(stationCode){
    var stationName = stationCode.stationName.toUpperCase();
    
    if(query === stationCode.code || query === stationName){
      exactMatches.push(stationCode)
      return
    }
    
    if(stationCode.code.indexOf(query) > -1 || stationName.indexOf(query) > -1){
      matches.push(stationCode)
    }
  })
  
  if(exactMatches.length == 1){
    callback(null, exactMatches)
    return
  }
  
  callback(null, matches)
}