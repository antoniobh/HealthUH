const name = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const birthday = document.getElementById('birthday');
const blood = document.getElementById('blood');
const eFp = document.getElementById('fritzpatrick');
const gener = document.getElementsByName('gener');
const wheelchair = document.getElementsByName('needWC');

const height = document.getElementById('height');
const weight = document.getElementById('weight');
const CDC = document.getElementById('CDC');
const IMC = document.getElementById('IMC');
const MCM = document.getElementById('MCM');
const PGC = document.getElementById('PGC');
const profilePicture = document.getElementById('profilePicture');

const pictureform = document.getElementById('profilePicture');
const HealthUHApp = new HealthUH();

// ===================================================================================

var AU = HealthUHApp.getActiveUser();

HealthUHApp.UserLoggedGuard();






function updatePicture(){
  HealthUHApp.syncStates()
  .then(()=>{
      document.getElementById("pictureSelectedView").src = HealthUHApp.AppUsers.Users[HealthUHApp.getActiveUser()].Profile.data.picture
    }
  )
}

onloadend();
function onloadend(){
  HealthUHApp.syncStates()
  .then(() => {
      name.value = HealthUHApp.AppUsers.Users[AU].Profile.data.nombre;
      lastName.value = HealthUHApp.AppUsers.Users[AU].Profile.data.apellido;
      birthday.value = HealthUHApp.AppUsers.Users[AU].Profile.data.fechaNacimiento;
      blood.value = HealthUHApp.AppUsers.Users[AU].Profile.data.GrupoSanguineo;
      eFp.value = HealthUHApp.AppUsers.Users[AU].Profile.data.EscalaFitzPatric;

      gener[0].checked = HealthUHApp.AppUsers.Users[AU].Profile.data.sexo;
      gener[1].checked = !HealthUHApp.AppUsers.Users[AU].Profile.data.sexo;

      if(HealthUHApp.AppUsers.Users[AU].Profile.data.picture !== '../assets/images/user.svg'){
        document.getElementById("pictureSelectedView").src = localStorage.getItem(HealthUHApp.AppUsers.Users[AU].Profile.data.picture);
      }

      wheelchair[0].checked = HealthUHApp.AppUsers.Users[AU].Profile.data.sillaDeRuedas;
      wheelchair[1].checked = !HealthUHApp.AppUsers.Users[AU].Profile.data.sillaDeRuedas;

      height.value = HealthUHApp.AppUsers.Users[AU].Profile.Medidas.Estatura;
      weight.value = HealthUHApp.AppUsers.Users[AU].Profile.Medidas.Peso;
      IMC.value = HealthUHApp.AppUsers.Users[AU].Profile.Medidas.IMC
      MCM.value = HealthUHApp.AppUsers.Users[AU].Profile.Medidas.MasaCorporalMagra;
      CDC.value = HealthUHApp.AppUsers.Users[AU].Profile.Medidas.circunferenciaDeLaCintura;
      PGC.value = HealthUHApp.AppUsers.Users[AU].Profile.Medidas.PorcentajeGrasaCoporal;
  })
}


profilePicture.addEventListener('change',function(e){
  let fileReader = new FileReader();
    fileReader.readAsDataURL(pictureform.files[0]);
    fileReader.onloadend = function () {
      document.getElementById("pictureSelectedView").src = fileReader.result;

      HealthUHApp.syncStates()
      .then(function(){
        localStorage.setItem('PictureUser'+AU,fileReader.result)
        HealthUHApp.AppUsers.Users[AU].Profile.data.picture = 'PictureUser'+AU;
        HealthUHApp.updateAppUsers();
      })
    }
})


save.addEventListener('click', function(){
  HealthUHApp.syncStates()
  .then(() => {
      document.getElementById('spinner-center').style.display = "block";
      document.getElementById('valueSpinner').style.display = "none";

      HealthUHApp.AppUsers.Users[AU].Profile.data.nombre = name.value;
      HealthUHApp.AppUsers.Users[AU].Profile.data.apellido = lastName.value;
      HealthUHApp.AppUsers.Users[AU].Profile.data.fechaNacimiento = birthday.value;
      HealthUHApp.AppUsers.Users[AU].Profile.data.GrupoSanguineo = blood.value;
      HealthUHApp.AppUsers.Users[AU].Profile.data.EscalaFitzPatric = eFp.value;

      HealthUHApp.AppUsers.Users[AU].Profile.data.sexo = gener[0].checked ;
      HealthUHApp.AppUsers.Users[AU].Profile.data.sexo = !gener[1].checked;

      HealthUHApp.AppUsers.Users[AU].Profile.data.sillaDeRuedas = wheelchair[0].checked;
      HealthUHApp.AppUsers.Users[AU].Profile.data.sillaDeRuedas = !wheelchair[1].checked;

      HealthUHApp.AppUsers.Users[AU].Profile.Medidas.Estatura = height.value;
      HealthUHApp.AppUsers.Users[AU].Profile.Medidas.Peso = weight.value;

      HealthUHApp.AppUsers.Users[AU].Profile.Medidas.IMC = (weight.value / ((height.value/100)*(height.value/100))).toFixed(2);
      HealthUHApp.AppUsers.Users[AU].Profile.Medidas.MasaCorporalMagra = getMCM(weight.value, height.value, gener[0].checked);
      HealthUHApp.AppUsers.Users[AU].Profile.Medidas.PorcentajeGrasaCoporal = getPGC(gener[0].checked, birthday.value);
      HealthUHApp.updateAppUsers();
      onloadend();
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



function getMCM(weight, height, ismen){
  if(ismen){
    return (1.10*weight-128*(weight*weight)/(height*height)).toFixed(2)
  }else{
    return (1.07*weight-148*(weight*weight)/(height*height)).toFixed(2)
  }
}



function getPGC(ismen, age){

  let yearBorn = new Date(age).getFullYear();
  let currentYear = new Date().getFullYear();

  age = currentYear - yearBorn;

  if(ismen){
    return ((1.2*HealthUHApp.AppUsers.Users[AU].Profile.Medidas.IMC)+(0.23*age)-(10.8)-5.4).toFixed(2)
  }else{
    return ((1.2*HealthUHApp.AppUsers.Users[AU].Profile.Medidas.IMC)+(0.23*age)-5.4).toFixed(2)
  }

}
