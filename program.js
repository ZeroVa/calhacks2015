var express = require('express');
var app = express();
var caption = require('caption');
var translator = require('./translator.js');


translator.readJson();

app.use(express.static(__dirname));

app.get('/meme/:memeText', function(req, res){
	var correctedText = decodeURI(req.params.memeText);
	res.send(translator.translateWords(correctedText));
});

app.get('/imager/:imageText', function(req, res) {
	var correctedText = decodeURI(req.params.imageText);
	var fancyText = translator.translateWords(correctedText);
	caption.path("cat.png",{
		caption : fancyText,
		outputFile : "result.jpg"
	} ,function(err,captionedImagePath){
		console.log(captionedImagePath);
		res.send("<img src=\"" + "http://104.236.147.66:3000/result.jpg" + "\" alt=\"Result\" >");
	});
});

app.listen(3000);
