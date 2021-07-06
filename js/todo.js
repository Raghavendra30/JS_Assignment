var email = sessionStorage.getItem('email');

(function() {
    if (email == null)
        location.assign('../html/login.html');
})();

var userDataArray = JSON.parse(localStorage.getItem('todo')) || [];
var globalIValue;

function saveToDo() {
    var temp = 0;

    document.getElementById('errorMsgText').innerHTML = '';

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let reminderDate = document.getElementById('reminderDate').value;
    let toDoCategory = (document.getElementById('toDoCategory')).value;

    if (temp == 0)
        temp = isUnfilled(title, description, startDate, endDate, reminderDate, toDoCategory, temp);

    if (temp == 0)
        temp = dateValidation(startDate, endDate, reminderDate, temp);

    if (temp == 0)
        storeToDo(email, title, description, startDate, endDate, reminderDate, toDoCategory);
}

function isUnfilled(title, description, startDate, endDate, reminderDate, toDoCategory, temp) {
    if (title === '') {
        document.getElementById('errorMsgText').innerHTML = '*Please enter Title.';
        temp++;
    }

    if (description === '') {
        document.getElementById('errorMsgText').innerHTML = '*Please enter Description.';
        temp++;
    }

    if (startDate === '') {
        document.getElementById('errorMsgText').innerHTML = '*Please select Start Date.';
        temp++;
    }

    if (endDate === '') {
        document.getElementById('errorMsgText').innerHTML = '*Please select Due Date.';
        temp++;
    }

    if (reminderDate === '') {
        document.getElementById('errorMsgText').innerHTML = '*Please select reminder date.';
        temp++;
    }

    if (toDoCategory == null) {
        document.getElementById('errorMsgText').innerHTML = '*Please select Category.';
        temp++;
    }

    return temp;
}

function dateValidation(startDate, endDate, reminderDate, temp) {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if (startDate < today) {
        document.getElementById('errorMsgText').innerHTML = 'Start date cannot be from past.';
        temp++;
    }

    if (endDate < startDate) {
        document.getElementById('errorMsgText').innerHTML = 'Due date cannot be before the start date.';
        temp++;
    }

    if (reminderDate < startDate || reminderDate > endDate) {
        document.getElementById('errorMsgText').innerHTML = 'Reminder date should be between the start and due date!';
        temp++;
    }

    return temp;
}

function dateValidationForUpdatedToDo(startDate, endDate, reminderDate, temp) {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if (startDate < today) {
        if (startDate < userDataArray[globalIValue].startDate) {
            document.getElementById('errorMsgText').innerHTML = 'That start date ain\'t possible';
            temp++;
        }
    }

    if (endDate < startDate) {
        document.getElementById('errorMsgText').innerHTML = 'Are you a time traveler?';
        temp++;
    }

    if (reminderDate < startDate || reminderDate > endDate) {
        document.getElementById('errorMsgText').innerHTML = 'You sure that\'s the reminder you want? Because I\'m not';
        temp++;
    }

    return temp;
}

function storeToDo(email, title, description, startDate, endDate, reminderDate, toDoCategory) {
    let status = 'Pending';

    let userDataObject = {
        id: new Date().getTime(),
        email,
        title,
        description,
        startDate,
        endDate,
        reminderDate,
        toDoCategory,
        status
    }

    let userDataArray = JSON.parse(localStorage.getItem('todo')) || [];
    userDataArray.push(userDataObject);
    localStorage.setItem('todo', JSON.stringify(userDataArray));

    location.assign('../html/viewTodo.html');
}

function fetchUserEmail() {
    for (i = 0; i < userDataArray.length; i++) {
        if (email === userDataArray[i].email) {
            displayToDo(userDataArray, i);
        }
    }

}

