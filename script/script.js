function load() {
    //const bcrypt = require('bcrypt');
    let icon = document.getElementById("icons");
    let password = document.getElementById("pwd");
    //let check = document.getElementById("check");
    let vemail = document.getElementById("vemail");
    let email = document.getElementById("email");
    let checkbox = document.getElementById("checkbox");
    let modal = document.getElementById("modal");
    let idnames = ["email", "pwd"];
    let submitbutton = document.getElementById("submitbutton");
    let datadismiss = document.getElementById("datadismiss");
    let mymodal = document.getElementById("myModal");
    let checkval = 0;
    var key = 'abc123XYZ';
    let locallength = localStorage.length;
    let i=0;


    icon.addEventListener("click", function () {
        icon.classList.toggle("icon-eye-blocked")
        if (password.type === "password") {
            password.type = "text";
        }

        else {
            password.type = "password";
        }
    });

    email.addEventListener("keyup", function () {
        a = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.value.match(a)) {
            vemail.innerHTML = "Valid";
        }

        else {
            vemail.innerHTML = "invalid";
        }
    });

    checkbox.addEventListener("click", function () {

        if (checkbox.checked == true) {

            for (var i = 0; i < idnames.length; i++) {
                var fieldname = idnames[i];

                if (document.getElementById(fieldname).value != "") {

                    checkval += 1;
                }
            }

            if (checkval == 2 && checkbox.checked == true) {
                submitbutton.disabled = false;
            }
            else {
                submitbutton.disabled = true;
            }

        }
    });

    submitbutton.addEventListener("click", function () {
        if (vemail.innerHTML == "Valid" && password.value != "" && email.value != "") {
            for (i = 0; i< (locallength-2) ; i++){
                let idname = "data" + i;
                let object = localStorage.getItem(idname);
                let data = JSON.parse(object);
                
                if(data == null){
                    locallength +=1;
                }

                else{

                    if (data.email == email.value && data.verified == "unverified"){
                        console.log("ununun");
                        modal.innerHTML = "unverified";
                        mymodal.style.display = "block";
                    }

                    else if (data.email == email.value && data.verified == "verified"){
                        let checkpassword = data.password;
                        localStorage.setItem("currentlylogged", i);
                        nextpage(checkpassword);
                        break;
                    }
                }
                
            }   
             
            
            if(i == (locallength-2)){

                if (email.value == "admin@gmail.com"){
                    let checpassword = JSON.parse(localStorage.getItem("admin"));
                    
                    var decrypt = CryptoJS.AES.decrypt(checpassword.password, key);
                    var pass = decrypt.toString(CryptoJS.enc.Utf8);

                    if (pass == password.value){
                        document.location="admin.html";
                        localStorage.setItem("currentlylogged",99999);
                       
                    }
                    else{
                        modal.innerHTML="wrong password";
                        mymodal.style.display = "block";
                    }
                   
                }
            
            }          
                       
        }

        else if (vemail.innerHTML == "invalid"){
            modal.innerHTML = "email is invalid";
            mymodal.style.display = "block";
        }

        else if (email.value == ""){
            modal.innerHTML = "email is empty";
            mymodal.style.display = "block";
        }

        else if(password.value == ""){
            modal.innerHTML = "password is empty";
            mymodal.style.display = "block";
        }

        else{
            modal.innerHTML = "something is not valid";
            mymodal.style.display = "block";
        }

    });

    datadismiss.addEventListener("click", function(){
        mymodal.style.display = "none";
    });

    function nextpage(checkpassword){
        var pp = password.value;
        var decrypted = CryptoJS.AES.decrypt(checkpassword, key);
        var pass = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(pass);
        if (pass == pp){
            document.location = "./index2.html";
        }

        else{
            alert("wrong password");
        }
    } 
}