function validtae() {
    let email = sessionStorage.getItem('email');

    if (email != null)
        location.assign('../html/todo.html');
};

function register(event) {
    document.getElementById('fname').style.border = 'none';
    document.getElementById('lname').style.border = 'none';
    document.getElementById('address').style.border = 'none';
    document.getElementById('password').style.border = 'none';
    document.getElementById('email').style.border = 'none';
    document.getElementById('genderEmpty').style.display = 'none';

    let temp = 0;
    let email = document.getElementById('email').value;
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null)
        gender = document.querySelector('input[name="gender"]:checked').value;


    let image = sessionStorage.getItem('tempImageData');



    if (temp == 0)
        temp = emailExists(email, temp);

    if (temp == 0)
        temp = isUnfilled(image, email, fname, lname, address, password, gender, temp);

    if (temp == 0)
        temp = userEmailValidation(email, temp);

    if (temp == 0)
        temp = userDataValidation(fname, lname, password, temp);

    if (temp === 0)
        storeUserData(image, email, fname, lname, address, password, gender);
}

function changeProfilePic() {
    var Image = document.getElementById("image").files[0];

    var imageReader = new FileReader();
    imageReader.readAsDataURL(Image);

    imageReader.onload = function() {
        var imgdata = imageReader.result;
        sessionStorage.setItem("tempImageData", imgdata);
        document.getElementById("previewProfilePic").src = sessionStorage.tempImageData;
    };

    imageReader.onerror = function(error) {};

}


function emailExists(email, temp) {
    var userDataArray = JSON.parse(localStorage.getItem('users')) || [];

    for (i = 0; i < userDataArray.length; i++) {
        if (email === userDataArray[i].email) {
            document.getElementById('errorMsgText').innerHTML = 'Email already registered!';
            temp++;
            break;
        }
    }

    return temp;
}


function isUnfilled(image, email, fname, lname, address, password, gender, temp) {
    //temp = 0;

    if (email === '') {
        document.getElementById('email').placeholder = 'Please enter Email Id';
        document.getElementById('email').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    if (fname === '') {
        document.getElementById('fname').placeholder = 'Please enter your first name';
        document.getElementById('fname').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    if (lname === '') {
        document.getElementById('lname').placeholder = 'Please enter your last name';
        document.getElementById('lname').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    if (address === '') {
        document.getElementById('address').placeholder = 'Please enter your address';
        document.getElementById('address').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    if (password === '') {
        document.getElementById('password').placeholder = 'Please enter your password';
        document.getElementById('password').style.border = 'solid 2px rgba(244, 81, 30)';

        temp++;
    }

    if (gender == null) {
        document.getElementById('genderEmpty').style.display = 'inline-block';
        temp++;
    }

    return temp;
}

function userEmailValidation(email, temp) {
    let emailRegularExpression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailRegularExpression.test(email) == false) {
        document.getElementById('errorMsgText').innerHTML = '* invalid email id';
        temp++;
    }

    return temp;
}

function userDataValidation(fname, lname, password, temp) {
    let passwordRegularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let nameRegularExpression = /^[A-Za-z]+$/;

    if (passwordRegularExpression.test(password) == false) {
        document.getElementById('errorMsgText').innerHTML = 'Please enter a password of length between 8 and 15 characters with atleast one Uppercase, one Lowercase character, one Digit and atleast one special character!';
        temp++;
    }

    if (nameRegularExpression.test(fname) === false) {
        document.getElementById('errorMsgText').innerHTML = 'Please enter a valid first name';
        temp++;
    }

    if (nameRegularExpression.test(lname) == false) {
        document.getElementById('errorMsgText').innerHTML = 'Please enter a valid last name';
        temp++;
    }

    return temp;
}


function storeUserData(image, email, fname, lname, address, password, gender) {
    let userDataObject = {
        /* id: new Date().getTime(), */
        email,
        fname,
        lname,
        address,
        password,
        gender,
        image
    }

    let userDataArray = JSON.parse(localStorage.getItem('users')) || [];
    userDataArray.push(userDataObject);
    localStorage.setItem('users', JSON.stringify(userDataArray));

    sessionStorage.setItem('registered', 1);
    location.assign('../html/login.html');
}

function updateUserData() {
    var ivalue = sessionStorage.getItem('ivalue');
    var temp = 0;

    let email = document.getElementById('email').value;
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let image = sessionStorage.getItem('tempImageData');
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null)
        gender = document.querySelector('input[name="gender"]:checked').value;

    if (temp == 0)
        temp = isUnfilled(image, email, fname, lname, address, password, gender, temp);

    if (temp == 0)
        temp = userDataValidation(fname, lname, password, temp);

    if (temp == 0) {
        let userDataObject = {
            image,
            email,
            fname,
            lname,
            address,
            password,
            gender
        }
        let userDataArray = JSON.parse(localStorage.getItem('users')) || [];
        userDataArray[ivalue] = userDataObject;
        localStorage.setItem('users', JSON.stringify(userDataArray));

        document.getElementById('fname').disabled = true;
        document.getElementById('lname').disabled = true;
        document.getElementById('male').disabled = true;
        document.getElementById('female').disabled = true;
        document.getElementById('address').disabled = true;
        document.getElementById('password').disabled = true;
        document.getElementById('image').disabled = true;
        document.getElementById('profilePicture').style.display = 'none';
        document.getElementById('image').style.display = 'none';

        document.getElementById('save').style.display = 'none';
    }
}