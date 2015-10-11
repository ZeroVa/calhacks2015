var memecanvas = require('memecanvas');
memecanvas.init('./tmp', '-meme');
memecanvas.generate('./photo.png', 'Top of Meme', 'Bottom of Meme', function(error, memefilename){
    if(error){
        console.log(error);
    } else {
        console.log(memefilename);
    }
});