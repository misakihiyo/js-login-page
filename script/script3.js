function load() {
    //const bcrypt = require('bcrypt');
    let icon = document.getElementById("icons");
    let password = document.getElementById("pwd");
    let icons2 = document.getElementById("icons2");
    let repwd = document.getElementById("retypepwd")
    let check = document.getElementById("check");
    let vemail = document.getElementById("vemail");
    let vname = document.getElementById("vname");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let checkbox = document.getElementById("checkbox");
    let idnames = ["name", "email", "pwd", "retypepwd"];
    let submitbutton = document.getElementById("submitbutton");
    let checkval = 0;
    let obj = {email : "", name:"", password:""};
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

    icons2.addEventListener("click", function () {
        icons2.classList.toggle("icon-eye-blocked")
        if (repwd.type === "password") {
            repwd.type = "text";
        }

        else {
            repwd.type = "password";
        }
    });

    password.addEventListener("keyup", function () {
        if (password.value == repwd.value) {
            check.innerHTML = "Match";
        }

        else {
            check.innerHTML = "does not match";
        }
    });

    repwd.addEventListener("keyup", function () {
        if (password.value == repwd.value) {
            check.innerHTML = "Match";
        }

        else {
            check.innerHTML = "does not match";
        }
    });

    name.addEventListener("keyup", function () {
        a = /^[A-Za-z ,.'-]+$/i;
        if (name.value.match(a)) {
            vname.innerHTML = "Valid";
        }

        else {
            vname.innerHTML = "invalid";
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
                    console.log(checkval);
                }
            }

            if (checkval == 4 && checkbox.checked == true) {
                submitbutton.disabled = false;
            }
            else {
                submitbutton.disabled = true;
            }

        }
    });

    submitbutton.addEventListener("click", function () {
        if (vname.innerHTML == "Valid" && vemail.innerHTML == "Valid" && check.innerHTML =="Match") {
            document.location = "./index.html";
            var encrypted = CryptoJS.AES.encrypt(password.value, key);
            var stringname = "data" + (locallength-1);
            obj  = {email:email.value, name:name.value, password: encrypted.toString()};
            localStorage.setItem(stringname,JSON.stringify(obj));
           
        }

        else{
            alert("Something is not valid");
        }
    });







}