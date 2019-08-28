// ==UserScript==
// @name         YAPE
// @namespace    https://phuks.co
// @version      0.1.7
// @date         2017-09-25
// @description  Yet Another Phuking Extension. Add-on for Phuks!
// @author       pembo
// @match        https://phuks.co
// @match        https://phuks.co/*
// @grant        none
// ==/UserScript==

// https://github.com/pembo210/YAPE


/***** Things in the head *****/

// css
var style = document.createElement('style');
style.type = 'text/css';
style.setAttribute('class', 'YAPE');
//style.innerHTML = '#myButton,#OpenExpandos {cursor: pointer;color:#fff;} ';
// user tagging
style.innerHTML += 'span.PhuksUserTag {padding: 2px 4px;border:1px solid #555;border-radius:4px;margin:0px 2px 0px 6px;} ';
style.innerHTML += 'body.dark img.PhuksUserTagImg {background:#999;border-radius:2px;padding:2px;} ';
// user tooltip
style.innerHTML += 'a.authorlink.tooltip {position: relative;display: inline-block;} ';
style.innerHTML += 'a.authorlink.tooltip ~ span.tooltiptext {visibility: hidden;color: #fff;background: #010101;border-radius:6px;padding:10px;z-index: 1;opacity: 0;position: absolute;} ';

document.getElementsByTagName('head')[0].appendChild(style);

// set admin functions in head, I heard you like js, so I put js in your js
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
  function remainingChar(id, remainid, num) {
    document.getElementById(id).onkeyup = function () {
      document.getElementById(remainid).innerHTML = "Characters left: " + (num - this.value.length);
      document.getElementById("csssaved").innerHTML = "";

    }
  }
  function saveTheme(id) {
    var css = document.getElementById(id).value;
    document.getElementById("csssaved").innerHTML = " &#10003;";
    localStorage.setItem("YAPETheme", css);
  }

