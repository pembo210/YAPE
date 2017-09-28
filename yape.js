// ==UserScript==
// @name         YAPE
// @namespace    https://phuks.co
// @version      0.1.3
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
style.innerHTML += 'span.PhuksUserTag {padding: 2px 4px;border: 1px solid #555;border-radius: 4px;margin: 0px 2px 0px 6px;} ';
style.innerHTML += 'body.dark img.PhuksUserTagImg {background: #999;border-radius: 2px;padding: 2px;} ';
document.getElementsByTagName('head')[0].appendChild(style);

// set user tag function in head, I heard you like js, so I put js in your js
var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = `
  function setPhuksUserTag(uname, existing) {
    var txt, person = prompt("Add a tag for " + uname + " or press Cancel to delete the existing tag" , existing);
    if (person === null || person === "") {
      localStorage.removeItem("PhuksUserTag=" + uname);
      alert("Tag deleted");
      location.reload();
    } else {
      localStorage.setItem("PhuksUserTag=" + uname, person);
      alert("Tag saved");
      location.reload();
    }
  }
`;
document.getElementsByTagName('head')[0].appendChild(script);


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


/***** User tags *****/

// tag image
var usrtagimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABL1BMVEUAAABEREBEREBEREBEREBEREBEREBEREBEREArKyg3N';
usrtagimg += 'zc1NTU2NjY7Ozk7OzkqKiowMDAzMzMyMjIyMjIzMzMzMzMxMTEzMzMxMTEzMzM/Pz8xMTEyMjIzMzMzMzM4ODYzMzMxMTEzMzMzMzM1NTVAQD04ODc3NzZAQD8';
usrtagimg += 'tLS0AAAAxMTExMTEyMjIzMzMzMzMwMDAzMzM7Ozk1NTUyMjIvLy8zMzM/Pz8oKCgzMzMxMTEyMjI6OjgzMzMyMjJAQD8zMzMzMzMzMzM0NDQ0NDQzMzNCQkAyM';
usrtagimg += 'jIzMzMxMTEzMzMzMzNCQkBDQ0AzMzM1NTQ2NjU5OTkvLy83NzU9PTk1NTQyMjI0NDQ5OTgzMzMzMzM0NDQ0NDQzMzM2NjY3Nzc7Ozk7OzokJCQzMzM0NDS2yuc';
usrtagimg += 'GAAAAY3RSTlMAAQQFCQoCDQ8DFxgaJCYGIcLZ1NbXyVrhWQToUXVUIaDDHkAeEiguChwCls71/tUVdCJwiSBtCAhj7V8gaYgFVXvwThZoDcAKbRRuFQ6KNTEWG';
usrtagimg += 'yIRVORoKcbQ0tPLHB0oKgenETJXAAAA50lEQVQYV22QPUsEQRBE682Mw7gr7AXrB2KoYHSJiWBiJBjpP/UHCOYiyMGhgaipyQlnJLd32gY7s5fYST8Kuugq6Z8';
usrtagimg += 'hLzCzQr7XvNOvDRQkKYLZqlBnZHIwuITQ0yZZNJN8EB4bwUd26bRPOACA96YFYBmZKzQATLQ6fwQYT5nLPT3XdX1yJphVVSVJRwqyxFtKEbWJhaSvRkH2PXLxD';
usrtagimg += 'rTHUtL2DnLS/XT8cMnuLE022pfPlBZ99ngFN11JdPqaE11ze6HyvUciYnZ4vDV0FRA+mA231klyKrTWhDw/uUksE3Lrxgv9AbmhV3RvfAbaAAAAAElFTkSuQmCC';

// find author links
var getu = document.getElementsByClassName('authorlink');

for (var i = 0; i < getu.length; i++) {
    var username = getu[i].innerHTML;
    // check local storage for tag
    if (localStorage.getItem('PhuksUserTag=' + username)) {
      var hastag = true, usertag = localStorage.getItem('PhuksUserTag=' + username);
      // add tag span after authorlink
      var newspan = document.createElement('span');
      newspan.setAttribute('class', 'PhuksUserTag');
      newspan.innerHTML = usertag;
      getu[i].after(newspan);
    } else {
      var hastag = false, usertag = '';
    }

    // tag image
    var togglespan = document.createElement('span');
    togglespan.innerHTML = '<img src="' + usrtagimg + '" height="16" width="16" onclick="setPhuksUserTag(\'' + username + '\', \'' + usertag + '\')">';
    if (hastag) {
      newspan.after(togglespan);
    } else {
      getu[i].after(togglespan);
    }
}
