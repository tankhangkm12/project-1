let check_username = false; 
let check_password = false; 
let check_confirm = false;
let REGISTER_API=""

fetch("http://127.0.0.1:5000/get-ip")
    .then(response=>response.json())
    .then(ip_andress=>{
        REGISTER_API = "http://" +ip_andress["ip"]+ ":5000/register/add-account"
    })
    .catch(error=>{
        console.error("Error: "+error.message)
    })

document.querySelector("#name").addEventListener("input",function(event){
    let pattern_username = /^[a-zA-Z1-9]{7,30}$/
    if (!pattern_username.test(document.querySelector("#name").value))
    {
        (document.querySelector("#name")).style.border="3px solid red"
        check_username=false
    }
    else
    {
        (document.querySelector("#name")).style.border="3px solid green"
        check_username=true
    }
})

document.querySelector("#pass").addEventListener("input",function(event)
{
    let pattern_password=/^[1-9a-zA-Z!@#$%^&*()_+{}\\:;<>,.?~\\/-]{7,30}$/
    let password_object=document.querySelector("#pass")
    if (!pattern_password.test(password_object.value))
    {
        password_object.style.border="3px solid red"
        check_password=false
    }
    else
    {
        password_object.style.border="3px solid green"
        check_password=true
    }
})


document.querySelector("#confirm").addEventListener("input",function(event)
{
    let password=document.querySelector('#pass').value
    let confirm=document.querySelector("#confirm").value
    if (password!==confirm)
    {
        document.querySelector("#confirm").style.border="3px solid red"
        check_confirm=false
    }
    else
    {
        document.querySelector("#confirm").style.border="3px solid green"
        check_confirm=true
    }
}
)

document.querySelector("#register-button").addEventListener("click",function(event)
{
    if (!check_username)
    {
        alert("User name structure is wrong ! ")
        return
    }

    if (!check_password)
    {
        alert("Password structure is wrong! ")
        return
    }

    if (!check_confirm)
    {
        alert("Confirm password not like password ! ")
        return
    }

    let username=document.querySelector("#name").value
    let password=document.querySelector("#pass").value
    let account={
        "username":username,
        "password":password
    }
    
    fetch(REGISTER_API,{method:'POST',
        headers : {"content-Type": "application/json",},
        body:JSON.stringify(account),
    })
    .then(response=>{
        if (response.status===200) 
        {
            alert("Register Success")   
            window.location.href="login.html"   
        }
        else
        {
            response.json().then(data=>{
                alert("Register Failed: "+data.message)
            })
        }
    })
    .catch (error=>{
        alert("Register Failed !"+error.message)
    })
})



