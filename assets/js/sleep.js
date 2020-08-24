const sleep = document.getElementById('sleep');
const save = document.getElementById('save');
const HealthUHApp = new HealthUH();

// ===================================================================================

var AU = HealthUHApp.getActiveUser();

HealthUHApp.UserLoggedGuard();

onloadend();
function onloadend(){
  HealthUHApp.syncStates()
  .then(() => {
      sleep.value = HealthUHApp.AppUsers.Users[AU].Profile.Sueño.horas;
  })
}


save.addEventListener('click', function(){
  HealthUHApp.syncStates()
  .then(() => {
    document.getElementById('spinner-center').style.display = "block";
    document.getElementById('valueSpinner').style.display = "none";
      HealthUHApp.AppUsers.Users[AU].Profile.Sueño.horas = sleep.value;
      HealthUHApp.updateAppUsers();
      setTimeout(()=>{
        document.getElementById('spinner-center').style.display = "none";
        document.getElementById('valueSpinner').style.display = "block";
        document.getElementById('valueSpinner').innerHTML = "Guardado";
        setTimeout(()=>{
          document.getElementById('valueSpinner').innerHTML = "Actualizar informacion";
        },2000)
      },2000)
  })
})
