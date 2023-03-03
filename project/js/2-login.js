
window.addEventListener('load',function () {

    login = document.getElementById('logbtn');
    username = document.getElementById('username')
    pass = document.getElementById('pass')
    
    usernameerror = document.getElementById('usernameerror')
    passerror = document.getElementById('userpasserror')
    
    
    
    

    login.addEventListener('click',async function(e) {
    
        e.preventDefault();
            
          
        let user_record = await fetch(`http://localhost:3000/users?user_name=${username.value}`)
        let user_records = await user_record.json();
        //console.log(user_records[0].user_name)
        //console.log(username.value)
        if ( username.value.length > 0 && pass.value.length > 0)
        {
            if(user_records.length > 0)
            {
                if(user_records[0].password != pass.value)
                {
                    show_div();
                    check_data(" Wrong Password, Password Does Not Match Your Password");
                    setTimeout("location.reload()",3000)
                
                }
                else
                {
                    let emp_record = await fetch(`http://localhost:3000/emp?user_name=${username.value}`)
                    let emp_records = await emp_record.json();
                    //console.log(emp_records[0].day)
                    if(emp_records.length > 0)
                    {
                        if(emp_records[emp_records.length-1].day == new Date().toISOString().slice(0, 10) )
                        {
                            setTimeout("location.href = '3-confirm_attend.html';",1000);
                        }
                        else
                        {
                            let dataa = {
                                "full_name": user_records[0].fname+' '+user_records[0].lname, 
                                "user_name" : username.value,
                                "login_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                                "day": new Date().toISOString().slice(0, 10) }     
                            
                            await fetch('http://localhost:3000/emp', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(dataa),
                                })
                            setTimeout("location.href = '3-confirm_attend.html';",1000);
                        }
                    } 
                    else
                    {
                        let dataa = {
                            "full_name": user_records[0].fname+' '+user_records[0].lname, 
                            "user_name" : username.value,
                            "login_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                            "day": new Date().toISOString().slice(0, 10) }     
                        
                        await fetch('http://localhost:3000/emp', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(dataa),
                            })
                        setTimeout("location.href = '3-confirm_attend.html';",1000);
                    }
                    
                }
                
            }
            
            else
            {
                show_div();
                check_data(" Wrong User Name, User Name Does Not Exist");
                setTimeout("location.reload()",3000)
            }
        }
        else
        {
            show_div();
            check_data("Empty data, You should Enter User Name and Password");
            setTimeout("location.reload()",3000)
        }
                
               
                              
    })
    
    
})

function show_div() {
    var element = document.getElementById("myDIV");
    element.classList.add("mystyle");
 }

 function check_data(displayed) {

    var node = document.createElement("H5");
    var node2 = document.createElement("span")
    //node2.setAttribute('class',"close")
    var textnode = document.createTextNode(displayed);
    node.appendChild(textnode);
    document.getElementById("myDIV").appendChild(node);
    //document.getElementById("myDIV").appendChild(node2);
    
 }




