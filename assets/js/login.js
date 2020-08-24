
var username = document.getElementById('userInput');
var password = document.getElementById('passwordInput');
var btnLogin = document.getElementById('btnLogin');
var btnregister = document.getElementById('btnregister');
var showLogin = document.getElementById('showLogin');
var showRegister = document.getElementById('showRegister');
var labelError = document.getElementById('labelError');
var loginClass = document.getElementsByClassName('login');
var registerClass = document.getElementsByClassName('register');

const HealthUHApp = new HealthUH();


HealthUHApp.UserLoginGuard();

if(!HealthUHApp.existsUserList()){
  HealthUHApp.setDefaultUsers();
}




btnLogin.addEventListener('click',function(){
  HealthUHApp.syncStates()
  .then(()=>{
    if(HealthUHApp.login(username.value,password.value)){
            window.location="../../session/index.html";
    }else{
      labelError.innerHTML = 'Usuario o contraseña incorrectos';
      labelError.style.display = "block"
    }
  })
})


btnregister.addEventListener('click',function(){
  HealthUHApp.syncStates()
  .then(()=>{
    if(HealthUHApp.checkUser(username.value)){
      labelError.innerHTML = 'Ya existe';
      labelError.style.display = "block"
    }else{
      HealthUHApp.addUser(username.value, password.value);
      HealthUHApp.login(username.value,password.value)
      window.location="../../session/index.html";
    }
  })
})



showLogin.addEventListener('click',function(){
  loginClass[0].style.display = "block"
  loginClass[1].style.display = "block"
  registerClass[0].style.display = "none"
  registerClass[1].style.display = "none"

})


showRegister.addEventListener('click',function(){
  loginClass[0].style.display = "none"
  loginClass[1].style.display = "none"
  registerClass[0].style.display = "block"
  registerClass[1].style.display = "block"

})
