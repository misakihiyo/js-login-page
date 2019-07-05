function load(){
    let local = localStorage.getItem("currentlylogged");

    if (local != 99999){
        document.location ="index.html";
        console.log(local);
    }

    
}