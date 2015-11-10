var photoCollect = [];
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
var photoTracker = new Tracker(photoCollect);

function Photo (site, path) {
  this.site = site;
  this.path = path;
  this.votes = 0;
  photoCollect.push(this);
}

function Tracker (photoCollect) {
  this.photoCollect = photoCollect;
  this.box1 = document.getElementById('box1');
  this.box2 = document.getElementById('box2');

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

    this.caption1 = document.createElement('h1');
    this.caption2 = document.createElement('h1');

    this.caption1.setAttribute('id','caption1');
    this.caption2.setAttribute('id','caption2');

    this.caption1.textContent = 'Click to vote for ' + this.photoCollect[index1].site;
    this.caption2.textContent = 'Click to vote for ' + this.photoCollect[index2].site;

    this.picture1.setAttribute('id','img1');
    this.picture1.setAttribute('src', this.photoCollect[index1].path);

    this.picture2.setAttribute('id','img2');
    this.picture2.setAttribute('src', this.photoCollect[index2].path);

    this.box1.appendChild(this.caption1);
    this.box1.appendChild(this.picture1);

    this.box2.appendChild(this.caption2);
    this.box2.appendChild(this.picture2);

    this.picture1.addEventListener('click', function(){photoTracker.vote(index1)});
    this.picture2.addEventListener('click', function(){photoTracker.vote(index2)});
  }

  this.vote = function (index) {
    var currentVote = document.getElementById('currentVote');
    currentVote.innerHTML = 'You voted for ' + this.photoCollect[index].site;
    document.body.appendChild(currentVote);

    console.log(this.photoCollect[index].site + ' had ' + this.photoCollect[index].votes + ' votes.');
    this.photoCollect[index].votes++;
    console.log(this.photoCollect[index].site + ' now has ' + this.photoCollect[index].votes + ' votes.');

    this.box1.innerHTML = null;
    this.box2.innerHTML = null;

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
