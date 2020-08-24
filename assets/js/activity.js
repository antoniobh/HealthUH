const walk = document.getElementById('walk');
const steeps = document.getElementById('steeps');
const floor = document.getElementById('floor');
const save = document.getElementById('save');
const HealthUHApp = new HealthUH();

// ===================================================================================

var AU = HealthUHApp.getActiveUser();

HealthUHApp.UserLoggedGuard();

onloadend();
function onloadend(){
  HealthUHApp.syncStates()
  .then(() => {
      walk.value = HealthUHApp.AppUsers.Users[AU].Profile.Actividad.DistanciaCaminata;
      steeps.value = HealthUHApp.AppUsers.Users[AU].Profile.Actividad.Pasos;
      floor.value = HealthUHApp.AppUsers.Users[AU].Profile.Actividad.Pisossubidos;
  })
}


save.addEventListener('click', function(){
  HealthUHApp.syncStates()
  .then(() => {
    document.getElementById('spinner-center').style.display = "block";
    document.getElementById('valueSpinner').style.display = "none";
      HealthUHApp.AppUsers.Users[AU].Profile.Actividad.DistanciaCaminata = walk.value ;
      HealthUHApp.AppUsers.Users[AU].Profile.Actividad.Pasos = steeps.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Actividad.Pisossubidos = floor.value ;
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
