var fs = require('fs');
var path = require('path');

	'use strict';
	var dictionary = {},
	readJson = function() {
		var myJson = JSON.parse(fs.readFileSync('shakespeare-dictionary.json'));
		Object.keys(myJson).forEach(function(key){
			dictionary[key] = myJson[key];
		});
	},
	translateWords = function(result) {
		//get rid of "english=" and pluses
		var words = [],
			tempArray = [],
			phrase = '',
			reset = false,
			punctuations = ['.', ',', ':', ';', '?', '!'],
			phraselength, index, concatIndex, newIndex, punctuationIndex, length;

		//Splice out punctuation
		// for(index=0; index < result.length; index++) {
		// 	if ((index < result.length)) {
		// 		if( (index - 1 > 0) && (result[index - 1] != '+')) {
		// 			result = result.substr(0,index+1) + '+' + result.substr(index);
		// 			index++;
		// 		}
		// 		if( (index + 1 < result.length) && (result[index + 1] != '+')) {
		// 			result = result.substr(0,index + 1) + '+' + result.substr(index + 1);
		// 			index += 1;
		// 		}
		// 	}
		// }
		result = result.split(' ').join('+');
		// result = decodeURIComponent(result);
		for(index=0; index < result.length; index++)
		{
			punctuationIndex = punctuations.indexOf(result[index]);
			if(punctuationIndex > -1)
			{
				if( (index - 1 > 0) && (result[index - 1] != '+')) {
					result = result.substr(0,index) + '+' + result.substr(index);
					index++;
				}
				if( (index + 1 < result.length) && (result[index + 1] != '+')) {
					result = result.substr(0,index + 1) + '+' + result.substr(index + 1);
					index++;
				}
			}
		}
		console.log(result);
		// console.log(result);
		words = result.split('+');
		//Actual translation
		for (phraselength = 7; phraselength > 0; phraselength--) {
			for (index = 0; index + phraselength - 1 < words.length; index++) {
				//Concatentate words
				if (index === 0 || reset) {
					for (concatIndex = index; concatIndex < index + phraselength; concatIndex++) {
						if (concatIndex < (index + phraselength - 1)) {
							phrase += (words[concatIndex] + ' ');
						} else {
							phrase += words[concatIndex];
						}
					}
					reset = false;
				} else {
					length = words[index - 1].length + 1;
					phrase = 	phraselength > 1 ? 	phrase.substr(length) + ' ' + words[index + phraselength - 1] :
					phrase.substr(length) +  words[index + phraselength - 1];
				}
				//Checks if phrase is in dictionary
				// phrase = decodeURIComponent(phrase);
				if ((phrase.toLowerCase() in dictionary)) {
					//Make new array
					tempArray = [];
					for (newIndex = 0; newIndex - 1 < words.length - phraselength; newIndex++) {
						if (newIndex < index) {
							tempArray[newIndex] = words[newIndex];
						} else if (newIndex == index) {
							tempArray[newIndex] = dictionary[phrase.toLowerCase()];
						} else {
							tempArray[newIndex] = words[newIndex + phraselength - 1];
						}
					}
					words = tempArray;
					reset = true;
					phrase = '';
				}
			}
			phrase = '';
		}
		//Add spaces. Can't join because of punctuation.
		for (index = 0; index < words.length; index++) {
			if ((punctuations.indexOf(words[index]) > -1) && index > 0) {
				words[index - 1] = words[index - 1].substr(0, words[index - 1].length - 1);
			}
			words[index] = words[index] + ' ';
		}
		return words.join('');
	};
	module.exports.readJson = readJson;
	module.exports.translateWords = translateWords;
