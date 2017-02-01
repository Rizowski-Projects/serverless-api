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
      console.log(res.statusCode, err);
      if(!err && res.statusCode === 200){
        var image = _.get(JSON.parse(res.body), 'data[0].images.standard_resolution.url');
        console.log(typeof image, image);
        console.log('YEA THERE IS');
        return r({ url: image }, function(err, res, body){
          callback(null, res.body);
        });
      }
      callback(err);
    });
  }
}
