var photoCollect = [];
var amazon = new Photo('Amazon', 'img/amazon.png', '#baddad');
var dropbox = new Photo('Dropbox', 'img/dropbox.png', '#baddad');
var ebay = new Photo('eBay', 'img/eBay.png', '#baddad');
var facebook = new Photo('Facebook', 'img/facebook.png', '#baddad');
var github = new Photo('GitHub', 'img/github.png', '#baddad');
var google = new Photo('Google', 'img/google.png', '#baddad');
var linkedin = new Photo('LinkedIn', 'img/linkedin.png', '#baddad');
var netflix = new Photo('Netflix', 'img/netflix.png', '#baddad');
var reddit = new Photo('Reddit', 'img/reddit.png', '#baddad');
var twitter = new Photo('Twitter', 'img/twitter.png', '#baddad');
var wikipedia = new Photo('Wikipedia', 'img/wikipedia.png', '#baddad');
var youtube = new Photo('YouTube', 'img/youtube.png', '#baddad');
var photoTracker = new Tracker(photoCollect);

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
  this.kevin = [];


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
    // skillsChart.update();
  }

  this.vote = function (index) {
    var currentVote = document.getElementById('currentVote');
    currentVote.innerHTML = 'You voted for ' + this.photoCollect[index].site;
    document.body.appendChild(currentVote);

    console.log(this.photoCollect[index].site + ' had ' + this.photoCollect[index].votes + ' votes.');
    this.photoCollect[index].votes++;
    console.log(this.photoCollect[index].site + ' now has ' + this.photoCollect[index].votes + ' votes.');

    this.updateChart(index);

    this.box1.innerHTML = null;
    this.box2.innerHTML = null;

    this.displayPhotos();
  }

  this.updateChart = function (index) {
    this.kevin.push({
      value: photoCollect[index].votes,
      label: photoCollect[index].site,
      color: photoCollect[index].siteColor
    })
    var context = document.getElementById('results').getContext('2d');
    var skillsChart = new Chart(context).Pie(this.kevin, {
        //Number - Amount of animation steps
        animationSteps : 100,
        //String - Animation easing effect
        animationEasing : "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : false,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : true,
        scaleShowLabelBackdrop : true
    });

    // skillsChart.addData({
    //   value: photoCollect[index].votes,
    //   label: photoCollect[index].site
    //   // color: '#811BD6',
    //   // highlight: '#811B33'
    // });
    // var context = document.getElementById("results").getContext("2d");

    // var skillsChart = new Chart(context).Pie(kevin, {
    //     //Number - Amount of animation steps
    //     animationSteps : 100,
    //     //String - Animation easing effect
    //     animationEasing : "easeOutBounce",
    //     //Boolean - Whether we animate the rotation of the Doughnut
    //     animateRotate : false,
    //     //Boolean - Whether we animate scaling the Doughnut from the centre
    //     animateScale : true,
    //     scaleShowLabelBackdrop : true
    // });
  }
}



// var kevin = [
//   {
//     value: photoCollect[0].votes,
//     label: photoCollect[0].site,
//     color: '#811BD6',
//     highlight: '#811B33'
//   },
//   {
//     value: photoCollect[1].votes,
//     label: photoCollect[1].site,
//     color: '#9CBABA',
//     highlight: '#9CBA99'
//   },
//   {
//     value: photoCollect[2].votes,
//     label: photoCollect[2].site,
//     color: '#D18177',
//     highlight: '#D18133'
//   },
//   {
//     value : photoCollect[3].votes,
//     label: photoCollect[3].site,
//     color: '#6AE128',
//     highlight: '#6AE199'
//   },
//   {
//     value: photoCollect[4].votes,
//     label: photoCollect[4].site,
//     color: '#811BD6',
//     highlight: '#811B33'
//   },
//   {
//     value: photoCollect[5].votes,
//     label: photoCollect[5].site,
//     color: '#9CBABA',
//     highlight: '#9CBA99'
//   },
//   {
//     value: photoCollect[6].votes,
//     label: photoCollect[6].site,
//     color: '#D18177',
//     highlight: '#D18133'
//   },
//   {
//     value: photoCollect[7].votes,
//     label: photoCollect[7].site,
//     color: '#811BD6',
//     highlight: '#811B33'
//   },
//   {
//     value: photoCollect[8].votes,
//     label: photoCollect[8].site,
//     color: '#9CBABA',
//     highlight: '#9CBA99'
//   },
//   {
//     value: photoCollect[9].votes,
//     label: photoCollect[9].site,
//     color: '#D18177',
//     highlight: '#D18133'
//   },
//   {
//     value: photoCollect[10].votes,
//     label: photoCollect[10].site,
//     color: '#811BD6',
//     highlight: '#811B33'
//   },
//   {
//     value: photoCollect[11].votes,
//     label: photoCollect[11].site,
//     color: '#9CBABA',
//     highlight: '#9CBA99'
//   }
// ];



  photoTracker.displayPhotos();
