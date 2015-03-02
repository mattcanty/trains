var soap = require('soap');

var url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2014-02-20';

var soapHeader = {
  AccessToken : {
    TokenValue : process.env.NationalRailToken
  }
};

exports.getDepartureBoard = function(stationCode, numRows, callback){
  var args = { numRows : numRows, crs : stationCode.toUpperCase() };
  
  call('GetDepartureBoard', args, function(err, result){
    if(err){
      callback(err)
    }
    
    callback(null, result.GetStationBoardResult)
  });
};

function call(method, args, callback){
  soap.createClient(url, function(err, client){
    
    if(err){ 
      callback(err);
    }
    
    client.addSoapHeader(soapHeader);
    
    client[method](args, function(err, result){
      if(err){
        callback(err);
      }
      
      callback(null, result);
    });
  });
}