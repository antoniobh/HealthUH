const AF = document.getElementById('AF');
const AG = document.getElementById('AG');
const AZ = document.getElementById('AZ');
const BT = document.getElementById('BT');
const CA = document.getElementById('CA');
const CAL = document.getElementById('CAL');
const CH = document.getElementById('CH');
const CL = document.getElementById('CL');
const CO = document.getElementById('CO');
const CED = document.getElementById('CED');
const CR = document.getElementById('CR');

const save = document.getElementById('save');
const HealthUHApp = new HealthUH();

// ===================================================================================

var AU = HealthUHApp.getActiveUser();

HealthUHApp.UserLoggedGuard();

onloadend();
function onloadend(){
  HealthUHApp.syncStates()
  .then(() => {
      AF.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.AcidoFolico;
      AG.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Agua;
      AZ.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.AzucarEnDieta;
      BT.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Biotina;
      CA.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cafeina;
      CAL.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Calcio;
      CH.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Carbohidratos;
      CL.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cloro;
      CO.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cobre;
      CED.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.ColesterolEnDieta;
      CR.value = HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cromo;
  })
}


save.addEventListener('click', function(){
  HealthUHApp.syncStates()
  .then(() => {
      document.getElementById('spinner-center').style.display = "block";
      document.getElementById('valueSpinner').style.display = "none";
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.AcidoFolico = AF.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Agua = AG.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.AzucarEnDieta = AZ.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Biotina = BT.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cafeina = CA.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Calcio = CAL.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Carbohidratos = CH.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cloro = CL.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cobre = CO.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.ColesterolEnDieta = CED.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Nutricion.Cromo = CR.value;
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
