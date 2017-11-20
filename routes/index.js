
var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs'); 

router.get('/monupload', function(req, res, next) {
  res.render('index');
});

router.post('/monupload', upload.array('monupload'), function(req, res, next) {
  // traitement du formulaire 
  //fs.rename(req.files[10].path, 'tmp/' + req.files[10].originalname, function(){});
  for (i = 0; i < req.files.length; i++) {  
    if ((req.files[i].mimetype =='image/png') && (req.files[i].size < 3145728))  {
      fs.rename('tmp/' + req.files[i].path, 'public/images/' + req.files[i].originalname, function(){
        res.send('Sucess');
      });
    } else {
      fs.unlink(req.files[i].path, function() {
        res.send('Error');
      }); 
  }
} 
});

module.exports = router;
