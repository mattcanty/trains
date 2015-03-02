var assert = require('chai').assert;
var stations = require('./../stations')

describe('stations', function(){
  describe('find matches', function(){
    it('should return single exact match for exact code', function(done){
      testFindMatches('LAN', [{stationName:'Lancaster', code:'LAN'}], done)
    }),
    it('should return single exact match for exact code lower case', function(done){
      testFindMatches('lan', [{stationName:'Lancaster', code:'LAN'}], done)
    }),
    it('should return single exact match for exact code with whitespace', function(done){
      testFindMatches(' LAN ', [{stationName:'Lancaster', code:'LAN'}], done)
    })
    it('should return single match for exact station name', function(done){
      testFindMatches('london euston', [{stationName:'London Euston', code:'EUS'}], done)
    })
    it('should return multiple results for multiple matches', function(done){
      var expected = [{
        stationName:"Bromley Cross (Lancs)", code:"BMC"
      },{
        stationName:"Bromley North", code:"BMN"
      },{
        stationName:"Bromley South", code:"BMS"
      }]
      
      testFindMatches('bromley', expected, done)
    }),
    it('should return correct result when searching end of station name', function(done){
      testFindMatches('euston', [{stationName:'London Euston', code: 'EUS'}], done)
    })
  })
})

function testFindMatches(query, expected, done){
  stations.findMatches(query, function(err, results){
    assert.equal(expected.length, results.length)
    
    expected.forEach(function(expectedStation){
      var actualStation = results.filter(function(x){
        return expectedStation.code === x.code
      })[0]
      
      assert.equal(expectedStation.code, actualStation.code)
      assert.equal(expectedStation.stationName, actualStation.stationName)
    })
    
    done()
  })
}