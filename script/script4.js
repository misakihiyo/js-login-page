function load(){
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let logged = localStorage.getItem("currentlylogged");
    let icons = document.getElementsByClassName("icon-quill");
    let locallength = localStorage.length;
    let modal = document.getElementById("editfield");
    let editing = document.getElementById("editing");
    let edited = document.getElementById("edited");
    let obj;
    let nameicon = document.getElementById("nameicon");
    let passwordicon = document.getElementById("passwordicon");
    let emailicon = document.getElementById("emailicon");
    var key = 'abc123XYZ';
    let emailreg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let error = document.getElementById("error");
    let confirm = document.getElementById("confirm");
    let confirmpass = document.getElementById("confirmpass");
    let conpass = document.getElementById("conpass");
    let submitbutton = document.getElementById("submitbutton");
    let i;
    let namereg= /^[A-Za-z ,.'-]+$/i;

    for (i =0; i <(locallength-2); i++){
        let idname = "data" + i;
        let checkid = JSON.parse(localStorage.getItem(idname));
        if (checkid == null){
            locallength+=1;
        }

        else{
            if (logged == i){
                
                obj = JSON.parse(localStorage.getItem(idname));
                
                break;
            }  
        }    
    }

    email.value = obj.email;
    name.value = obj.name;
    var decrypted = CryptoJS.AES.decrypt(obj.password, key);
    var pass = decrypted.toString(CryptoJS.enc.Utf8);
    password.value = pass;

    emailicon.addEventListener("click", function(){
        modal.style.display= "block";

        editing.addEventListener("keyup", function(){
            if (editing.value.match(emailreg)){
                error.innerHTML = "valid";
            }

            else{
                error.innerHTML = "invalid";
            }
        });

        edited.addEventListener("click", function(){           
            email.value = editing.value;
            obj.email = editing.value;
            console.log(obj);
            modal.style.display = "none";            
        });
        
    });

    nameicon.addEventListener("click", function(){
        modal.style.display = "block";

        editing.addEventListener("keyup", function(){
            if (editing.value.match(namereg)){
                error.innerHTML = "valid";
            }

            else{
                error.innerHTML = "invalid";
            }
        });

        edited.addEventListener("click", function(){           
            name.value = editing.value;
            obj.name = editing.value;
            modal.style.display = "none";
        });
    });
    
    passwordicon.addEventListener("click", function(){
        confirm.style.display = "block";
        
        conpass.addEventListener("click",function(){
            if (confirmpass.value == pass){
                editpassword();
            }
        });
        
    });

    function editpassword(){
        confirm.style.display ="none";
        modal.style.display ="block";

        edited.addEventListener("click", function(){
            if (editing.value != ""){
                password.value = editing.value;
                var encrypted = CryptoJS.AES.encrypt(password.value, key);
                obj.password = encrypted.toString();
                modal.style.display = "none";
            }
        });        
    }

    submitbutton.addEventListener("click", function(){
        let idname = "data"+i;
        localStorage.setItem(idname, JSON.stringify(obj));
        document.location ="/index2.html";
    });
    

    
    
    
}


