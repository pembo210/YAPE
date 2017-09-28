// ==UserScript==
// @name         YAPE
// @namespace    https://phuks.co
// @version      0.1.2
// @date         2017-09-25
// @description  Yet Another Phuking Extension. Add-on for Phuks!
// @author       pembo
// @match        https://dev.phuks.co
// @match        https://dev.phuks.co/all
// @match        https://dev.phuks.co/hot
// @match        https://dev.phuks.co/new
// @match        https://dev.phuks.co/top
// @match        https://dev.phuks.co/all/*
// @match        https://dev.phuks.co/hot/*
// @match        https://dev.phuks.co/new/*
// @match        https://dev.phuks.co/top/*
// @match        https://dev.phuks.co/s/*/hot
// @match        https://dev.phuks.co/s/*/new
// @match        https://dev.phuks.co/s/*/top
// @match        https://dev.phuks.co/s/*/hot/*
// @match        https://dev.phuks.co/s/*/new/*
// @match        https://dev.phuks.co/s/*/top/*
// @grant        none
// ==/UserScript==


/***** Things in the head *****/

// css
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#myButton,#OpenExpandos {cursor: pointer;color:#fff;} ';
document.getElementsByTagName('head')[0].appendChild(style);



/***** Expandos *****/

// find expandos
var geta = document.getElementsByClassName("expando-btn");

// create toggle button and expando count
var ul = document.querySelector('.pure-menu-list');
var newli = document.createElement('li');
newli.innerHTML = '<a class="pure-menu-link" id="OpenExpandos">Toggle (' + geta.length + ')</a>'; // Open
newli.setAttribute('class', 'pure-menu-item');
ul.appendChild(newli);

// activate link
document.getElementById("OpenExpandos").addEventListener (
    "click", ButtonClickAction, false
);

// toggle click
function ButtonClickAction(zEvent) {
    // toggle button name Open to Close
    // needs a class to signal if the expando is open or closed
    // if (document.getElementById("OpenExpandos").innerHTML == 'Open (' + geta.length + ')') {
    //   document.getElementById("OpenExpandos").innerHTML = 'Close (' + geta.length + ')';
    // } else {
    //   document.getElementById("OpenExpandos").innerHTML = 'Open (' + geta.length + ')';
    // }
    var clickEvent  = document.createEvent("HTMLEvents");
    clickEvent.initEvent("click", true, true);
    for (var i = 0; i < geta.length; i++) {
      geta[i].dispatchEvent(clickEvent);
    }
}
