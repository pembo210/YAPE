// ==UserScript==
// @name         YAPE
// @namespace    https://phuks.co
// @version      0.1.4
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
style.innerHTML += 'span.yapeadminicon {margin-left: 10px;} ';
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
  function openTab(evt, tabnane) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabnane).style.display = "block";
    evt.currentTarget.className += " active";
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


/***** Admin area *****/

// css
var YAPEstyle = document.createElement('style');
YAPEstyle.type = 'text/css';
YAPEstyle.innerHTML = '#YAPEadminmodel {display: none;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);} ';
YAPEstyle.innerHTML += '.modal-content {background-color: #fefefe;margin: auto;padding: 20px;border: 1px solid #888;width: 80%;} ';
YAPEstyle.innerHTML += '.close {color: #aaaaaa;float: right;font-size: 28px;font-weight: bold;} ';
YAPEstyle.innerHTML += '.close {color: #aaaaaa;float: right;font-size: 28px;font-weight: bold;} ';
YAPEstyle.innerHTML += '.close:hover,.close:focus {color: #000;text-decoration: none;cursor: pointer;} ';
YAPEstyle.innerHTML += 'div.tab{overflow:hidden;border:1px solid #ccc;background-color:#f1f1f1}div.tab button{background-color:inherit;float:left;border:none;outline:0;';
YAPEstyle.innerHTML += 'cursor:pointer;padding:14px 16px;transition:.3s;font-size:17px}div.tab button:hover{background-color:#ddd}div.tab button.active{background-color:#ccc} ';
YAPEstyle.innerHTML += '.tabcontent{display:none;padding:6px 12px;border:1px solid #ccc;border-top:none} ';
document.getElementsByTagName('head')[0].appendChild(YAPEstyle);

// admin area
var YAPEmodel = document.createElement('div');
YAPEmodel.setAttribute('id', 'YAPEadminmodel');

// yape admin modal html
var boxhtml = '';
boxhtml += '<div class="modal-content">';
boxhtml += '  <div class="closeYAPE" style="text-align: right;">&times; close</div>';
boxhtml += '  <div class="yapecontent">';
boxhtml += '    <div class="tab">';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Admin\')" id="defaultOpen">Admin</button>';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Tags\')">User Tags</button>';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Other\')">Other</button>';
boxhtml += '    </div>';
boxhtml += '    <div id="Admin" class="tabcontent">';
boxhtml += '      <h3>Admin</h3>';
boxhtml += '      <p>YAPE, Yet Another Phuking Extension. Add-on for Phuks!</p>';
boxhtml += '      <p>Currently works on <a href="https://dev.phuks.co">https://dev.phuks.co</a></p>';
boxhtml += '      <p style="text-align: right;">version 0.1.4</p>';
boxhtml += '    </div>';
boxhtml += '    <div id="Tags" class="tabcontent">';
boxhtml += '      <h3>User Tags</h3>';
boxhtml += '      <ul id="YAPEadminUserTagsUL"></ul>';
boxhtml += '    </div>';
boxhtml += '    <div id="Other" class="tabcontent">';
boxhtml += '      <h3>Other</h3>';
boxhtml += '      <p>Other</p>';
boxhtml += '    </div>';
boxhtml += '  </div>';
boxhtml += '</div>';

YAPEmodel.innerHTML = boxhtml;
document.getElementsByTagName('body')[0].appendChild(YAPEmodel);
document.getElementById("defaultOpen").click();

// get user tags
var adminul = document.querySelector('#YAPEadminUserTagsUL');
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var elem = localStorage.getItem(key);
    console.log(key + ', ' + elem);
    var newtagli = document.createElement('li');
    newtagli.innerHTML = '<a href="/u/' + key.substring(13) + '" target="_blank">' + key.substring(13) + '</a>: ' + elem + ' ';
    newtagli.innerHTML += '<img src="' + usrtagimg + '" height="16" width="16" onclick="setPhuksUserTag(\'' + key.substring(13) + '\', \'' + elem + '\')">';
    adminul.appendChild(newtagli);
}

// admin image in menu
var adminimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3XAAAN1wFCKJt4A';
adminimg += 'AAAB3RJTUUH4AwVAygTowKqowAAAS5JREFUOMudk7FKBDEQhr/dWFuLx7FWttb6BAq2osW8ga2P4hNowMXGF7ATEQuxsNLKZRUsbKzPSSw2yeXWPT0dCElm8v/';
adminimg += 'zJ5kBQIUtFc7D+ldT4UCFI4Ay+J6APRVaY0GFYgAU52PgDHhLBMbyHs6NVPDAqA8OxPfAYXA3uQKAW0iZWxX2s1ilwgewER3GctUnuOmprlV4VOECeAaWswRRM';
adminimg += 'UsZ4G7gvdbD6Fs6mytoWNyu46PmBA/8w3KC3T/gNo39TrAdF0UBZRbp74GdIQWrgAcoT8G5acB7KE5mSVRYIX5LVigNMC5N53cashTdf7lJwo+N5SWvxFiqa8C';
adminimg += 'l0ykYwHlwk04dUAGv6XpzmqWGmUr0QGsslQqFsYnsx46rA9B/dldbqFP75gHv/XzwF6jIZkPpUPCeAAAAAElFTkSuQmCC';

// get username
var getadmin = document.getElementsByClassName('cw-items')[1].childNodes[1];

// add icon after username
var adminspan = document.createElement('span');
adminspan.innerHTML = '<img src="' + adminimg + '" height="16" width="16">';
adminspan.setAttribute('id', 'YAPEicon');
adminspan.setAttribute('class', 'yapeadminicon');
getadmin.after(adminspan);

// get, open, and close the admin area modal
var modal = document.getElementById('YAPEadminmodel');
var btn = document.getElementById("YAPEicon");
var span = document.getElementsByClassName("closeYAPE")[0];
btn.onclick = function() {
    modal.style.display = "block";
};
span.onclick = function() {
    modal.style.display = "none";
};
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
