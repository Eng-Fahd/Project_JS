// Form validation

window.addEventListener('load',function(){
		
    userfirstname = document.getElementById('fname');
    userlastname = document.getElementById('lname');
    userage = document.getElementById('age');
    useradd = document.getElementById('add');
    useremail = document.getElementById('e_mail');
    
    userfnameerror = document.getElementById('userfnameerror');
    userlnameerror = document.getElementById('userlnameerror');
    userageerror = document.getElementById('userageerror');
    useradderror = document.getElementById('useradderror');
    useremailerror = document.getElementById('useremailerror');
    
    
    
    
    
    
    
    
  
    
    
    
    userfirstname.addEventListener('blur', function () {

        if (!isuserfnamevalide()) {
            userfirstname.focus();
            userfirstname.select();
            userfnameerror.style.display = 'block';
            userfirstname.classList.add("error");
            
            
        } else {
            userfnameerror.style.display = 'none';
            userfirstname.classList.remove("error");
            
        }
        check_regbtn();

    });
    userlastname.addEventListener('blur', function () {

        if (!isuserlnamevalide()) {
            userlastname.focus();
            userlastname.select();
            userlnameerror.style.display = 'block';
            userlastname.classList.add("error");
            
        } else {
            userlnameerror.style.display = 'none';
            userlastname.classList.remove("error");
            
        }
        check_regbtn();

    });
   

    userage.addEventListener('blur',function(){
        if (!isuseragevalide()) {
            // login
            userage.focus();
            userage.select();
            userageerror.style.display = 'block';
            userage.classList.add("error");
            
        } else {
            userageerror.style.display = 'none';
            userage.classList.remove("error");
            
        }
        check_regbtn();
    });	

    useradd.addEventListener('blur',function(){
        if (!isuseraddvalide()) {
            useradd.focus();
            useradd.select();
            useradderror.style.display = 'block';
            useradd.classList.add("error");
            
        } else {
            useradderror.style.display = 'none';
            useradd.classList.remove("error");
            
        }
        check_regbtn();

    });	
    useremail.addEventListener('blur',function(){
        if (!isuseremailvalide()) {
            useremail.focus();
            useremail.select();
            useremailerror.style.display = 'block';
            useremail.classList.add("error");
            
        } else {
            useremailerror.style.display = 'none';
            useremail.classList.remove("error");
            
        }
        check_regbtn();
    });	


});

function check_regbtn() {
    if(userfirstname.value.length>0 && userlastname.value.length>0 && userage.value.length>0 && useradd.value.length>0 && useremail.value.length>0)
    {
        document.getElementById('regbtn').disabled = false
    }
}
function isuserfnamevalide() {

    return userfirstname.value.match(/^[A-Za-z]+$/);
}
function isuserlnamevalide() {

    return userlastname.value.match(/^[A-Za-z]+$/);
}
function isuseragevalide(){
    return userage.value.match(/^[0-9]{1,2}$/);
}
function isuseraddvalide(){
    return useradd.value.match(/^[A-Za-z-0-9]+$/);
}
function isuseremailvalide() {
    return useremail.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
}

// redi
function redi(){
    document.getElementById("loginbtn").addEventListener('click', () => {
        window.location.href = '2-login.html'
    });
    
}
login = document.getElementById("loginbtn");
login.addEventListener('click',redi())
    

// send data to server

register = document.getElementById("regbtn")

register.addEventListener('click',async function(e) {
    e.preventDefault();
    fname = document.getElementById('fname')
    lname = document.getElementById('lname')
    e_mail = document.getElementById('e_mail')
    address = document.getElementById('add')
    age = document.getElementById('age')
    // create random username and password 
    function generateName() {
        let length = 7,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;}
    userName = generateName();
    function generatePassword() {
        let length = 4,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;}
    pass = generatePassword();

    let dataa = {
        "fname": fname.value,
        "lname": lname.value,
        "age": age.value,
        "e_mail": e_mail.value,
        "address" : address.value,
        "user_name" : userName,
        "password" : pass
        
    }
    
    await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataa),
    })
  
    
    setTimeout("location.href = '2-login.html';",1000);
    
    
})


function Sendmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ahmed.abdalllah22@gmail.com",
        Password : "8AEA0596BD082E6B9609B67DC67C42377995",
        To : e_mail.value ,
        From : "ahmed.abdalllah22@gmail.com",
        Subject : "This is the subject of mail",
        Body : `
        <h4>Employee Data</h4>
        <table width="100%" border="1">
        <thead>
          <tr>
            <th>Full-Name</th>
            <th>First-Name</th>
            <th>Last-Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Age</th>
            <th>User Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${fname.value}  ${lname.value}</th>
            <td>${fname.value}</td>
            <td>${lname.value}</td>
            <td>${address.value}</td>
            <td>${e_mail.value}</td>
            <td>${age.value}</td>
            <td>${userName}</td>
            <td>${pass}</td> 
          </tr>
        </tbody>
      </table>      
        `
    })
}
