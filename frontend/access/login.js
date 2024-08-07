let button_login=document.querySelector("#login-button")
API_CHECK_LOGIN=''

fetch("http://127.0.0.1:5000/get-ip")
    .then(response=>response.json())
    .then(ip_andress=>{
        API_CHECK_LOGIN="http://"+ip_andress["ip"]+":5000/login/check-account"
    })
    .catch(error=>{
        console.error("Error"+error.message)
    })


button_login.addEventListener("click",function(even){
    var username=document.querySelector("#name").value;
    var password=document.querySelector("#pass").value;
    let account={
        "username": username,
        "password": password
    }
    fetch(API_CHECK_LOGIN,{method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(account),
    })
    .then(response=>{
        if (response.status===200)
        {
            localStorage.setItem("username",username);
            window.location.href="home.html";
        }
        else
        {
            response=>response.json()
            .then(err=>
                {
                    alert("Login failure: "+err.message);
                }
            )
        };
        })
    .catch(error => {
        alert("Login failure: "+error.message);
    })
    
    
});





