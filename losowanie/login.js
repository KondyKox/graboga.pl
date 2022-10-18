let login = document.getElementsByName('login').value;
let password = document.getElementsByName('password').value;

/***********************************************
    nazwa funkcji: loginUser
    co zwraca: nic
    autor: ten totalny giga chad
***********************************************/

function loginUser() {
    if(login != null || password != null) {
        alert('Siema ' + login + ', właśnie się zalogowałeś! :)');
        alert('Zostałeś wylogowany. (:');
    }
}


/***********************************************
    nazwa funkcji: createUser
    co zwraca: nic
    autor: taki tam przystojny programista
***********************************************/

function createUser() {
    if(login != null || password != null) {
        alert(login + ', zostałeś utworzony!');
        alert('Po co?');
    }
}