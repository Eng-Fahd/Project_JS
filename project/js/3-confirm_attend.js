window.addEventListener('load', function() {
    username = document.getElementById('username')
    confirm = document.getElementById('subbtn')

    confirm.addEventListener('click', async function (e) {
        e.preventDefault();
        
        let emp_record = await fetch(`http://localhost:3000/emp?user_name=${username.value}`)
        let emp_records = await emp_record.json();
        
        
        for (let i = 0; i < emp_records.length; i++)
        {
            if(emp_records[i].day == new Date().toISOString().slice(0, 10))
            {
                show_div();
                fulname = `Name : ${emp_records[i].full_name}`
                localStorage.setItem("FullName", emp_records[i].full_name);
                usrname = `User Name : ${emp_records[i].user_name}`
                localStorage.setItem("UserName", emp_records[i].user_name);
                Time = `Time : ${emp_records[i].login_time}`
                localStorage.setItem("Time", emp_records[i].login_time);
                diplay_data(fulname,usrname,Time)
                setTimeout("location.href = '4-report.html';",4000);   
            }

        }
        
        
        
        
        
    })
});

function show_div() {
    var element = document.getElementById("myDIV");
    element.classList.add("mystyle");
}

function diplay_data(fullname,username,time) {

    var node1 = document.createElement("p");
    var node2 = document.createElement("p");
    var node3 = document.createElement("p");
    
    
    var textnode1 = document.createTextNode(fullname);
    var textnode2 = document.createTextNode(username);
    var textnode3 = document.createTextNode(time);
    
    
    node1.appendChild(textnode1);
    node2.appendChild(textnode2);
    node3.appendChild(textnode3);
    
    
    document.getElementById("myDIV").appendChild(node1);
    document.getElementById("myDIV").appendChild(node2);
    document.getElementById("myDIV").appendChild(node3);
    
}    
    
