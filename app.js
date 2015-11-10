var photoAlbum = [];
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
var photoTracker = new Tracker(photoAlbum);

function Photo (site, path) {
  this.site = site;
  this.path = path;
  this.votes = 0;
  photoAlbum.push(this);
}

function Tracker (photos) {
  this.photoCollect = photos;
  this.temp = document.getElementById('temp');

  this.calcRandom = function () {
      return Math.floor(Math.random() * this.photoCollect.length);
  }

  this.calcNewIndex = function (index1) {
    do {
      var index2 = this.calcRandom();
    } while (index1 === index2)
    return index2;
  }

  this.displayPhotos = function () {
    var index1 = this.calcRandom();
    var index2 = this.calcNewIndex(index1);

    this.picture1 = document.createElement('img');
    this.picture2 = document.createElement('img');

    this.picture1.setAttribute('src', this.photoCollect[index1].path);
    this.picture1.setAttribute('width', '300');

    this.picture2.setAttribute('src', this.photoCollect[index2].path);
    this.picture2.setAttribute('width', '300');

    this.temp.appendChild(this.picture1);
    this.temp.appendChild(this.picture2);

    this.picture1.addEventListener('click', function(){photoTracker.vote(index1)});
    this.picture2.addEventListener('click', function(){photoTracker.vote(index2)});
  }

  this.vote = function (index) {
    console.log(this.photoCollect[index].site + ' had ' + this.photoCollect[index].votes + ' votes.');
    this.photoCollect[index].votes++;
    console.log(this.photoCollect[index].site + ' now has ' + this.photoCollect[index].votes + ' votes.');
    this.temp.innerHTML = null;
    this.displayPhotos();
  }
}

photoTracker.displayPhotos();

// var resultsData = {
//   labels : ["Amazon","Dropbox","eBay","Facebook","GitHub","Google","LinkedIn","Netflix","Reddit","Twitter","Wikipedia","YouTube"],
//   datasets : [
//     {
//       fillColor : "rgba(172,194,132,0.4)",
//       strokeColor : "#ACC26D",
//       pointColor : "#fff",
//       pointStrokeColor : "#9DB86D",
//       data : [203,156,99,251,305,247,203,156,99,251,305,247]
//     }
//   ]
// }
// var results = document.getElementById('results').getContext('2d');
// new Chart(results).Line(resultsData);
