function load() {
    //const bcrypt = require('bcrypt');
    let icon = document.getElementById("icons");
    let password = document.getElementById("pwd");
    //let check = document.getElementById("check");
    let vemail = document.getElementById("vemail");
    let email = document.getElementById("email");
    let checkbox = document.getElementById("checkbox");
    let idnames = ["email", "pwd"];
    let submitbutton = document.getElementById("submitbutton");
    let checkval = 0;
    var key = 'abc123XYZ';
    let locallength = localStorage.length;


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
        if (vemail.innerHTML == "Valid" && password.value != "") {
            for (var i = 0; i< locallength ; i++){
                let idname = "data" + i;
                let object = localStorage.getItem(idname);
                let data = JSON.parse(object);

                if (data.email == email.value){
                    let checkpassword = data.password;
                    console.log(checkpassword);
                    nextpage(checkpassword);
                    break;
                }
            }            
           
        }

        else{
            alert("Something is not valid");
        }

    });

    function nextpage(checkpassword){
        var pp = password.value;
        var decrypted = CryptoJS.AES.decrypt(checkpassword, key);
        var pass = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(pass);
        if (pass == pp){
            document.location = "./index2.html";
            alert("right password");
        }

        else{
            alert("wrong password");
        }
    }







}