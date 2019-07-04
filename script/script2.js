function loading(){
    let username = document.getElementById("username");
    let locallength = localStorage.length;
    var i;
    let idname;
    let loggedin= localStorage.getItem("currentlylogged");
    for (i = 0; i<(locallength-1); i++){
        idname = "data"+i;
        let objitem = localStorage.getItem(idname);
        let m = JSON.parse(objitem);

        if(m == null){
            locallength +=1;
        }        
        
        else{
            if (i == loggedin){
            console.log(loggedin);
            username.innerHTML = m.name;
        }
    }


    }
}