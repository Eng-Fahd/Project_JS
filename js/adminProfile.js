let empname = document.getElementById('name');
let username = document.getElementById('username');
let address = document.getElementById('address');
let email = document.getElementById('email');
let age = document.getElementById('age');
let username2 = document.getElementById('username2');
let catig = document.getElementById('categry');

let attendancetime = document.getElementById('attime');
let attendancetimes = document.getElementById('attimes');
let latimes = document.getElementById('lates');
let latime = document.getElementById('late');
let abscetime = document.getElementById('absc');
let abscetimes = document.getElementById('abscs');
let excuse = document.getElementById('excuse');
let excuses = document.getElementById('excuses');
let seruser = '';

let logout = document.getElementById('logout');
logout.addEventListener('click', function () {
  // clear session storage
  sessionStorage.clear();
  window.location.href = '../index.html';
});


let jsarray2 = JSON.parse(sessionStorage.getItem('jsArray2'));
console.log(jsarray2);

let arr2 = [];
let emptype = '';

let xhr = new XMLHttpRequest();
xhr.open('get', `http://localhost:3000/users`);
xhr.onload = function () {
  let arr = JSON.parse(xhr.responseText);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].username == jsarray2[0]) {
      switch (arr[i].flag) {
        case 0:
          emptype = 'Employee';
          break;
        case 1:
          emptype = 'Sub Admin';
          break;
        case 2:
          emptype = 'Admin';
          break;
      }

      const time = '8';
      let timeend = new Date(`${jsarray2[2]}:2023`).getHours();
      console.log(timeend);

      let latee = 'no';
      let excusess = 'no';
      let absencettt = 'no';
      
      if (timeend - time == 1) {
        latee = 'yes';
      }
      if (timeend - time > 1) {
        latee = 'no';
        excusess = 'no';
        absencettt = 'yes';
      }
      
      $.getJSON(
        `http://localhost:3000/reports/?userid=${arr[i].id}`,
        function (json) {
          arr2 = json;
          let attendanctime = 0;
          let latetime = 0;
          let absencetime = 0;
          let excusetims = 0;

          //get the first element of the array
          for (let g = 0; g < arr2.length; g++) {
            if (arr[i].id == arr2[g].userid) {
              
              console.log(arr2[g].absencetim);


              attendanctime = attendanctime + arr2[g].attendance;
              latetime = latetime + arr2[g].late;
              absencetime = absencetime + arr2[g].absencetim;
              excusetims = excusetims + arr2[g].excuse;

            }
          }

          let fullname =
            arr[i].fname.charAt(0).toUpperCase() +
            arr[i].fname.slice(1) +
            ' ' +
            arr[i].lname.charAt(0).toUpperCase() +
            arr[i].lname.slice(1);
          empname.innerText = fullname;
          username.innerText = jsarray2[0];
          address.innerText = arr[i].address;
          email.innerText = arr[i].email;
          age.innerText = arr[i].age;
          attendancetime.value = jsarray2[2];
          username2.innerText = arr[i].username;
          catig.innerText = emptype;
          attendancetimes.value = attendanctime;
          latimes.value = latetime;
          latime.value = latee;
          abscetime.value = absencettt;
          abscetimes.value = absencetime;
          excuse.value = excusess;
          excuses.value = excusetims;
        }
      );
    }
  }
};
xhr.send();
