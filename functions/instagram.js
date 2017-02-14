var fetch = require('node-fetch');
var _ = require('lodash');

module.exports = {
  getLatestPhoto: function getLatestPhoto(event, context, callback){
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + process.env.IG_TOKEN, { headers: { 'Accept': 'application/json' } })
      .then((res) => res.json())
      .then((json) => {
        var thing = _.get(json, 'data[0].images.standard_resolution.url');
        console.log(thing);
        return thing;
      })
      .then((url) => fetch(url, { headers : { 'Content-Type': 'image/jpeg' } }))
      .then((res) =>{
        console.log(Object.keys(res.body));
        return new Promise((resolve, reject) =>{
          var data = '';
          res.body.on('data', function (dat){
            data += dat;
          });
          res.body.on('end', function(fin){
            resolve(data);
          });
        })
        .then((image) =>{
          callback(null, image );
        });
      });
  }
}
