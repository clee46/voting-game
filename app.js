var album = [];
var data = [];
var sites = ['Amazon', 'Dropbox', 'eBay', 'Evernote','Facebook', 'GitHub', 'Google', 'Instagram','LinkedIn', 'Netflix', 'Reddit', 'Twitter', 'Wikipedia', 'YouTube'];
var colors = [[253,134,9],[13,102,223],[117,174,19],[42,181,78],[45,68,134],[17,16,15],[226,44,41],[141,91,68],[13,98,166],[167,10,28],[253,44,8],[46,191,255],[0,0,0],[215,11,29]];

var skillsChart;    // declare chart as a global object
var context = document.getElementById('results').getContext('2d');

// Photo Constructor
function Photo (site, path, siteColor, siteHighlight) {
  this.site = site;
  this.path = path;
  this.siteColor = siteColor;
  this.votes = 0;
  album.push(this);
  data.push({
    value: 0,
    label: site,
    color: siteColor,
    highlight: siteHighlight
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
      var siteColor = 'rgb(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ')';
      var siteHighlight = 'rgba(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ',0.5)';
      new Photo(sites[i], path, siteColor, siteHighlight);
    }
    localStorage.setItem('album', JSON.stringify(album));
    localStorage.setItem('data', JSON.stringify(data));
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
    // calculate two unique random indices
    var index1 = this.calcRandom();
    var index2 = this.calcNewIndex(index1);

    // populate box1 with new random image/caption with event listener to vote
    picture1 = document.createElement('img');
    picture1.setAttribute('src', album[index1].path);
    picture1.addEventListener('click', function(){tracker.vote(index1)});

    caption1 = document.createElement('h1');
    caption1.textContent = 'Click to vote for ' + album[index1].site;
    caption1.style.color = album[index1].siteColor;

    this.box1.appendChild(caption1);
    this.box1.appendChild(picture1);

    // populate box2 with new random image/caption with event listener to vote
    picture2 = document.createElement('img');
    picture2.setAttribute('src', album[index2].path);
    picture2.addEventListener('click', function(){tracker.vote(index2)});

    caption2 = document.createElement('h1');
    caption2.textContent = 'Click to vote for ' + album[index2].site;
    caption2.style.color = album[index2].siteColor;

    this.box2.appendChild(caption2);
    this.box2.appendChild(picture2);

    // if local storage exists, retrieve it and display existing chart/msg
    if (localStorage.msg) {
      var msg = JSON.parse(localStorage.getItem('msg'));
      var color = JSON.parse(localStorage.getItem('color'));
      var result = document.getElementById('result');
      album = JSON.parse(localStorage.getItem('album'));
      data = JSON.parse(localStorage.getItem('data'));
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
    // RESET THE CANVAS
    var context = document.getElementById('results');
    this.box3.removeChild(context);
    var context = document.createElement('canvas');
    context.setAttribute ('id', 'results');
    context.setAttribute ('width', '375');
    context.setAttribute ('height', '250');
    this.box3.insertBefore(context, this.box3.firstChild.nextSibling);
    // CREATE/UPDATE THE CHART
    context = document.getElementById('results').getContext('2d');
    skillsChart = new Chart(context).Pie(data, {
        animationSteps : 45,
        segmentShowStroke : false,
        animationEasing : "easeOutBounce",
        scaleShowLabelBackdrop : true
    });
    skillsChart.segments[index].value = album[index].votes;
    skillsChart.update();
  },
  showWinner: function () {
    var count = []; //stores number of votes
    var msg;  // stores customized message summary for the user
    var result = document.getElementById('result');

    for (var i = 0; i < album.length; i++) {count[i] = album[i].votes;}
    var max = Math.max.apply(null, count);
    // leaders is an array of photo objects, which have the most votes
    var leaders = album.filter(function(itm){return itm.votes === max;});

    if (leaders.length === 1) {msg = leaders[0].site + ' is in the lead with ';}
    else if (leaders.length === 2) {msg = 'There is a tie between: <br>' + leaders[0].site + ' and ' + leaders[1].site + '.<br>Each has '}
    else {
      msg = 'There is a tie between: <br>' + leaders[0].site;
      for (var j = 1; j < leaders.length; j++) {
          if (j < leaders.length - 1) {msg += ',<br>' + leaders[j].site;}
          else {msg += ', and ' + leaders[j].site;}
      }
      msg += '.<br>Each has ';
    }

    if (leaders[0].votes === 1) {msg += '1 vote';}
    else {msg += leaders[0].votes + ' votes'}

    if (leaders.length === 1) {var color = leaders[0].siteColor;}
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
  },
  reset: function () {
    localStorage.clear();
    location.reload();
  }
}

// if album exists in local storage, then retrieve it
if (localStorage.album) {
  album = JSON.parse(localStorage.getItem('album'));
  data = JSON.parse(localStorage.getItem('data'));
}
// otherwise, create a new album
else {tracker.createAlbum();}

tracker.displayPhotos();

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', tracker.reset);
