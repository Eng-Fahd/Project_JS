let logout = document.getElementById('logout');

logout.addEventListener('click', function () {
  sessionStorage.clear();
  window.location.href = '../login.html';
});

let xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/users');
xhr.onload = function () {
  let arr = JSON.parse(xhr.responseText);
  let tr = '';
  let tr2 = '';
  let tr3 = '';
  let tr4 = '';
  let tr5 = '';
  let emptype = '';
  let arr2 = [];
  let time = '';
  let attendanctime = new Array(arr.length).fill(0);
  let latetime = new Array(arr.length).fill(0);
  let absencetime = new Array(arr.length).fill(0);
  let excusetims = new Array(arr.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    $.getJSON(
      `http://localhost:3000/reports/?userid=${arr[i].id}`,
      function (json) {
        arr2 = json;
        for (let g = 0; g < arr2.length; g++) {
          attendanctime[i] = attendanctime[i] + arr2[g].attendance;
          latetime[i] = latetime[i] + arr2[g].late;
          absencetime[i] = absencetime[i] + arr2[g].absencetim;
          excusetims[i] = excusetims[i] + arr2[g].excuse;
          time = arr2[g].time;
        }

        let fullname =
          arr[i].fname.charAt(0).toUpperCase() +
          arr[i].fname.slice(1) +
          ' ' +
          arr[i].lname.charAt(0).toUpperCase() +
          arr[i].lname.slice(1);

        let username = arr[i].username;
        switch (arr[i].flag) {
          case 0:
            emptype = 'User';
            break;
          case 1:
            emptype = 'Sub Admin';
            break;
          case 2:
            emptype = 'Admin';
            break;
        }

      
        if (!(excusetims[i] === 0)) {
          tr4 += `<td> <p class="h5 text-secondary"> ${fullname}</p></td>`;
          tr4 += `<td> <p class="h5 text-primary"> ${excusetims[i]}</p></td></tr>`;
          document.getElementById('tbody4').innerHTML = tr4;
        }

        tr += `<tr>`;
        tr += `<td> <p class="h5 text-secondary"> ${fullname}</p></td>`;
        tr += `<td> <p class="h5 text-secondary"> ${username}</p></td>`;

        document.getElementById('tbody').innerHTML = tr;

        tr2 += `<td> <p class="h5 text-secondary"> ${fullname}</p></td>`;
        tr2 += `<td> <p class="h5 text-primary" > ${attendanctime[i]}</p></td>`;
        tr2 += `<td> <p class="h5 text-info"> ${latetime[i]}</p></td>`;
        tr2 += `<td> <p class="h5 text-primary"> ${excusetims[i]}</p></td>`;
        tr2 += `<td> <p class="h5 text-danger"> ${absencetime[i]}</p></td>`;
        tr2 += `<td> <p class="h5 text-secondary"> ${time}</p></td></tr>`;
        document.getElementById('tbody2').innerHTML = tr2;

        tr5 += `<td> <p class="h5 text-secondary"> ${fullname}</p></td>`;
        tr5 += `<td> <p class="h5 text-info"> ${arr[i].address}</p></td>`;
        tr5 += `<td> <p class="h5 text-info"> ${arr[i].age}</p></td>`;
        tr5 += `<td> <p class="h5 text-info"> ${arr[i].email}</p></td>`;
        tr5 += `<td> <p class="h5 text-secondary"> ${emptype}</p></td></tr>`;
        document.getElementById('tbody5').innerHTML = tr5;
      }
    );
  }
};
xhr.send();

const piechart = document.getElementById('piechart').getContext('2d');
const polorchart2 = document.getElementById('polorchart').getContext('2d');
const donutchart2 = document.getElementById('donutchart').getContext('2d');
const barchart2 = document.getElementById('barchart').getContext('2d');
fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((data) => {
    // make chart by address
    let address = data.map((user) => user.address);
    let addressCount = {};
    address.forEach((add) => {
      if (addressCount[add] === undefined) {
        addressCount[add] = 1;
      } else {
        addressCount[add] += 1;
      }
    });
    let addressArr = Object.keys(addressCount);
    let addressCountArr = Object.values(addressCount);
    let pieChart = new Chart(piechart, {
      type: 'pie',
      data: {
        labels: addressArr,
        datasets: [
          {
            label: 'Address',
            data: addressCountArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
    });

    // make chart by age
    let age = data.map((user) => user.age);
    let ageCount = {};
    age.forEach((ag) => {
      if (ageCount[ag] === undefined) {
        ageCount[ag] = 1;
      } else {
        ageCount[ag] += 1;
      }
    });
    let ageArr = Object.keys(ageCount);
    let ageCountArr = Object.values(ageCount);
    let polorchart = new Chart(polorchart2, {
      type: 'polarArea',
      data: {
        labels: ageArr,
        datasets: [
          {
            label: 'Age',
            data: ageCountArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
    });

    // make charts by users type
    let type = data.map((user) => user.flag);
    let typeCount = {};
    type.forEach((ty) => {
      if (typeCount[ty] === undefined) {
        typeCount[ty] = 1;
      } else {
        typeCount[ty] += 1;
      }
    });
    let typeArr = Object.keys(typeCount);
    let typeCountArr = Object.values(typeCount);
    console.log(typeArr);
    if (typeArr[0] === '0') {
      typeArr[0] = 'User';
    }
    if (typeArr[1] === '1') {
      typeArr[1] = 'Sub Admin';
    }
    if (typeArr[2] === '2') {
      typeArr[2] = 'ADMIN';
    }
    let donutChart = new Chart(donutchart2, {
      type: 'doughnut',
      data: {
        labels: typeArr,
        datasets: [
          {
            label: 'Type',
            data: typeCountArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
    });
  });

// make chart by time
fetch('http://localhost:3000/reports')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // get last object of userid if duplicate
    let last = data.reduce((acc, cur) => {
      acc[cur.userid] = cur;
      return acc;
    }
    , {});
    let lastArr = Object.values(last);
    console.log(lastArr);

    // make  polarArea chart
    let time = lastArr.map((user) => user.time);
    let timeCount = {};
    time.forEach((ti) => {
      if (timeCount[ti] === undefined) {
        timeCount[ti] = 1;
      } else {
        timeCount[ti] += 1;
      }
    }
    );
    let timeArr = Object.keys(timeCount);
    let timeCountArr = Object.values(timeCount);
    let barchart = new Chart(barchart2, {
      type: 'bar',
      data: {
        labels: timeArr,
        datasets: [
          {
            label: 'Time',
            data: timeCountArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
    });  
  });

const reportContainer = document.querySelector('#reportContainer');
var opt = {
  margin: 0.7,
  filename: 'report.pdf',
  image: { type: 'jpeg', quality: 1 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'in', format: 'a3', orientation: 'landscape' },
  pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
};

const downloadReportBtn = document.querySelector('#downloadReportBtn');

downloadReportBtn.addEventListener('click', () => {
html2pdf().set(opt).from(reportContainer).save();
html2pdf(reportContainer, opt);
});