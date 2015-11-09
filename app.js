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

displayPhotos = function () {
  var index1 = calcRandom();
  var index2 = calcNewIndex(index1);

  var picture1 = document.getElementById('img1');
  picture1.setAttribute('src', photoCollect[index1].path);
  picture1.setAttribute('width', '300');
  picture1.addEventListener('click', displayPhotos);
  document.body.appendChild(picture1);

  var picture2 = document.getElementById('img2');
  picture2.setAttribute('src', photoCollect[index2].path);
  picture2.setAttribute('width', '300');
  picture2.addEventListener('click', displayPhotos);
  document.body.appendChild(picture2);
}
displayPhotos();



