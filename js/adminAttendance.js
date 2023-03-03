let username = '';
let empname = '';
let arr2 = [];
let data = [];
let time = ''; //8:30:00
let abce = 0; //absence time
let late = 0; //late
let att = 0; //attendance time
let user = document.getElementById('username');
let btn = document.getElementById('Confirm');
let excuse = document.getElementById('excuse');
let logout = document.getElementById('logout');

function getdata() {
  let xhr = new XMLHttpRequest();
  let xhr2 = new XMLHttpRequest();
  let repoid = 0;
  xhr.open('get', 'http://localhost:3000/users');
  xhr2.open('get', 'http://localhost:3000/reports');

  xhr.onload = function () {
    let arr = JSON.parse(xhr.responseText);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].username == user.value) {
        username.value = '';

        // this is the time that the employee should be here
        const datehours = 8;

        let today = new Date();

        let date =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        time =
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds();

        // this is the time that the employee is actually here
        let cominghour = today.getHours();

        console.log(cominghour, datehours);
        
        if (cominghour - datehours > 1) {
          abce = 1;
          att = 0;
        }
        else if (cominghour - datehours == 1) {
          late = 1;
        }
        else{
           abce = 0;
           late = 0;
           att = 1;
        }


        empname = arr[i].fname + ' ' + arr[i].lname;
        let usernamesend = arr[i].username;
        jsarray = [usernamesend, time];
        sessionStorage.setItem('jsArray', JSON.stringify(jsarray));

        data = {
          id: repoid,
          userid: arr[i].id,
          date: date,
          time: time,
          attendance: att,
          late: late,
          excuse: 0,
          absencetim: abce,
        };  

        console.log(data);
       

        Swal.fire({
          title: '<strong>your data saved</strong>',
          icon: 'success',
          html:
            `<p class="h4">Employee Name: ${empname}</p>` +
            `<p class="h4">Attendance Time: ${time}</p>` 
      ,

          showCloseButton: false,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: 'Close!',
        }).then((result) => {
          if (result.isConfirmed) {
            senddata(data);
          }
        });

        return;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'WHAT!',
          text: 'Do you want to submit attendance for an invisible employee?',
        });
      }
    }
  };
  xhr.send();
  xhr2.send();
}

function senddata(dataSent) {
  $.ajax({
    url: 'http://localhost:3000/reports',
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(dataSent),
  });
}

btn.addEventListener('click', function () {
  getdata();
});

excuse.addEventListener('click', function () {
  Swal.fire({
    title: 'Are you sure',
    text: 'You want to excuse this employee?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, excuse him!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Excused!', 'Employee has been excused.', 'success');
      makeExcuse();
    }
  });
});

function makeExcuse() {
  let xhr = new XMLHttpRequest();
  xhr.open('get', 'http://localhost:3000/users');
  xhr.onload = function () {
    let arr = JSON.parse(xhr.responseText);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].username == user.value) {
        fetch('http://localhost:3000/reports?userid=' + arr[i].id, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let last = data.length - 1;
            console.log(data[last].id);
            fetch('http://localhost:3000/reports/' + data[last].id, {
              method: 'PATCH',
              body: JSON.stringify({
                // add excuse +1
                excuse: data[last].excuse + 1,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((response) => response.json())
              .then((json) => console.log(json));
          });
      }
    }
  };
  xhr.send();
}
