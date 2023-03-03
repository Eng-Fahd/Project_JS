let email,
  username,
  password,
  fname,
  addres,
  lname = '';
let randomnum,
  age = 0;
let userdata = {};

let form = document.getElementById('registerform');

fname = document.getElementsByClassName('form-control')[0];
lname = document.getElementsByClassName('form-control')[1];
addres = document.getElementsByClassName('form-control')[2];
email = document.getElementsByClassName('form-control')[3];
age = document.getElementsByClassName('form-control')[4];

let fnamespan = document.getElementById('fnameError');
let lnamespan = document.getElementById('lnameError');
let addrespan = document.getElementById('addressError');
let emailspan = document.getElementById('emailError');
let agespan = document.getElementById('ageError');

randomnum = Math.floor(Math.random() * 1000) + 1;
password = Math.random().toString(36).slice(-8);

function isfnamevalid() {
  let fnamepattern = /^[A-Za-z]{3,9}$/;
  return fname.value.match(fnamepattern);
}

function islnamevalid() {
  let lnamepattern = /^[A-Za-z]{4,9}$/;
  return lname.value.match(lnamepattern);
}
function isaddrevalid() {
  let addrespattern = /^\s*\S+(?:\s+\S+)/;

  return addres.value.match(addrespattern);
}
function isemailvalid() {
  let emailpattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.value.match(emailpattern);
}

function isagelvalid() {
  let agepattern = /^[0-9]{2}$/;
  return age.value.match(agepattern);
}

fname.addEventListener('blur', function () {
  if (!isfnamevalid()) {
    fnamespan.style.display = 'block';
  } else {
    fnamespan.style.display = 'none';
  }
});

lname.addEventListener('blur', function () {
  if (!islnamevalid()) {
    lnamespan.style.display = 'block';
  } else {
    lnamespan.style.display = 'none';
  }
});

addres.addEventListener('blur', function () {
  if (!isaddrevalid()) {
    addrespan.style.display = 'block';
  } else {
    addrespan.style.display = 'none';
  }
});

email.addEventListener('blur', function () {
  if (!isemailvalid()) {
    emailspan.style.display = 'block';
  } else {
    emailspan.style.display = 'none';
  }
});

age.addEventListener('blur', function () {
  if (!isagelvalid()) {
    agespan.style.display = 'block';
  } else {
    agespan.style.display = 'none';
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (
    isfnamevalid() &&
    islnamevalid() &&
    isaddrevalid() &&
    isemailvalid() &&
    isagelvalid()
  ) {
    userdata = {
      id: password,
      fname: `${fname.value}`,
      lname: `${lname.value}`,
      address: `${addres.value}`,
      email: `${email.value}`,
      age: `${age.value}`,
      username: `${
        fname.value.substring(0, 4) + randomnum + lname.value.substring(0, 2)
      }`,
      password: `${password}`,
      flag: 0,
    };
    sweetAlertFunction(userdata);
  }
});

let sweetAlertFunction = (userdata) => {
  fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((data) => {
      let flag = 0;
      data.forEach((element) => {
        if (element.email === userdata.email) {
          flag = 1;
        }
      });
      if (flag === 1) {
        swal.fire({
          title: 'Error',
          text: 'You try to register with an existing email',
          icon: 'error',
          confirmButtonText: 'ok',
        });
      } else {
        Swal.fire({
          title: 'whoo',
          text: 'You are registered successfully',
          html: `
            <div class='fs-5'>username is: <span class='fw-bold'>${userdata.username}</span></div>
            <div class='fs-5'>password is: <span class='fw-bold'>${userdata.password}</span></div>
            `,
          icon: 'success',
          footer: 'An Email sent with username and password for login',
          confirmButtonText: 'ok',
        }).then((result) => {
          if (result.isConfirmed) {
            Email.send({
              SecureToken:'6c772e1f-2b7c-43ad-a0f1-586461b19b93',
              Host: 'smtp.elasticemail.com',
              Username: 'fahd.kh@gmail.com',
              Password: 'FD6EDB42D9FEA8EC1B85B23561DC6E7C3282',
              To: `${userdata.email}`,
              From: 'fahd.kh@gmail.com',
              Subject: `Welcome ${userdata.fname}`,
              Body: `Hello ${userdata.fname} ${userdata.lname} <br> <br> Your username is: ${userdata.username} <br> Your password is: ${userdata.password} <br> <br> Thank you for registering with us`,
            }).then((message) => console.log(message));

            fetch('http://localhost:3000/users', {
              method: 'POST',
              body: JSON.stringify(userdata),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((response) => response.json())
              .then((json) => {
                // sendEmail(userdata);
              });
          }
        });
      }
    });
};