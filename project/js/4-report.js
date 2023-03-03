window.addEventListener('load', function () {
    
    let fulname = localStorage.getItem("FullName");
    foot1 = document.getElementById('fristfooter');
    foot1.innerHTML += fulname;
    foot2 = document.getElementById('secfooter');
    foot2.innerHTML += fulname;

    let usrname = localStorage.getItem("UserName");
    //console.log(usrname)
    let attend_time = localStorage.getItem("Time");
    
    daily_button = document.getElementById('daybtn')
    daily_button.addEventListener('click', async function(e) {
        //console.log(usrname)
        e.preventDefault();
        //console.log(usrname)
        let user_record = await fetch(`http://localhost:3000/users?user_name=${usrname}`)
        let user_records = await user_record.json();

        //let emp_record = await fetch(`http://localhost:3000/emp?user_name=${usrname}`)
        //let emp_records = await emp_record.json();
        
        // div1
        day_div = document.getElementById('daily')
        day_div.innerHTML += attend_time
        
        create_element("p",`First Name --> ${user_records[0].fname}`,'daily')
        create_element("p",`Last Name --> ${user_records[0].lname}`,'daily')
        create_element("p",`Age --> ${user_records[0].age}`,'daily')
        create_element("p",`Address --> ${user_records[0].address}`,'daily')

        /* var node1 = document.createElement("p");                 
        var textnode1 = document.createTextNode(user_records[0].fname);            
        node1.appendChild(textnode1);                              
        document.getElementById("daily").appendChild(node1); */
        
        document.getElementById('daybtn').disabled = true
    });

    
    monthly_button = document.getElementById('monbtn')
    monthly_button.addEventListener('click', async function(e) {
        e.preventDefault();

        let user_record = await fetch(`http://localhost:3000/users?user_name=${usrname}`)
        let user_records = await user_record.json();

        let emp_record = await fetch(`http://localhost:3000/emp?user_name=${usrname}`)
        let emp_records = await emp_record.json();


        att_arr = [];  
        for (let i = 0; i < emp_records.length; i++) 
        {
            
            att_arr.push(emp_records[i].day)

        }
        let Attendance_Times = att_arr.length;
        let Absence_Times = 24-att_arr.length;
        
        
        let Late_Times = 0
        for (let i = 0; i < emp_records.length; i++) 
        {
            if( "09:00 AM" != emp_records[i].login_time)
            {
                Late_Times = Late_Times +1;
                
            }
        } 

        
        
        create_element("p",`Attendance Times --> ${Attendance_Times}`,'monthly');
        create_element("p",`Late Times --> ${Late_Times}`,'monthly');
        create_element("p",`Absence Times --> ${Absence_Times}`,'monthly');
        
        
        
        
        

        

        document.getElementById('monbtn').disabled = true
    });
        


});

function create_element(tag,text,id) {
    var node = document.createElement(tag);
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById(id).appendChild(node);
}