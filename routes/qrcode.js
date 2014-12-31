var qrcodeService = require('../services/qrcode');
var userService = require('../services/user');
var session = require('express-session');

module.exports = function(app){
  app.get('/qrcode', function(req, res) {
    res.render('qrcode', { title: 'qrcode' });
  });

  app.put('/qrcode', function(req, res) {
  	res.render('qrcode', {title : 'qrcode'});
  });

  app.post('/qrcode/text', function(req, res) {
  	if(!session.user) return res.send(400, {error: '请先<a href="/login">登录</a>'});
    qrcodeService.createQrcode({
      username : session.user,
      type : 'text',
      info : req.body.text
    }, function(err, data) {
      if(err) return res.send(500, {error: err});
      return res.send(200, {data : data});
    });
  });

  app.delete('/qrcode', function(req, res) {
  	res.render('qrcode', {title : 'qrcode'});
  });

}
