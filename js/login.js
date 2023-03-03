let data = [];

let username = document.getElementById('username');
let pass = document.getElementById('pass');
let userspan = document.getElementById('usernameError');
let passspan = document.getElementById('passwordError');
let login = document.getElementById('login');

username.addEventListener('blur', function () {
  if (!isusernamevalid()) {
    userspan.style.display = 'block';
  } else {
    userspan.style.display = 'none';
  }
});

pass.addEventListener('blur', function () {
  if (!isuserpassvalid()) {
    passspan.style.display = 'block';
  } else {
    passspan.style.display = 'none';
  }
});

function isusernamevalid() {
  let usernamepattern = /^[a-zA-Z0-9]+(?=.{3,})/;
  return username.value.match(usernamepattern);
}
function isuserpassvalid() {
  let strongRegex = new RegExp('^(?=.{8,})');
  return pass.value.match(strongRegex);
}

login.addEventListener('click', function () {
  getdata();
});

function getdata() {
  let xhr = new XMLHttpRequest();
  xhr.open('get', 'http://localhost:3000/users');
  xhr.onload = function () {
    arr = JSON.parse(xhr.responseText);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].username == username.value && arr[i].password == pass.value) {
        let usernamesend = arr[i].username;
        let passsend = arr[i].password;
        let today = new Date();

        let time =
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds();

        let jsarray2 = [usernamesend, passsend, time];
        sessionStorage.setItem('jsArray2', JSON.stringify(jsarray2));

        if (arr[i].flag == 0) {
          window.location.href = '/memberPages/home.html';
          return;
        }
        if (arr[i].flag == 1) {
          window.location.href = '/subAdminPages/home.html';
          return;
        }
        if (arr[i].flag == 2) {
          window.location.href = '/adminPages/home.html';
          return;
        }
      }
    }

    Swal.fire({
      title: 'Error!',
      text: 'Username or Password is incorrect',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  };
  xhr.send();
}
