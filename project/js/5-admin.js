window.addEventListener('load', async function(e) {
    
    e.preventDefault();

    let user_record = await fetch(`http://localhost:3000/users`)
    let user_records = await user_record.json();
    
    for (let i = 0; i < user_records.length; i++) 
    {
        
        let emp_record = await fetch(`http://localhost:3000/emp?user_name=${user_records[i].user_name}`)
        let emp_records = await emp_record.json();
        
        att_arr = [];
        for (let x = 0; x < emp_records.length; x++) 
        {
            att_arr.push(emp_records[x].day)
        }

        let Attendance_Times = att_arr.length;
        let Absence_Times = 24-att_arr.length;
        
    
        let Late_Times = 0
        for (let c = 0; c < emp_records.length; c++) 
        {   
            if( "09:00 AM" != emp_records[c].login_time)
            {
                Late_Times = Late_Times +1;    
            }
        } 
        full_name = user_records[i].fname+' '+user_records[i].lname 
        table_data1(full_name,Attendance_Times,Late_Times,Absence_Times)
        table_data2(full_name,Late_Times )    
        table_data3(full_name,Attendance_Times,Absence_Times)
        table_data4(user_records[i].fname,user_records[i].lname,user_records[i].age,user_records[i].address)
    }
    

    
    

});


function table_data1(empname, att, late, excuse) {
    var table = document.getElementById("allemp");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = empname;
    cell2.innerHTML = att;
    cell3.innerHTML = late;
    cell4.innerHTML = excuse;
}    
function table_data2(empname,late) {
    var table = document.getElementById("late");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = empname;
    cell2.innerHTML = late;
    
}
function table_data3(empname,att,excuse) {
    var table = document.getElementById("excuse");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = empname;
    cell2.innerHTML = att;
    cell3.innerHTML = excuse;
    
}
function table_data4(fname,lname,age,add) {
    var table = document.getElementById("data");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = fname;
    cell2.innerHTML = lname;
    cell3.innerHTML = age;
    cell4.innerHTML = add;
    
}                