// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
const pdf      = require('html-pdf');
const path     = require("path");
const multer   = require("multer");
var fs = require('fs');
var cors = require('cors')



// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors())

var port     = process.env.PORT || 5000; // set our port


const storage = multer.diskStorage({
	destination: "./public/",
	filename: function(req, file, cb){
	   cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
	}
 });
 
const upload = multer({
	storage: storage,
	limits:{fileSize: 10000000},
}).single("myImage");

const dynamicResume = require('./theme/resume');

const options = {
	"height": "10.5in",        // allowed units: mm, cm, in, px
	"width": "8in",            // allowed units: mm, cm, in, pxI
};
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


// ----------------------------------------------------
router.route('/')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		upload(req, res, (err) => {
			if(!req.file) {
				return res.status(400).send({ error: 'File not found'});
			}

			if(!req.body.name) {
				return res.status(400).send({ error: 'Name is required' });
			}
			const userName = req.body.name;
			const lowercaseName = userName.toLowerCase();
			const noSpaceName = lowercaseName.replace(' ', '');
			const shortName = noSpaceName.slice(0, 10);
			console.log("short name: ", shortName);
		
		
			let themeOptions = {
				leftTextColor: "rgb(91, 88, 255)",
				leftBackgroundColor: 'rgb(12, 36, 58)',
				wholeBodyColor: ' rgb(183, 182, 255)',
				rightTextColor: 'rgb(12, 36, 58)'
			};

			if(!err)
				pdf.create(dynamicResume(req.body, themeOptions, req.file.path), options).toStream((err, stream) => {
					if (err) return res.end(err.stack)
					res.setHeader('Content-type', 'application/pdf')
					// fs.unlinkSync(req.file.path);
					fs.unlink(req.file.path,function(err){
						if(err) return res.end(err);
						stream.pipe(res)
					});
				})
			if(err)
				res.status(500).send({ error: err.stack})
				
		 });

		
	})



// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
