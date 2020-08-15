class HealthUH{

  constructor(){
    this.AppUsers = {'Users':[]};
    this.isLogged = this.getUserStatus();
  }

 setDefaultUsers(){
    this.addUser(
      {
        'user':'user',
        'password':'password'
      }
    )
  }

  updateAppUsers(){
      localStorage.setItem('AppUsers', JSON.stringify(this.AppUsers));
  }

  setActiveUser(data){
    localStorage.setItem('ActiveUser',JSON.stringify(data))
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

  destroySession(){
    this.setLogInStatus(false);
    localStorage.removeItem('ActiveUser')
    this.UserLoggedGuard();
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
                    'sillaDeRuedas':''
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
                  }
                }
    }
    );
    this.updateAppUsers();
  }

  login(user, password){
    for (var i = 0; i < this.AppUsers.Users.length; i++) {
        if(this.AppUsers.Users[i].user.user == user && this.AppUsers.Users[i].user.password == password){
          this.setActiveUser({active:this.AppUsers.Users[i]});
          this.setLogInStatus(true);
          return true;
        }
    }
    return false;
  }


  UserLoggedGuard(){
    if(!this.isLogged){
      window.location="index.html";
    }
  }
}
