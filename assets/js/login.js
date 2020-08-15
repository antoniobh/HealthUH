const HealthUHApp = new HealthUH();

HealthUHApp.setDefaultUsers();

var username = document.getElementById('userInput');
var password = document.getElementById('passwordInput');

var btnLogin = document.getElementById('btnLogin');


btnLogin.addEventListener('click',function(){
  if(HealthUHApp.login(username.value,password.value)){
          window.location="profile.html";
  }
})
