const name = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const birthday = document.getElementById('birthday');
const blood = document.getElementById('blood');
const eFp = document.getElementById('fritzpatrick');
const gener = document.getElementById('profilePicture');
const wheelchair = document.getElementById('profilePicture');

const height = document.getElementById('profilePicture');
const weight = document.getElementById('profilePicture');
const pictureform = document.getElementById('profilePicture');
const HealthUHApp = new HealthUH();

// ===================================================================================

var AU = HealthUHApp.getActiveUser();

HealthUHApp.UserLoggedGuard();

function updatePicture(){
  HealthUHApp.syncStates()
  .then(
    document.getElementById("pictureSelectedView").src = HealthUHApp.AppUsers.Users[HealthUHApp.getActiveUser()].Profile.data.picture
  )
}

onloadend();
function onloadend(){
  HealthUHApp.syncStates()
  .then(
    document.getElementById("pictureSelectedView").src = HealthUHApp.AppUsers.Users[HealthUHApp.getActiveUser()].Profile.data.picture
  )
}


function showPreview(){
  let fileReader = new FileReader();
    fileReader.readAsDataURL(pictureform.files[0]);
    fileReader.onloadend = function () {
      document.getElementById("pictureSelectedView").src = fileReader.result;
      // HealthUHApp.syncStates()
      // console.log(fileReader.fileName)
      // HealthUHApp.AppUsers.Users[AU].Profile.data.picture = fileReader.name;
      // HealthUHApp.updateAppUsers()
    }
}
