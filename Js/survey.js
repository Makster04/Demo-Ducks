'use strict';

console.log('I am loaded!!');

const ctx = document.getElementById('myChart');

let goats = [];
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

function Goat(url, name) {
    this.url = url;
    this.name = name;
    this.clicks = 0;
    this.timesShown = 0;
}

let goat1 = new Goat('images/cruisin-goat.jpg', 'Cruisin');
let goat2 = new Goat('images/float-your-goat.jpg', 'Floating Goat');
let goat3 = new Goat('images/goat-away.jpg', 'Goat Away');
let goat4 = new Goat('images/goat-logo.png', 'Goat Logo');
let goat5 = new Goat('images/goat-out-of-hand.jpg', 'Goat Hand');
let goat6 = new Goat('images/kissing-goat.jpg', 'Kissing Goat');
let goat7 = new Goat('images/sassy-goat.jpg', 'Sassy Goat');
let goat8 = new Goat('images/smiling-goat.jpg', 'Smiling Goat');
let goat9 = new Goat('images/sweater-goat.jpg', 'Sweater Goat');

goats.push(goat1, goat2, goat3, goat4, goat5, goat6, goat7, goat8, goat9);

renderNewGoats();

function renderNewGoats() {
    let indices = getRandomIndices(3);

    for (let i = 0; i < indices.length; i++) {
        let randomGoat = goats[indices[i]];
        let imageElement = getImageElement(i + 1);
        imageElement.setAttribute('src', randomGoat.url);
        imageElement.setAttribute('alt', randomGoat.name);
        randomGoat.timesShown++;
    }
}

function getRandomIndices(count) {
    let indices = [];
    while (indices.length < count) {
        let index = Math.floor(Math.random() * goats.length);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }
    return indices;
}

function getImageElement(index) {
    switch (index) {
        case 1:
            return image1;
        case 2:
            return image2;
        case 3:
            return image3;
        default:
            return null;
    }
}

let goatImages = document.querySelectorAll('.goat-image');

goatImages.forEach(image => {
    image.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(event.target.alt);
        findGoat(event.target.alt);
        renderNewGoats();
        console.log(getNames());
        console.log(getClicks());
        console.log(getViews());
    });
});

function findGoat(alt) {
    for (let i = 0; i < goats.length; i++) {
        if (goats[i].name === alt) {
            goats[i].clicks++;
        }
    }
    console.log(goats);
}

function getNames() {
    let names = [];
    for (let i = 0; i < goats.length; i++) {
        names.push(goats[i].name)
    }
    return names;
}

function getClicks() {
    let clicks = [];
    for (let i = 0; i < goats.length; i++) {
        clicks.push(goats[i].clicks);
    }
    return clicks;
}

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
