'use strict';

const ctx = document.getElementById('myChart');
let clearButton = document.getElementById('start-over');
clearButton.addEventListener('click', function () {
  clearData();
});


// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'banana', 'Orange'],
//     datasets: [{
//       label: 'Jacob Loves Javascript',
//       data: [17, 50, 50, 13],
//       borderWidth: 1
//     }, {
//       label: 'Jacob Loves Javascript',
//       data: [1, 2, 3, 4],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });

let dataFromStorage = fetchData();
console.log('here is our data', dataFromStorage);
let goats = [];
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');

// condition that determines what state our app is in
if (dataFromStorage) {
  goats = dataFromStorage;
  let goat1 = goats[0];
  console.log('HERE IS GOAT FROM STORAGE', goat1);
  let goat2 = goats[1];

  image1.setAttribute('src', goat1.url);
  image2.setAttribute('src', goat2.url);
  goat1.timesShown++;
  image1.setAttribute('alt', goat1.name);
  image2.setAttribute('alt', goat2.name);
  goat2.timesShown++;
} else {
  let goat1 = new Goat('images/cruisin-goat.jpg', 'Cruisin');
  console.log('HERE IS GOAT FROM CONSTRUCTOR', goat1);
  let goat2 = new Goat('images/float-your-goat.jpg', 'Floating Goat');
  let goat3 = new Goat('images/goat-away.jpg', 'Goat Away');
  let goat4 = new Goat('images/goat-logo.png', 'Goat Logo');
  let goat5 = new Goat('images/goat-out-of-hand.jpg', 'Goat Hand');
  let goat6 = new Goat('images/kissing-goat.jpg', 'Kissing Goat');
  let goat7 = new Goat('images/sassy-goat.jpg', 'Sassy Goat');
  let goat8 = new Goat('images/smiling-goat.jpg', 'Smiling Goat');
  let goat9 = new Goat('images/sweater-goat.jpg', 'Sweater Goat');

  goats.push(goat1, goat2, goat3, goat4, goat5, goat6, goat7, goat8, goat9);

  // render the goat onto the page / add the name
  image1.setAttribute('src', goat1.url);
  image2.setAttribute('src', goat2.url);
  goat1.timesShown++;
  image1.setAttribute('alt', goat1.name);
  image2.setAttribute('alt', goat2.name);
  goat2.timesShown++;
}

// constructor function -> 'this' is the object we are creating.
function Goat(url, name) {
  this.url = url;
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
}
// methods will not be present on object pulled from localStorage.
Goat.prototype.sayName = function() {
  console.log(this.name);
}


// add an event listener that runs some code when a goat picture is clicked.
let goatImages = document.getElementById('goats');

// when might you remove the event listener from the GoatImages HTML element
// goatImages.removeEventListener()

goatImages.addEventListener('click', function(event) {
  event.preventDefault();
  console.log(event.target.alt); // event.target -> whatever element was interacted with.

  // add 1 to number of clicks
    // search our array of goats for the goat object that matched the alt
  findGoat(event.target.alt);

  // show 2 different images after a picture is clicked.
  renderNewGoats();
  saveData(goats);
  console.log(getNames());
  console.log(getClicks());
  console.log(getViews());
});

function findGoat(alt) {
  for (let i =0; i< goats.length; i++) {
    if (goats[i].name === alt) {
      goats[i].clicks++;
    }
  }
  console.log(goats);
}

function renderNewGoats() {
  // generate a random index betwee 0 and the length of our goats array
  let index1 = Math.floor(Math.random() * goats.length);
  let index2 = Math.floor(Math.random() * goats.length);
  while(index1 === index2) {
    index1 = Math.floor(Math.random() * goats.length);
    index2 = Math.floor(Math.random() * goats.length);
  }
  let randomGoat1 = goats[index1];
  let randomGoat2 = goats[index2];
  console.log(randomGoat1.name, randomGoat2.name, image1.alt, image2.alt);

  // render the goat onto the page / add the name
  image1.setAttribute('src', randomGoat1.url);
  image2.setAttribute('src', randomGoat2.url);
  randomGoat1.timesShown++;
  image1.setAttribute('alt', randomGoat1.name);
  image2.setAttribute('alt', randomGoat2.name);
  randomGoat2.timesShown++;
}

// get an array of all timesShown from the goats array.
function getNames() {
  let names = [];
  for (let i = 0; i < goats.length; i++) {
    names.push(goats[i].name)
  }
  return names;
}

// get an array of all timesClicked from the goats array.
function getClicks() {
  let clicks = [];
  for (let i = 0; i < goats.length; i++) {
    clicks.push(goats[i].clicks);
  }
  return clicks;
}

// get an array of all goat names from the goats array.
function getViews() {
  let views = [];
  for (let i = 0; i < goats.length; i++) {
    views.push(goats[i].timesShown);
  }
  return views;
}

let button = document.getElementById('result-button');
button.addEventListener('click', viewChart);

function viewChart() {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getNames(),
      datasets: [{
        label: '# of Clicks',
        data: getClicks(),
        borderWidth: 1
      }, {
        label: '# of Views',
        data: getViews(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}