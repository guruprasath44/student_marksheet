function myShow() {
    var x = document.getElementById("password");
    if ((x.type === "password")) {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}
function validation(){
    var form = document.getElementById("form");
    var email= document.getElementById("email").value;
    var text= document.getElementById("text2");
    var pattern= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email.match(pattern)){ 
      text.innerHTML= "Your email is Valid";
      text.style.color="#008000"; 
    }
    else{
     text.innerHTML= "Enter a Valid email ";
     text.style.color="#ff0000";
    }
    if(email== ""){    
      text.innerHTML= "";
      text.style.color="#00ff00";
    }
 }
   function done(){
     text2.innerHTML= "";
   }
   function namedone(){
     text1.innerHTML= "";
   }
      function namecheck(){
     var form =document.getElementById("form");
     var name = document.getElementById("name").value;
     var nameregex= /^[a-zA-Z.]{1,20}$/;
     var text= document.getElementById("text1");
     if(name.match(nameregex)){
       text.innerHTML= "Perfect!";
       text.style.color="#008000";
       return true;
     }
     else{
       text.innerHTML= "Username should contain Only Alphabets ";
       text.style.color="#ff0000";
       return false;
     }
 }
 function checkPassword(form) {
 pwd1 = form.password.value;
 pwd2 = form.password1.value;
 if(pwd1.length >=8 && pwd1.length<=12   ){
     if(pwd1 != pwd2 ){
   alert("\nPassword did not matched !! Please try again...");
   return false;
   }else{
       return true;
   }
         
 }
 else{
       alert("Password should have only 8-12 characters");
       return false;
 }
 }
