function load(){
    let locallength = localStorage.length;
    const table = document.getElementById("table");
    const tbody = document.getElementById("tbody");
    let idname;
    let email = document.getElementById("email");
    let name = document.getElementById("name");
    let thisform = document.getElementById("thisform");
    let submitbutton = document.getElementById("submitbutton");
    
    for (i=0; i<(locallength-1); i++){
        let stringname = "data"+i;
        let value = JSON.parse(localStorage.getItem(stringname));

        if(value == null){
            locallength= locallength+1;
        }
        
        else{
            let td1= document.createElement("td");
            let td2= document.createElement("td");
            let editbutton = document.createElement("button");
            editbutton.className= "editbutton";
            let deletebutton = document.createElement("button");
            deletebutton.className="deletebutton";

            let tr = document.createElement("tr");
            let node1 = document.createTextNode(value.email);
            let node2 = document.createTextNode(value.name);
            let buttonname = document.createTextNode("Edit");
            let buttonname2 = document.createTextNode("Delete");

            editbutton.appendChild(buttonname);
            deletebutton.appendChild(buttonname2);
            
            td1.appendChild(node1);
            td2.appendChild(node2);
        
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(editbutton);
            tr.appendChild(deletebutton);
        
            tbody.appendChild(tr);   
        }    
    }

    let editbtn = document.getElementsByClassName("editbutton");
    let deletebtn = document.getElementsByClassName("deletebutton");

    for (i=0; i<(locallength-1);i++){
        editbtn[i].addEventListener("click",function(){
            let toemail = this.parentNode.childNodes[0].innerHTML;
            let toname = this.parentNode.childNodes[1].innerHTML;            
            email.value = toemail;
            name.value = toname;                      
            thisform.style.display = "block";
            submitbutton.addEventListener("click", function(){        
                for(i= 0; i<(locallength-1); i++){
                    let idname = "data"+i;
                    let obj = JSON.parse(localStorage.getItem(idname));        
                    if (toemail == obj.email){
                        obj.email = email.value;
                        obj.name = name.value;
                        localStorage.setItem(idname,JSON.stringify(obj));
                        thisform.style.display="none";
                        document.location ="/edituser.html";                        
                    }        
                }        
            });            
        });

        deletebtn[i].addEventListener("click",function(){
            this.parentNode.style.display = "none";
            for(i= 0; i<(locallength-1); i++){
                let idname = "data"+i;
                let obj = JSON.parse(localStorage.getItem(idname));        
                if ((this.parentNode.childNodes[0].innerHTML) == obj.email){
                    localStorage.removeItem(idname);                       
                }        
            }     
        });

    }

    
}