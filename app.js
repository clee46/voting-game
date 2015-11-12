var photoCollect = [];
var photoTracker = new Tracker(photoCollect);
var sites = ['Amazon', 'Dropbox', 'eBay', 'Evernote','Facebook', 'GitHub', 'Google', 'Instagram','LinkedIn', 'Netflix', 'Reddit', 'Twitter', 'Wikipedia', 'YouTube'];
var colors = ['rgb(253,134,9)','rgb(13,102,223)','rgb(117,174,19)','rgb(42,181,78)','rgb(45,68,134)','rgb(17,16,15)','rgb(226,44,41)','rgb(141,91,68)','rgb(13,98,166)','rgb(167,10,28)','rgb(253,44,8)','rgb(46,191,255)','rgb(0,0,0)','rgb(215,11,29)'];

function Photo (site, path, siteColor) {
  this.site = site;
  this.path = path;
  this.siteColor = siteColor;
  this.votes = 0;
  photoCollect.push(this);
}

function Tracker (photoCollect) {
  this.photoCollect = photoCollect;
  this.box1 = document.getElementById('box1');
  this.box2 = document.getElementById('box2');
  this.box3 = document.getElementById('box3');

  this.createAlbum = function () {
    for (var i = 0; i < sites.length; i++) {
      var path = 'img/' + sites[i] + '.png';
      var siteColor = colors[i];
      new Photo(sites[i], path, siteColor);
    }
  }
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
    this.picture1.setAttribute('src', this.photoCollect[index1].path);
    this.picture1.addEventListener('click', function(){photoTracker.vote(index1)});
    this.caption1 = document.createElement('h1');
    this.caption1.textContent = 'Click to vote for ' + this.photoCollect[index1].site;
    this.caption1.style.color = this.photoCollect[index1].siteColor;
    this.box1.appendChild(this.caption1);
    this.box1.appendChild(this.picture1);

    this.picture2 = document.createElement('img');
    this.picture2.setAttribute('src', this.photoCollect[index2].path);
    this.picture2.addEventListener('click', function(){photoTracker.vote(index2)});
    this.caption2 = document.createElement('h1');
    this.caption2.textContent = 'Click to vote for ' + this.photoCollect[index2].site;
    this.caption2.style.color = this.photoCollect[index2].siteColor;
    this.box2.appendChild(this.caption2);
    this.box2.appendChild(this.picture2);
  }
  this.vote = function (index) {
    var currentVote = document.getElementById('currentVote');
    currentVote.innerHTML = 'You voted for ' + this.photoCollect[index].site;
    currentVote.style.color = this.photoCollect[index].siteColor;
    this.box3.appendChild(currentVote);
    this.photoCollect[index].votes++;
    this.updateChart(index);
    this.showWinner();
    this.box1.innerHTML = null;
    this.box2.innerHTML = null;
    this.displayPhotos();
  }
  this.updateChart = function (index) {
    skillsChart.segments[index].value = this.photoCollect[index].votes;
    skillsChart.update();
  }
  this.showWinner = function () {
    var count = [];
    var msg;

    for (var i = 0; i < this.photoCollect.length; i++) {
      count[i] = this.photoCollect[i].votes;
    }

    var max = Math.max.apply(null, count);
    var temp = photoCollect.filter(function(itm){return itm.votes === max;});

    if (temp.length === 1) {msg = temp[0].site + ' is in the lead with ';}
    else if (temp.length === 2) {msg = 'There is a tie between: <br>' + temp[0].site + ' and ' + temp[1].site + '.<br>Each has '}
    else {
      msg = 'There is a tie between: <br>' + temp[0].site;
      for (var j = 1; j < temp.length; j++) {
          if (j < temp.length - 1) {msg += ',<br>' + temp[j].site;}
          else {msg += ', and ' + temp[j].site;}
      }
      msg += '.<br>Each has ';
    }
    if (temp[0].votes === 1) {msg += '1 vote';}
    else {msg += temp[0].votes + ' votes'}

    var result = document.getElementById('result');
    result.innerHTML = msg;
    if (temp.length === 1) {result.style.color = temp[0].siteColor;}
    else {result.style.color = '#000';}
    this.box3.appendChild(result);
  }
  // this.reset = function () {
  //   for (var i = 0; i < photoCollect.length; i++) {
  //     photoCollect[i].votes = 0;
  //   }
  //   this.displayPhotos();
  // }
}

photoTracker.createAlbum();
var kevin = [
  {
    value: 1,
    label: photoCollect[0].site,
    color: photoCollect[0].siteColor,
    highlight: 'rgba(253,134,9,0.5)'
  },
  {
    value: photoCollect[1].votes,
    label: photoCollect[1].site,
    color: photoCollect[1].siteColor,
    highlight: 'rgba(13,102,223,0.5)'
  },
  {
    value: photoCollect[2].votes,
    label: photoCollect[2].site,
    color: photoCollect[2].siteColor,
    highlight: 'rgba(117,174,19,0.5)'
  },

  {
    value: photoCollect[3].votes,
    label: photoCollect[3].site,
    color: photoCollect[3].siteColor,
    highlight: 'rgba(42,181,78,0.5)'
  },
  {
    value: photoCollect[4].votes,
    label: photoCollect[4].site,
    color: photoCollect[4].siteColor,
    highlight: 'rgba(45,68,134,0.5)'
  },
  {
    value: photoCollect[5].votes,
    label: photoCollect[5].site,
    color: photoCollect[5].siteColor,
    highlight: 'rgba(17,16,15,0.5)'
  },
  {
    value: photoCollect[6].votes,
    label: photoCollect[6].site,
    color: photoCollect[6].siteColor,
    highlight: 'rgba(226,44,41,0.5)'
  },
  {
    value: photoCollect[7].votes,
    label: photoCollect[7].site,
    color: photoCollect[7].siteColor,
    highlight: 'rgba(141,91,68,0.5)'
  },
  {
    value: photoCollect[8].votes,
    label: photoCollect[8].site,
    color: photoCollect[8].siteColor,
    highlight: 'rgba(13,98,166,0.5)'
  },
  {
    value: photoCollect[9].votes,
    label: photoCollect[9].site,
    color: photoCollect[9].siteColor,
    highlight: 'rgba(167,10,28,0.5)'
  },
  {
    value: photoCollect[10].votes,
    label: photoCollect[10].site,
    color: photoCollect[10].siteColor,
    highlight: 'rgba(253,44,8,0.5)'
  },
  {
    value: photoCollect[11].votes,
    label: photoCollect[11].site,
    color: photoCollect[11].siteColor,
    highlight: 'rgba(46,191,255,0.5)'
  },
  {
    value: photoCollect[12].votes,
    label: photoCollect[12].site,
    color: photoCollect[12].siteColor,
    highlight: 'rgba(0,0,0,0.5)'
  },
  {
    value: photoCollect[13].votes,
    label: photoCollect[13].site,
    color: photoCollect[13].siteColor,
    highlight: 'rgba(215,11,29,0.5)'
  }
];

var context = document.getElementById('results').getContext('2d');
var skillsChart = new Chart(context).Pie(kevin, {
    animationSteps : 45,
    segmentShowStroke : false,
    animationEasing : "easeOutBounce",
    scaleShowLabelBackdrop : true
});
skillsChart.segments[0].value = this.photoCollect[0].votes;
photoTracker.displayPhotos();
