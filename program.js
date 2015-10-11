var express = require('express');
var app = express();
var caption = require('caption');
var translator = require('./translator.js');


translator.readJson();

app.use(express.static(__dirname + '/public'));

app.get('/meme/:memeText', function(req, res){
	var correctedText = decodeURI(req.params.memeText);
	res.status(200).send(translator.translateWords(correctedText));
});

app.get('/imager', function(req, res) {
	var correctedTop = decodeURI(req.query.topText);
	var correctedBottom = decodeURI(req.query.bottomText);
	if (correctedBottom){ 
		var correctedText = correctedTop + "*" + correctedBottom;
	}
	else {
		var correctedText = correctedTop;
	}
	//var correctedText = decodeURI(req.params.imageText);
	var fancyText = translator.translateWords(correctedText);

	if (fancyText.indexOf("*") !=-1) {
		var fancyArr = fancyText.split("*");
		caption.path("public/ducreux1.jpg",{
			caption : fancyArr[0],
			bottomCaption : fancyArr[1],
			outputFile : "public/result.jpg"
		} ,function(err,captionedImagePath){
			console.log(captionedImagePath);
			res.status(200).send("<a href=\" http://niceme.me\"><img src=\"" + "/result.jpg" + "\" alt=\"Result\" ></a>");
		});
	} else {
		caption.path("public/ducreux1.jpg",{
			caption : fancyText,
			outputFile : "public/result.jpg"
		} ,function(err,captionedImagePath){
			console.log(captionedImagePath);
			res.status(200).send("<a href=\" http://niceme.me\"><img src=\"" + "/result.jpg" + "\" alt=\"Result\" ></a>");
		});
	}
});

app.listen(8080);
