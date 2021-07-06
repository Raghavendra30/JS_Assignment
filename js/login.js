let temp = 0;

(function() {
    let email = sessionStorage.getItem('email');

    if (email != null)
        location.assign('../html/todo.html');
})();

function login(event) {
    temp = 0;

    document.getElementById('email').style.border = 'none';
    document.getElementById('password').style.border = 'none';

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    temp = isUnfilled(email, password);

    if (temp == 0)
        emailValidation(email, password)
}

function isUnfilled(email, password) {
    if (email === '') {
        document.getElementById('email').placeholder = 'Please enter an Email';
        document.getElementById('email').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    if (password === '') {
        document.getElementById('password').placeholder = 'Please enter the password';
        document.getElementById('password').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    return temp;
}

function emailValidation(email, password) {
    var userDataArray = JSON.parse(localStorage.getItem('users')) || [];
    var ivalue = -1;

    for (i = 0; i < userDataArray.length; i++) {
        if (email === userDataArray[i].email) {
            ivalue = i;
            break;
        }
    }

    if (ivalue == -1) {
        document.getElementById('errorMsgText').innerHTML = '* incorrect email or password';

    } else if (password === userDataArray[ivalue].password) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('ivalue', i);
        location.assign('../html/profile.html');
    } else {
        document.getElementById('errorMsgText').innerHTML = 'Wrong password! Try again';
    }
}

function registerSuccess() {
    if (sessionStorage.getItem('registered') == 1)
        document.getElementById('displayregisterSuccess').style.display = 'inline-block';

    setTimeout(() => {
        sessionStorage.setItem('registered', 0);
        document.getElementById('displayregisterSuccess').style.display = 'none';
    }, 2500);
}