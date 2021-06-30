function viewProfile() {
    var email = sessionStorage.getItem('email');
    var ivalue = sessionStorage.getItem('ivalue');

    (function() {
        if (email == null)
            location.assign('login.html');
    })();

    if ((JSON.parse(localStorage.getItem('users')))[ivalue].email === email) {
        (document.getElementById('email')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].email;
        (document.getElementById('fname')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].fname;
        (document.getElementById('lname')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].lname;
        (document.getElementById('address')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].address;
        (document.getElementById('password')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].password;
        let image = document.getElementById("previewProfilePic").src = (JSON.parse(localStorage.getItem('users')))[ivalue].image;

        if (image == null)
            document.getElementById("previewProfilePic").src = '../images/dp.jpg';

        if ((JSON.parse(localStorage.getItem('users')))[ivalue].gender == 'male')
            (document.getElementById('male')).checked = true;

        else if ((JSON.parse(localStorage.getItem('users')))[ivalue].gender == 'female')
            (document.getElementById('female')).checked = true;
    }
}

function editUserData() {
    document.getElementById('fname').disabled = false;
    document.getElementById('lname').disabled = false;
    document.getElementById('male').disabled = false;
    document.getElementById('female').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('image').disabled = false;
    document.getElementById('profilePicture').style.display = 'inline-block';
    document.getElementById('image').style.display = 'inline-block';

    document.getElementById('save').style.display = 'inline';
}

function logOut() {

    location.assign('login.html');
    sessionStorage.clear();
}