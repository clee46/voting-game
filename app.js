 var photoCollect = [];


function Photo (name, path) {
  this.name = name;
  this.path = path;
  photoCollect.push(this);
}

// returns a random index
calcRandom = function () {
    return Math.floor(Math.random() * photoCollect.length);
}
// makes sure two indices are different
calcNewIndex = function (index1) {
  do {
    var index2 = calcRandom();
    console.log(index2);
  } while (index1 === index2)
  return index2;
}

var amazon = new Photo('Amazon', 'img/amazon.png');
var dropbox = new Photo('Dropbox', 'img/dropbox.png');
var ebay = new Photo('eBay', 'img/eBay.png');
var facebook = new Photo('Facebook', 'img/facebook.png');
var github = new Photo('GitHub', 'img/github.png');
var google = new Photo('Google', 'img/google.png');
var linkedin = new Photo('LinkedIn', 'img/linkedin.png');
var netflix = new Photo('Netflix', 'img/netflix.png');
var reddit = new Photo('Reddit', 'img/reddit.png');
var twitter = new Photo('Twitter', 'img/twitter.png');
var wikipedia = new Photo('Wikipedia', 'img/wikipedia.png');
var youtube = new Photo('YouTube', 'img/youtube.png');

var index1 = calcRandom();
console.log('Index 1: ' + index1);

var index2 = calcNewIndex(index1);
console.log('Index 2: ' + index2);

var picture1 = document.createElement('p');
picture1.innerHTML = '<img src="' + photoCollect[index1].path + '" width="300"/>';
document.body.appendChild(picture1);

var picture2 = document.createElement('p');
picture2.innerHTML = '<img src="' + photoCollect[index2].path + '" width="300"/>';
document.body.appendChild(picture2);

