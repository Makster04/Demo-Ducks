'use strict';

// console.log('JS is loaded!', goats);

let person = {
  name: "Jacob",
  age: 34
}

// localStorage.clear(); // removes all data from localStorage BE CAREFUL WHEN YOU CLEAR YOUR DATA.

// what does localStorage store => JSON

// localStorage.setItem('goatData', JSON.stringify(goats)); // method of the localStorage object, takes 2 arguments a key, and a value, value should be stringifies if not a primitive

console.log('The localStorage object', localStorage);

// let stringFromStorage = localStorage.getItem('goatData'); // method for retrieving something from localStorage
// console.log('THIS IS FRESH FROM LOCALSTORAGE', stringFromStorage);

// let object = JSON.parse(stringFromStorage);
// console.log('PARSED BACK INTO A JS OBJECT', object);

// console.log('PERSON BEFORE JSONification', person);

// let json = JSON.stringify(person); // returns a string using the JSON syntax

// console.log('PERSON AFTER JSONIFICATION', json);

// person = JSON.parse(json); // converts our JSON string back into a JS object.

// global object that does JSON things
// console.log('PERSON CONVERTED BACK TO AN OBJECT', person);


function saveData(data) {
  localStorage.setItem('goatData', JSON.stringify(data));
}

function fetchData() {
  return JSON.parse(localStorage.getItem('goatData'));
}

function clearData() {
  localStorage.clear();
}