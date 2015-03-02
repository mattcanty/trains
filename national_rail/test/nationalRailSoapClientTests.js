var assert = require('chai').assert;
var nationalRailClient = require('./../nationalRailSoapClient');

describe('national rail soap client', function(){
  this.timeout(5000);
  describe('get departure board', function(){
    it('should return data for Lancaster', function(done){
      nationalRailClient.getDepartureBoard('lan', 1, function(err, result){
        var service = result.trainServices.service[0];
        
        assert.equal(err, null);
        assert.equal(result.locationName, 'Lancaster');
        assert.typeOf(service.origin.location[0].locationName, 'string');
        assert.typeOf(service.destination.location[0].locationName, 'string');
        assert.typeOf(service.std, 'string');
        assert.typeOf(service.etd, 'string');
        assert.typeOf(service.platform, 'string');
        assert.typeOf(service.operator, 'string');
        assert.typeOf(service.operatorCode, 'string');
        assert.typeOf(service.serviceID, 'string');
        
        done();
      });
    });
  });
});