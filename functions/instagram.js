var fetch = require('node-fetch');
var _ = require('lodash');

module.exports = {
  getLatestPhoto: function getLatestPhoto(event, context, callback){
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + process.env.IG_TOKEN, { headers: { 'Accept': 'application/json' } })
      .then((res) => res.json())
      .then((json) => {
        var url = _.get(json, 'data[0].images.standard_resolution.url');
        callback(null, { url: url });
      })
      .catch(e => console.error(e));
  }
}
