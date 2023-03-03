let username = document.getElementById('username');
let address = document.getElementById('adreess');
let email = document.getElementById('email');
let age = document.getElementById('age');
let attendancetime = document.getElementById('attime');
let username2 = document.getElementById('username2');
let address2 = document.getElementById('adreess2');
let email2 = document.getElementById('email2');
let age2 = document.getElementById('age2');
let attendancetime2 = document.getElementById('attime2');
let attendancetimes = document.getElementById('attimes');
let latime = document.getElementById('latime');
let abscetime = document.getElementById('abscetime');
let excuse = document.getElementById('excuse');
let tex = document.getElementById('tex');
let searchBtn = document.getElementById('searchBtn');
let seruser = '';

let logout = document.getElementById('logout');
logout.addEventListener('click', function () {
  // clear session storage
  sessionStorage.clear();
  window.location.href = '../index.html';
});

let arr2 = [];
searchBtn.addEventListener('click', function (e) {
  let xhr = new XMLHttpRequest();
  xhr.open('get', `http://localhost:3000/users`);
  xhr.onload = function () {
    let arr = JSON.parse(xhr.responseText);
    arr = arr.filter((item) => item.username == tex.value);
    // console.log(arr);


    for (let i = 0; i < arr.length; i++) {
      if (arr[i].username == tex.value) {
        let xhr2 = new XMLHttpRequest();
        xhr2.open('get', `http://localhost:3000/reports`);
        xhr2.onload = function () {
          let arr2 = JSON.parse(xhr2.responseText);
          arr2 = arr2.filter((item) => item.userid == arr[i].id);
          for (let j = 0; j < arr2.length; j++) {
            if (arr2[j].userid == arr[i].id) {
              username.value = arr[i].username;
              address.value = arr[i].address;
              email.value = arr[i].email;
              age.value = arr[i].age;
              attendancetime.value = `${arr2[j].time}  // ${arr2[j].date}`  ;
            }
          }
        };
        xhr2.send();
      }
    }
    
  };
  xhr.send();
});
