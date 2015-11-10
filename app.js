var photoCollect = [];
var picture1 = document.createElement('img');
var picture2 = document.createElement('img');
var temp = document.getElementById('temp');

function Photo (site, path) {
  this.site = site;
  this.path = path;
  this.votes = 0;
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
// increments vote of the object with the index passed to it
vote = function (index) {
  console.log(photoCollect[index].site + ' had ' + photoCollect[index].votes + ' votes.');
  photoCollect[index].votes++;
  console.log(photoCollect[index].site + ' now has ' + photoCollect[index].votes + ' votes.');
  // these two lines are necessary to prevent previous event listeners from voting again
  picture1.parentNode.removeChild(picture1);
  picture2.parentNode.removeChild(picture2);

  displayPhotos();
}
// creates image elements, sets source, event listeners
displayPhotos = function () {
  var index1 = calcRandom();
  var index2 = calcNewIndex(index1);

  picture1 = document.createElement('img');
  picture2 = document.createElement('img');

  picture1.setAttribute('src', photoCollect[index1].path);
  picture1.setAttribute('width', '300');

  picture2.setAttribute('src', photoCollect[index2].path);
  picture2.setAttribute('width', '300');

  temp.appendChild(picture1);
  temp.appendChild(picture2);

  picture1.addEventListener('click', function(){vote(index1)});
  picture2.addEventListener('click', function(){vote(index2)});
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

displayPhotos();

var resultsData = {
  labels : ["Amazon","Dropbox","eBay","Facebook","GitHub","Google","LinkedIn","Netflix","Reddit","Twitter","Wikipedia","YouTube"],
  datasets : [
    {
      fillColor : "rgba(172,194,132,0.4)",
      strokeColor : "#ACC26D",
      pointColor : "#fff",
      pointStrokeColor : "#9DB86D",
      data : [203,156,99,251,305,247,203,156,99,251,305,247]
    }
  ]
}
var results = document.getElementById('results').getContext('2d');
new Chart(results).Line(resultsData);
