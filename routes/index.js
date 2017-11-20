var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

/* GET home page. */
router.get('/monupload', function(req, res, next) {
  res.render('index');
});

router.post('/monupload', upload.array('monup', 4), function(req, res, next) {
	for (i = 0; i < req.files.length; i++) {  
		if ((req.files[i].mimetype =='image/png'||req.files[i].mimetype =='image/jpeg') && (req.files[i].size < 3145728))  {
			console.log(req.files[i]);
			fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname);
		} else {
		  fs.unlink(req.files[i].path, function() {
			res.send('Error');
		  }); 
	  }
	} 			
	res.send('Success');
	
	});
	
	module.exports = router;
