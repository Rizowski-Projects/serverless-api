var r = require('request');
var _ = require('lodash');

module.exports = {
  getLatestPhoto: function getLatestPhoto(event, context, callback){
    r({
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + process.env.IG_TOKEN,
      headers: {
        accept: 'application/json'
      }
    }, function(err, res, body){
      if(!err && res.statusCode === 200){
        var image = _.get(JSON.parse(res.body), 'data[0].images.standard_resolution.url');
        return r({ url: image, encoding: null }, function(err, res, body){
          callback(null, res.body.toString('ascii') );
        });
      }
      callback(err);
    });
  }
}
