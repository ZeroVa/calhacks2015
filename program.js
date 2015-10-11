var express = require('express');
var app = express();
var translator = require('./translator.js');

translator.readJson();

app.get('/meme/:memeText', function(req, res){
	var correctedText = decodeURI(req.params.memeText);
	res.send(translator.translateWords(correctedText));
});


app.listen(3000);