`;
document.getElementsByTagName('head')[0].appendChild(script);


/***** Expandos *****/

/*** disabled toggle all expandos option ***
// find expandos
var geta = document.getElementsByClassName("expando-btn");
// create toggle button and expando count
var ul = document.querySelector('.pure-menu-list');
var newli = document.createElement('li');
newli.innerHTML = '<a class="pure-menu-link" id="OpenExpandos">Toggle (' + geta.length + ')</a>'; // Open
newli.setAttribute('class', 'pure-menu-item');
ul.appendChild(newli);
// activate link
document.getElementById("OpenExpandos").addEventListener("click", ButtonClickAction, false);
// toggle click
function ButtonClickAction(zEvent) {
    toggle button name Open to Close
    // needs a class to signal if the expando is open or closed
    if (document.getElementById("OpenExpandos").innerHTML == 'Open (' + geta.length + ')') {
      document.getElementById("OpenExpandos").innerHTML = 'Close (' + geta.length + ')';
    } else {
      document.getElementById("OpenExpandos").innerHTML = 'Open (' + geta.length + ')';
    }
    var clickEvent  = document.createEvent("HTMLEvents");
    clickEvent.initEvent("click", true, true);
    for (var i = 0; i < geta.length; i++) {
      geta[i].dispatchEvent(clickEvent);
    }
}
**/


/***** User tags and user info *****/

// tag image
var usrtagimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABL1BMVEUAAABEREBEREBEREBEREBEREBEREBEREBEREArKyg3N';
usrtagimg += 'zc1NTU2NjY7Ozk7OzkqKiowMDAzMzMyMjIyMjIzMzMzMzMxMTEzMzMxMTEzMzM/Pz8xMTEyMjIzMzMzMzM4ODYzMzMxMTEzMzMzMzM1NTVAQD04ODc3NzZAQD8';
usrtagimg += 'tLS0AAAAxMTExMTEyMjIzMzMzMzMwMDAzMzM7Ozk1NTUyMjIvLy8zMzM/Pz8oKCgzMzMxMTEyMjI6OjgzMzMyMjJAQD8zMzMzMzMzMzM0NDQ0NDQzMzNCQkAyM';
usrtagimg += 'jIzMzMxMTEzMzMzMzNCQkBDQ0AzMzM1NTQ2NjU5OTkvLy83NzU9PTk1NTQyMjI0NDQ5OTgzMzMzMzM0NDQ0NDQzMzM2NjY3Nzc7Ozk7OzokJCQzMzM0NDS2yuc';
usrtagimg += 'GAAAAY3RSTlMAAQQFCQoCDQ8DFxgaJCYGIcLZ1NbXyVrhWQToUXVUIaDDHkAeEiguChwCls71/tUVdCJwiSBtCAhj7V8gaYgFVXvwThZoDcAKbRRuFQ6KNTEWG';
usrtagimg += 'yIRVORoKcbQ0tPLHB0oKgenETJXAAAA50lEQVQYV22QPUsEQRBE682Mw7gr7AXrB2KoYHSJiWBiJBjpP/UHCOYiyMGhgaipyQlnJLd32gY7s5fYST8Kuugq6Z8';
usrtagimg += 'hLzCzQr7XvNOvDRQkKYLZqlBnZHIwuITQ0yZZNJN8EB4bwUd26bRPOACA96YFYBmZKzQATLQ6fwQYT5nLPT3XdX1yJphVVSVJRwqyxFtKEbWJhaSvRkH2PXLxD';
usrtagimg += 'rTHUtL2DnLS/XT8cMnuLE022pfPlBZ99ngFN11JdPqaE11ze6HyvUciYnZ4vDV0FRA+mA231klyKrTWhDw/uUksE3Lrxgv9AbmhV3RvfAbaAAAAAElFTkSuQmCC';

// find user links
var getu = document.querySelectorAll('.authorlink,.poster')
var username = '', hasUtag = false, usertag = '';

for (var i = 0; i < getu.length; i++) {
    username = getu[i].getAttribute('href').replace('/u/', '');

    // user tootip class
    getu[i].classList.add('tooltip');

    // check local storage for tag
    if (localStorage.getItem('PhuksUserTag=' + username)) {
      hasUtag = true;
      usertag = localStorage.getItem('PhuksUserTag=' + username);
      // add tag span after authorlink
      var utag = document.createElement('span');
      utag.setAttribute('class', 'PhuksUserTag');
      utag.innerHTML = usertag;
      getu[i].after(utag);
    } else {
      hasUtag = false;
      usertag = '';
    }

    // user tag image
    var togglespan = document.createElement('span');
    togglespan.innerHTML = '<img src="' + usrtagimg + '" height="16" width="16" onclick="setPhuksUserTag(\'' + username + '\', \'' + usertag + '\')">';
    if (hasUtag) {
      utag.after(togglespan);
    } else {
      getu[i].after(togglespan);
    }


    // user info box
    var uinfo = document.createElement('span');
    uinfo.setAttribute('class', 'tooltiptext');
    uinfo.classList.add('tooltiptext');
    uinfo.innerHTML = 'gg';
    uinfo.setAttribute('id', 'pop' + i);
    togglespan.after(uinfo);

    // add mouseover
    getu[i].setAttribute('uname', username);
    getu[i].setAttribute('upop', i);

    getu[i].addEventListener('mouseenter', function(){
         var b = this.getAttribute('upop');
         fetch('https://phuks.co/api/getUser/' + this.getAttribute('uname'))
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
                function appendData(data) {
                 // console.log(data.status); // returns 'ok' from phuks api
                 // create user info tooltip
                  var a = document.getElementById('pop' + b);
                  if (data.user.bot == true) {
                    a.innerHTML = data.user.name + '<span style="float:right">[bot]</span>';
                  } else {
                    a.innerHTML = data.user.name;
                  };
                  a.innerHTML += '<br>Level: ' + data.user.level;
                  a.innerHTML += '<br>XP: ' + data.user.xp;
                  a.innerHTML += '<br>Posts: ' + data.user.post_count;
                  a.innerHTML += '<br>Comments: ' + data.user.comment_count;
                  a.innerHTML += '<br>Voting: +' + data.user.upvotes_given + '|-' + data.user.downvotes_given;
                  a.style.visibility = 'visible';
                  a.style.opacity = '1';
                }
            })
            .catch(function (err) {
                console.log('error: phuk');
            });
    });
    getu[i].addEventListener('mouseout', function(){
        var b = this.getAttribute('upop');
        document.getElementById('pop' + b).style.visibility = 'hidden';
        document.getElementById('pop' + b).style.opacity = '0';
    });
};


/***** Hide post and Save post links *****/

// get all da posts
var posts = document.querySelectorAll('.post');
var pid = '';

for (var j = 0; j < posts.length; j++) {
    pid = posts[j].getAttribute('pid');
    posts[j].setAttribute('id', pid);

    // check local storage for hidden post id
    if (localStorage.getItem('PhuksHiddenPost=' + pid)) {
        document.getElementById(pid).style.display = 'none';
    };

    // add hide post link to links
    var hidespan = document.createElement('span');
    hidespan.setAttribute('pid', pid);
    hidespan.innerHTML = '<a href="#"> hide </a>';
    var sel = posts[j].getElementsByClassName('pbody')[0].getElementsByClassName('links')[0];
    sel.appendChild(hidespan);
    // click hide
    hidespan.addEventListener('mousedown', function(){
        var p = this.getAttribute('pid');
        //document.getElementById(p).setAttribute('class', 'hidden');
        var post = document.getElementById(p);
        var title = post.getElementsByClassName('pbody')[0].getElementsByClassName('post-heading')[0].getElementsByClassName('title')[0].innerHTML;
        post.style.display = 'none';
        localStorage.setItem("PhuksHiddenPost=" + p, title);
    });

    // add save post link to links
    var savespan = document.createElement('span');
    savespan.setAttribute('pid', pid);
    var sell = posts[j].getElementsByClassName('pbody')[0].getElementsByClassName('links')[0];
    // check local storage for saved post id
    if (localStorage.getItem('PhuksSavedPost=' + pid)) {
        savespan.innerHTML = '<a href="#" style="color:green"> saved </a>';
        sell.appendChild(savespan);
    } else {
        savespan.innerHTML = '<a href="#"> save </a>';
        sell.appendChild(savespan);
        // click save
        savespan.addEventListener('mousedown', function(){
            var p = this.getAttribute('pid');
            var post = document.getElementById(p);
            var title = post.getElementsByClassName('pbody')[0].getElementsByClassName('post-heading')[0].getElementsByClassName('title')[0].innerHTML;
            this.innerHTML = '<a href="#" style="color:green"> saved </a>';
            localStorage.setItem("PhuksSavedPost=" + p, title);
        });
    };
};


/***** Admin area *****/

// css
var YAPEstyle = document.createElement('style');
YAPEstyle.type = 'text/css';
YAPEstyle.setAttribute('class', 'YAPEadmin');
YAPEstyle.innerHTML = '#YAPEadminmodel {display:none;position:fixed;z-index:1;padding-top:100px;left:0;top:0;width:100%; ';
YAPEstyle.innerHTML += 'height:100%;overflow:auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);} ';
YAPEstyle.innerHTML += 'span.yapeadminicon {margin-left:10px;} ';
YAPEstyle.innerHTML += '.modal-content {background-color: #fefefe;margin: auto;padding: 20px;border: 1px solid #888;width: 80%;} ';
YAPEstyle.innerHTML += '.closeYAPE {cursor: pointer;width: 80px;height: 30px;float: right;padding: 6px;margin-top: 6px;text-align: right;} ';
YAPEstyle.innerHTML += 'div.tab{overflow:hidden;border:1px solid #ccc;background-color:#f1f1f1} ';
YAPEstyle.innerHTML += 'div.tab button{background-color:inherit;float:left;border:none;outline:0; ';
YAPEstyle.innerHTML += 'cursor:pointer;padding:14px 16px;transition:.3s;font-size:17px} ';
YAPEstyle.innerHTML += 'div.tab button:hover{background-color:#ddd}div.tab button.active{background-color:#ccc} ';
YAPEstyle.innerHTML += '.tabcontent{display:none;padding:6px 12px;border:1px solid #ccc;border-top:none} ';
YAPEstyle.innerHTML += 'textarea#csstxtar {width: 94%;height: 200px;} ';
document.getElementsByTagName('head')[0].appendChild(YAPEstyle);

// admin area
var YAPEmodel = document.createElement('div');
YAPEmodel.setAttribute('id', 'YAPEadminmodel');

// user tag box
var boxhtml = '';
boxhtml += '<div class="modal-content">';
boxhtml += '  <div class="closeYAPE" style="text-align: right;">&times; close</div>';
boxhtml += '  <div class="yapecontent">';
boxhtml += '    <div class="tab">';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Admin\')" id="defaultOpen">Admin</button>';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Tags\')">User Tags</button>';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'CSS\')">Theme</button>';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Posts\')">Posts</button>';
boxhtml += '      <button class="tablinks" onclick="openTab(event, \'Testing\')">Testing</button>';
boxhtml += '    </div>';
boxhtml += '    <div id="Admin" class="tabcontent">';
boxhtml += '      <h3>Admin</h3>';
boxhtml += '      <p>YAPE, Yet Another Phuking Extension. Add-on for Phuks!</p>';
boxhtml += '      <p>Currently works on <a href="https://phuks.co">https://phuks.co</a></p>';
boxhtml += '      <p style="text-align: right;">version 0.1.7</p>';
boxhtml += '    </div>';
boxhtml += '    <div id="Tags" class="tabcontent">';
boxhtml += '      <h3>User Tags</h3>';
boxhtml += '      <ul id="YAPEadminUserTagsUL"></ul>';
boxhtml += '    </div>';
boxhtml += '    <div id="CSS" class="tabcontent">';
boxhtml += '      <h3>Custom stylesheet</h3>';
boxhtml += '      <p>Apply a custom stylesheet to Phuks. No character limit.<br>';
boxhtml += '        <font size="-2">Since this is stored on your local machine, you can do whatever limit you want.</font>';
boxhtml += '      </p>';
boxhtml += '      <p><textarea id="csstxtar" onkeypress="remainingChar(\'csstxtar\', \'cssremainingc\', 10000)" width="100%"> </textarea>';
boxhtml += '        <div id="cssremainingc"></div>';
boxhtml += '      </p>';
boxhtml += '      <button class="" onclick="saveTheme(\'csstxtar\')">Save</button> <span id="csssaved"></span></p>';
boxhtml += '    </div>';
boxhtml += '    <div id="Posts" class="tabcontent">';
boxhtml += '      <h3>Saved Posts</h3>';
boxhtml += '      <ul id="YAPEadminSavedPostsUL"></ul>';
boxhtml += '      <hr>';
boxhtml += '      <h3>Hidden Posts</h3>';
boxhtml += '      <ul id="YAPEadminHiddenPostsUL"></ul>';
boxhtml += '    </div>';
boxhtml += '    <div id="Testing" class="tabcontent">';
boxhtml += '      <h3>Other</h3>';
boxhtml += '      <p>other</p>';
boxhtml += '<div><input type="color" id="ree" name="ree" value="#e66465"><label for="ree">ree</label></div>';
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
    //console.log(key + ', ' + elem);
    if (key.startsWith('PhuksUserTag')) {
      var newtagli = document.createElement('li');
      newtagli.innerHTML = '<a href="/u/' + key.substring(13) + '" target="_blank">' + key.substring(13) + '</a>: ' + elem + ' ';
      newtagli.innerHTML += '<img src="' + usrtagimg + '" height="16" width="16" onclick="setPhuksUserTag(\'' + key.substring(13) + '\', \'' + elem + '\')">';
      adminul.appendChild(newtagli);
    }
}

// get saved posts
var adminsaved = document.querySelector('#YAPEadminSavedPostsUL');
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var elem = localStorage.getItem(key);
    //console.log(key + ', ' + elem);
    if (key.startsWith('PhuksSavedPost')) {
      var newtagli = document.createElement('li');
      var rmspan = document.createElement('span');
      rmspan.innerHTML = '<a href="#"> remove </a>';
      rmspan.setAttribute('pid', key.substring(15));
      newtagli.innerHTML = '<a href="/p/' + key.substring(15) + '" target="_blank">' + key.substring(15) + '</a>: ' + elem + ' ';
      rmspan.addEventListener('mousedown', function(){
          var p = this.getAttribute('pid');
          localStorage.removeItem("PhuksSavedPost=" + p);
          this.innerHTML = '<a href="#" style="color:red"> removed </a>';
      });
      newtagli.appendChild(rmspan);
      adminsaved.appendChild(newtagli);
    }
}

// get hidden posts
var adminhidden = document.querySelector('#YAPEadminHiddenPostsUL');
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var elem = localStorage.getItem(key);
    //console.log(key + ', ' + elem);
    if (key.startsWith('PhuksHiddenPost')) {
      var newtagli = document.createElement('li');
      var rmspan = document.createElement('span');
      rmspan.innerHTML = '<a href="#"> remove </a>';
      rmspan.setAttribute('pid', key.substring(16));
      newtagli.innerHTML = '<a href="/p/' + key.substring(16) + '" target="_blank">' + key.substring(16) + '</a>: ' + elem + ' ';
      rmspan.addEventListener('mousedown', function(){
          var p = this.getAttribute('pid');
          localStorage.removeItem("PhuksHiddenPost=" + p);
          this.innerHTML = '<a href="#" style="color:red"> removed </a>';
      });
      newtagli.appendChild(rmspan);
      adminhidden.appendChild(newtagli);
    }
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

// Theme stylesheet
var YAPEtheme = localStorage.getItem('YAPETheme');
if (YAPEtheme) {
    var YAPEcustomStyle = document.createElement('style');
    YAPEcustomStyle.type = 'text/css';
    YAPEcustomStyle.setAttribute('class', 'YAPEtheme');
    YAPEcustomStyle.innerHTML = YAPEtheme;
    document.getElementsByTagName('head')[0].appendChild(YAPEcustomStyle);
    document.getElementById("csstxtar").value = YAPEtheme;
}
