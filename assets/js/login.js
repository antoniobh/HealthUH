
var username = document.getElementById('userInput');
var password = document.getElementById('passwordInput');
var btnLogin = document.getElementById('btnLogin');


const HealthUHApp = new HealthUH();


HealthUHApp.UserLoginGuard();

if(!HealthUHApp.existsUserList()){
  HealthUHApp.setDefaultUsers();
}




btnLogin.addEventListener('click',function(){
  HealthUHApp.syncStates()
  if(HealthUHApp.login(username.value,password.value)){
          window.location="../../session/index.html";
  }
})