function displayToDo(userDataArray, ivalue) {
    let displayToDoTItle = document.createElement("input");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoTItle);
    displayToDoTItle.value = userDataArray[ivalue].title;
    displayToDoTItle.id = 'displayToDoTItleid' + ivalue;
    document.getElementById('displayToDoTItleid' + ivalue).disabled = true;
    displayToDoTItle.style.height = '40px';
    displayToDoTItle.style.width ='90px'
    displayToDoTItle.style.fontFamily='times new roman';
    displayToDoTItle.style.color='black';

    let displayToDoDescription = document.createElement("input");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoDescription);
    displayToDoDescription.value = userDataArray[ivalue].description;
    displayToDoDescription.id = 'displayToDoDescriptionid' + ivalue;
    document.getElementById('displayToDoDescriptionid' + ivalue).disabled = true;
    displayToDoDescription.style.height = '40px';
    displayToDoDescription.style.width ='120px';
    displayToDoDescription.style.fontFamily='times new roman';
    displayToDoDescription.style.color='black';

    let displayToDoStartDate = document.createElement("input");
    displayToDoStartDate.setAttribute("type", "date");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoStartDate);
    displayToDoStartDate.value = userDataArray[ivalue].startDate;
    displayToDoStartDate.id = 'displayToDoStartDateid' + ivalue;
    document.getElementById('displayToDoStartDateid' + ivalue).disabled = true;
    displayToDoStartDate.style.height = '40px';
    displayToDoStartDate.style.width ='100px';
    displayToDoStartDate.style.fontFamily='times new roman';
    displayToDoStartDate.style.fontSize='10px';
    displayToDoStartDate.style.color='black';

    let displayToDoEndDate = document.createElement("input");
    displayToDoEndDate.setAttribute("type", "date");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoEndDate);
    displayToDoEndDate.value = userDataArray[ivalue].endDate;
    displayToDoEndDate.id = 'displayToDoEndDateid' + ivalue;
    document.getElementById('displayToDoEndDateid' + ivalue).disabled = true;
    displayToDoEndDate.style.height = '40px';
    displayToDoEndDate.style.width ='100px';
    displayToDoEndDate.style.fontFamily='times new roman';
    displayToDoEndDate.style.fontSize='10px';
    displayToDoEndDate.style.color='black';

    let displayToDoReminderDate = document.createElement("input");
    displayToDoReminderDate.setAttribute("type", "date");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoReminderDate);
    displayToDoReminderDate.value = userDataArray[ivalue].reminderDate;
    displayToDoReminderDate.id = 'displayToDoReminderDateid' + ivalue;
    document.getElementById('displayToDoReminderDateid' + ivalue).disabled = true;
    displayToDoReminderDate.style.height = '40px';
    displayToDoReminderDate.style.width ='100px';
    displayToDoReminderDate.style.fontFamily='times new roman';
    displayToDoReminderDate.style.color='black';
    displayToDoReminderDate.style.fontSize='10px';

    let displayToDoStatus = document.createElement("input");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoStatus);
    displayToDoStatus.value = userDataArray[ivalue].status;
    displayToDoStatus.id = 'displayToDoStatusid' + ivalue;
    document.getElementById('displayToDoStatusid' + ivalue).disabled = true;
    displayToDoStatus.style.height = '40px';
    displayToDoStatus.style.width = '90px';
    displayToDoStatus.style.fontFamily='times new roman';
    displayToDoStatus.style.color='black';

    let displayToDoCategory = document.createElement("select");
    var abcd = "<select><option value='work'>Work</option><option value='home'>Home</option><option value='personal'>Personal</option></select>";
    displayToDoCategory.innerHTML = abcd;
    (document.getElementById('displayToDoItems')).appendChild(displayToDoCategory);
    displayToDoCategory.value = userDataArray[ivalue].toDoCategory;
    displayToDoCategory.id = 'displayToDoCategoryid' + ivalue;
    document.getElementById('displayToDoCategoryid' + ivalue).disabled = true;
    displayToDoCategory.style.height = '40px';
    displayToDoCategory.style.width = '70px';
    displayToDoCategory.style.fontFamily='times new roman';
    displayToDoCategory.style.color='black';

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    (document.getElementById('displayToDoItems')).appendChild(checkBox);
    checkBox.value = userDataArray[ivalue].id;
    checkBox.id = 'checkBoxid' + ivalue;
    checkBox.style.marginLeft = '10px';
    checkBox.style.marginRight = '10px';

    let p = document.createElement("p");
    (document.getElementById('displayToDoItems')).appendChild(p);
}

function editToDo() {
    let temp = 0;

    for (i = 0; i < userDataArray.length; i++) {
        if ((document.getElementById('checkBoxid' + i)).checked == true) {
            globalIValue = ivalue = i;
            temp++;
            document.getElementById('errorMsgText').innerHTML = '';
        }
    }

    if (temp == 0) {
        document.getElementById('errorMsgText').innerHTML = '*Select something to edit!';
    }

    if (temp > 1) {
        document.getElementById('errorMsgText').innerHTML = '*Please edit one item at a time';
    }

    if (temp == 1) {
        enableToDoFields();

        document.getElementById('save').style.display = 'inline';
    }

}

function enableToDoFields() {
    document.getElementById('displayToDoTItleid' + ivalue).disabled = false;
    document.getElementById('displayToDoDescriptionid' + ivalue).disabled = false;
    document.getElementById('displayToDoStartDateid' + ivalue).disabled = false;
    document.getElementById('displayToDoEndDateid' + ivalue).disabled = false;
    document.getElementById('displayToDoReminderDateid' + ivalue).disabled = false;
    document.getElementById('displayToDoStatusid' + ivalue).disabled = false;
    document.getElementById('displayToDoCategoryid' + ivalue).disabled = false;
}

