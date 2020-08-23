class HealthUH{

  constructor(){
    this.AppUsers = {'Users':[]};
    this.isLogged = this.getUserStatus();
  }

 setDefaultUsers(){
    this.addUser('user','password')
  }

  updateAppUsers(){
      localStorage.setItem('AppUsers', JSON.stringify(this.AppUsers));
  }

  setActiveUser(data){
    localStorage.setItem('ActiveUser',JSON.stringify(data))
  }

  getActiveUser(){
    return localStorage.getItem("ActiveUser")
  }

  setLogInStatus(status){
    this.isLogged = status;
  }

  getUserStatus(){
    if(localStorage.getItem("ActiveUser") === null){
      return false;
    }else{
      return true;
    }
  }

  existsUserList(){
    if(localStorage.getItem("AppUsers") === null){
      return false;
    }else{
      return true;
    }
  }

  destroySession(){
    this.setLogInStatus(false);
    localStorage.removeItem('ActiveUser')
    this.UserLoggedGuard();
  }

  getParsedJSON(){
    let k = JSON.parse(localStorage.getItem('AppUsers'))
    return k;
  }

  syncStates(){
    let promise = new Promise((resolve, reject) => {
      this.AppUsers = JSON.parse(localStorage.getItem('AppUsers'))
    });
    return promise;
  }




  addUser(user, password){
    this.AppUsers.Users.push(
      {
        'user':user,
        'password':password,
        Profile:{
                  data:{
                    'nombre':'',
                    'apellido':'',
                    'sexo':'',
                    'GrupoSanguineo':'',
                    'EscalaFitzPatric':'',
                    'sillaDeRuedas':'',
                    'picture':'../assets/images/user.svg'
                  },
                  Medidas:{
                    'Estatura':'',
                    'Peso':'',
                    'circunferenciaDeLaCintura':'',
                    'IMC':'',
                    'MasaCorporalMagra':'',
                    'PorcentajeMasaCoporal':''
                  },
                  Actividad:{
                    'DistanciaCaminata':'',
                    'Pasos':'',
                    'Pisossubidos':''
                  },
                  Nutricion:{
                    'AcidoFolico':'',
                    'Agua':'',
                    'AzucarEnDieta':'',
                    'Biotona':'',
                    'Cafeina':'',
                    'Calcio':'',
                    'Carbohidratos':'',
                    'Cloro':'',
                    'Cobre':'',
                    'ColesterolEnDieta':'',
                    'Cromo':''
                  },
                  Sueño:{
                    'horas':''
                  }
                }
    }
    );
    this.updateAppUsers();
  }

  login(user, password){
    for (var i = 0; i < this.AppUsers.Users.length; i++) {
        if(this.AppUsers.Users[i].user == user && this.AppUsers.Users[i].password == password){
          this.setActiveUser(i);
          this.setLogInStatus(true);
          return true;
        }
    }
    return false;
  }

  UserLoggedGuard(){
    if(!this.isLogged){
      window.location="../../index.html";
    }
  }

  UserLoginGuard(){
    if(document.getElementById('signOut')=== null && HealthUHApp.getUserStatus()){
      window.location="../../session/index.html";
    }
  }

}



if(document.getElementById('signOut')!== null){
  document.getElementById('signOut').addEventListener('click',function(){
    let HealthUHApp = new HealthUH();
    HealthUHApp.destroySession();
  })
}
