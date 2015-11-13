var album = [];
var data = [];
if (localStorage.data) {
  data = JSON.parse(localStorage.getItem('data'));
  album = JSON.parse(localStorage.getItem('album'));
}
var skillsChart;
var sites = ['Amazon', 'Dropbox', 'eBay', 'Evernote','Facebook', 'GitHub', 'Google', 'Instagram','LinkedIn', 'Netflix', 'Reddit', 'Twitter', 'Wikipedia', 'YouTube'];
var colors = ['rgb(253,134,9)','rgb(13,102,223)','rgb(117,174,19)','rgb(42,181,78)','rgb(45,68,134)','rgb(17,16,15)','rgb(226,44,41)','rgb(141,91,68)','rgb(13,98,166)','rgb(167,10,28)','rgb(253,44,8)','rgb(46,191,255)','rgb(0,0,0)','rgb(215,11,29)'];
var context = document.getElementById('results').getContext('2d');

// Photo Constructor
function Photo (site, path, siteColor) {
  this.site = site;
  this.path = path;
  this.siteColor = siteColor;
  this.votes = 0;
  album.push(this);
  data.push({
    value: 0,
    label: site,
    color: siteColor,
    highlight: 'rgba(253,134,9,0.5)'
  });
}

var tracker = {

  firstVote: true,
  box1: document.getElementById('box1'),  // holds left image, caption
  box2: document.getElementById('box2'),  // holds right image, caption
  box3: document.getElementById('box3'),  // holds chart

  createAlbum: function () {
    for (var i = 0; i < sites.length; i++) {
      var path = 'img/' + sites[i] + '.png';
      var siteColor = colors[i];
      new Photo(sites[i], path, siteColor);
      console.log('Photo added!');
    }
    localStorage.setItem('album', JSON.stringify(album));
  },

  calcRandom: function () {
    return Math.floor(Math.random() * album.length);
  },

  calcNewIndex: function (index1) {
    do {
      var index2 = this.calcRandom();
    } while (index1 === index2)
    return index2;
  },

  displayPhotos: function () {

    var index1 = this.calcRandom();
    var index2 = this.calcNewIndex(index1);

    this.picture1 = document.createElement('img');
    this.picture1.setAttribute('src', album[index1].path);
    this.picture1.addEventListener('click', function(){tracker.vote(index1)});

    this.caption1 = document.createElement('h1');
    this.caption1.textContent = 'Click to vote for ' + album[index1].site;
    this.caption1.style.color = album[index1].siteColor;

    this.box1.appendChild(this.caption1);
    this.box1.appendChild(this.picture1);

    this.picture2 = document.createElement('img');
    this.picture2.setAttribute('src', album[index2].path);
    this.picture2.addEventListener('click', function(){tracker.vote(index2)});

    this.caption2 = document.createElement('h1');
    this.caption2.textContent = 'Click to vote for ' + album[index2].site;
    this.caption2.style.color = album[index2].siteColor;

    this.box2.appendChild(this.caption2);
    this.box2.appendChild(this.picture2);

    if (localStorage.msg) {
      var msg = JSON.parse(localStorage.getItem('msg'));
      var color = JSON.parse(localStorage.getItem('color'));
      var result = document.getElementById('result');
      skillsChart = new Chart(context).Pie(data, {
          animationSteps : 45,
          segmentShowStroke : false,
          animationEasing : "easeOutBounce",
          scaleShowLabelBackdrop : true
      });
      this.firstVote = false;
      result.innerHTML = msg;
      result.style.color = color;
      this.box3.appendChild(result);
    }
  },

  vote: function (index) {

    album[index].votes++;
    data[index].value = album[index].votes;

    var currentVote = document.getElementById('currentVote');
    currentVote.innerHTML = 'You voted for ' + album[index].site;
    currentVote.style.color = album[index].siteColor;
    this.box3.appendChild(currentVote);
    this.updateChart(index);
    this.showWinner();
    this.box1.innerHTML = null;
    this.box2.innerHTML = null;
    this.displayPhotos();
  },

  updateChart: function (index) {

    if (this.firstVote && !localStorage.data) {
      // context = document.getElementById('results').getContext('2d');
      skillsChart = new Chart(context).Pie(data, {
          animationSteps : 45,
          segmentShowStroke : false,
          animationEasing : "easeOutBounce",
          scaleShowLabelBackdrop : true
      });
      this.firstVote = false;
    }
    else {
      skillsChart.segments[index].value = album[index].votes;
      skillsChart.update();
    }
  },
  showWinner: function () {

    var count = [];
    var msg;
    var result = document.getElementById('result');

    for (var i = 0; i < album.length; i++) {
      count[i] = album[i].votes;
    }
    var max = Math.max.apply(null, count);
    var temp = album.filter(function(itm){return itm.votes === max;});

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

    if (temp.length === 1) {var color = temp[0].siteColor;}
    else {var color = '#000';}

    result.innerHTML = msg;
    result.style.color = color;
    this.box3.appendChild(result);

    // save everything in local storage
    localStorage.setItem('msg', JSON.stringify(msg));
    localStorage.setItem('color', JSON.stringify(color));
    localStorage.setItem('album', JSON.stringify(album));
    localStorage.setItem('firstVote', JSON.stringify(this.firstVote));
    localStorage.setItem('data', JSON.stringify(data));
  }
}

if (localStorage.album) {
  console.log('Local storage found!');
  album = JSON.parse(localStorage.getItem('album'));
}
else {tracker.createAlbum();
console.log('Local storage not found. Creating album now!');}

tracker.displayPhotos();