function updateToDo() {
    var temp = 0;

    let title = document.getElementById('displayToDoTItleid' + globalIValue).value;
    let description = document.getElementById('displayToDoDescriptionid' + globalIValue).value;
    let startDate = document.getElementById('displayToDoStartDateid' + globalIValue).value;
    let endDate = document.getElementById('displayToDoEndDateid' + globalIValue).value;
    let reminderDate = document.getElementById('displayToDoReminderDateid' + globalIValue).value;
    let toDoCategory = document.getElementById('displayToDoStatusid' + globalIValue).value;

    if (temp == 0)
        temp = isUnfilled(title, description, startDate, endDate, reminderDate, toDoCategory, temp);

    if (temp == 0)
        temp = dateValidationForUpdatedToDo(startDate, endDate, reminderDate, temp);

    if (temp == 0) {
        let userDataObject = {
            id: userDataArray[globalIValue].id,
            email: userDataArray[globalIValue].email,
            title,
            description,
            startDate,
            endDate,
            reminderDate,
            toDoCategory,
            status: userDataArray[globalIValue].status
        }

        userDataArray[globalIValue] = userDataObject;
        localStorage.setItem('todo', JSON.stringify(userDataArray));

        disableToDoFields();

        document.getElementById('save').style.display = 'none';
        (document.getElementById('checkBoxid' + globalIValue)).checkBox = false;
    }
}

function disableToDoFields() {
    document.getElementById('displayToDoTItleid' + ivalue).disabled = true;
    document.getElementById('displayToDoDescriptionid' + ivalue).disabled = true;
    document.getElementById('displayToDoStartDateid' + ivalue).disabled = true;
    document.getElementById('displayToDoEndDateid' + ivalue).disabled = true;
    document.getElementById('displayToDoReminderDateid' + ivalue).disabled = true;
    document.getElementById('displayToDoStatusid' + ivalue).disabled = true;
    document.getElementById('displayToDoCategoryid' + ivalue).disabled = true;
}

function markAsDone() {
    let temp = 0;

    for (i = 0; i < userDataArray.length; i++) {
        if ((document.getElementById('checkBoxid' + i)).checked == true) {
            document.getElementById('errorMsgText').innerHTML = '';
            userDataArray[i].status = 'Done';
            localStorage.setItem('todo', JSON.stringify(userDataArray));
            temp++;
            location.assign('../html/viewTodo.html');
        }
    }

    if (temp == 0) {
        document.getElementById('errorMsgText').innerHTML = 'Select something to mark as done!';
    }
}

function deleteToDo() {
    let temp = 0;

    for (i = 0; i < userDataArray.length; i++) {
        if ((document.getElementById('checkBoxid' + i)).checked == true) {
            userDataArray.splice(i, 1);
            localStorage.setItem('todo', JSON.stringify(userDataArray));
            temp++;
            document.getElementById('errorMsgText').innerHTML = '';
            location.assign('../html/viewTodo.html');
        }
    }

    if (temp == 0) {
        document.getElementById('errorMsgText').innerHTML = 'Select something to delete!';
    }
}

function hidingEditDoneDelete() {
    document.getElementById('edit').style.display = 'none';
    document.getElementById('done').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
}

function hidingDateFilterButtons() {
    document.getElementById('startDateForFilter').style.display = 'none';
    document.getElementById('dueDateForFilter').style.display = 'none';
    document.getElementById('searchForDateFilter').style.display = 'none';
}

function showingDateFilterButtons() {
    document.getElementById('startDateForFilter').style.display = 'inline';
    document.getElementById('dueDateForFilter').style.display = 'inline';
    document.getElementById('searchForDateFilter').style.display = 'inline';
}

function applyFilter() {
    let filter = document.getElementById('filters').value;
    hidingEditDoneDelete();

    if (filter == 'doneFilter') {
        hidingDateFilterButtons();

        temp = 0;

        var a = document.getElementById("displayToDoItems");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < userDataArray.length; i++) {
            if (email === userDataArray[i].email) {
                if (userDataArray[i].status == 'Done') {
                    displayToDo(userDataArray, i);
                    temp++;
                }
            }
        }

        if (temp == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("displayToDoItems");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }

    if (filter == 'pendingFilter') {
        hidingDateFilterButtons();

        temp = 0;

        var a = document.getElementById("displayToDoItems");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < userDataArray.length; i++) {
            if (email === userDataArray[i].email) {
                if (userDataArray[i].status == 'Pending') {
                    displayToDo(userDataArray, i);
                    temp++;
                }
            }
        }

        if (temp == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("displayToDoItems");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }

    if ((document.getElementById('filters')).value == 'dateRangeFilter') {

        showingDateFilterButtons();
    }

    if (filter == 'removeFilter') {
        location.assign('../html/viewTodo.html');
    }

}

function dateFilter() {
    let startDateForFilter = document.getElementById('startDateForFilter').value;
    let dueDateForFilter = document.getElementById('dueDateForFilter').value;

    if (startDateForFilter == '' || dueDateForFilter == '') {
        document.getElementById('errorMsgText').innerHTML = 'Select the dates please!';
    } else {
        temp = 0;

        var a = document.getElementById("displayToDoItems");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < userDataArray.length; i++) {
            if (email === userDataArray[i].email) {
                if ((startDateForFilter < userDataArray[i].startDate && userDataArray[i].startDate < dueDateForFilter) || (startDateForFilter < userDataArray[i].endDate && userDataArray[i].endDate < dueDateForFilter)) {
                    displayToDo(userDataArray, i);
                    temp++
                }
            }
        }

        if (temp == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("displayToDoItems");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }
}

function logOut() {
    location.assign('../html/login.html');
    sessionStorage.clear();
}