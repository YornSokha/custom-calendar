let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    let indexChkCount = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.classList.add("text-center");


                let cellText = document.createTextNode(date);
                let dateDisplay = document.createElement("span");
                dateDisplay.style = "text-align:center;display:block";
                dateDisplay.appendChild(cellText);




                cell.appendChild(dateDisplay);

                if (j == 0 || j == 6) {
                    cell.classList.add("bg-danger")
                } else {
                    let data_month = document.createAttribute('data-month');
                    data_month.value = month;
                    let data_year = document.createAttribute('data-year');
                    data_year.value = year;
                    let data_date = document.createAttribute('data-date');
                    data_date.value = date;
                    cell.setAttributeNode(data_date);
                    cell.setAttributeNode(data_month);
                    cell.setAttributeNode(data_year);



                    let morningChkbox = document.createElement("span");
                    let checkBoxM = document.createElement("input");
                    checkBoxM.type = "checkbox";
                    checkBoxM.value = "M";
                    let indexChk = document.createAttribute('id');
                    indexChk.value = indexChkCount++;
                    checkBoxM.setAttributeNode(indexChk);
                    //"<input type='checkbox' value='M' style='display:inline'/>";
                    morningChkbox.appendChild(checkBoxM);

                    let afternoonChkbox = document.createElement("span");
                    let checkBoxA = document.createElement("input");
                    checkBoxA.type = "checkbox";
                    checkBoxA.value = "A";
                    let indexChkA = document.createAttribute('id');
                    indexChkA.value = indexChkCount++;
                    checkBoxA.setAttributeNode(indexChkA);
                    // "<input type='checkbox' value='A' style='display:inline'/>";
                    afternoonChkbox.appendChild(checkBoxA);

                    cell.appendChild(morningChkbox);
                    cell.appendChild(afternoonChkbox);
                }


                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

function countChkBoxChecked() {
    return $("[type='checkbox']:checked").length;
}

function clearChecked() {
    resetVariables();
    resetCheckboxes();

}


function resetCheckboxes() {
    $("input:checkbox").prop('checked', false);
}

function resetVariables() {
    start = undefined;
    last = undefined;
    tmpLast = undefined;
    fromDate = '';
    toDate = '';
}

function getChkBoxClass(e) {
    return parseInt($(e).attr('id'));
}

let start;
let last;
let tmpLast;
let fromDate = '';
let separator = '/';
let toDate = '';

function showDate(month, date, year) {

}

function getTdDataVal(e, time) {
    return $(e).parents('td').data(time);
}

$('input:checkbox').change(function() {
    if (countChkBoxChecked() === 1) {
        start = getChkBoxClass(this);
        // console.log($(this).parents('td').data('date'));
        // console.log($(this).parents('td').data('month'));
        // console.log($(this).parents('td').data('year'));
        // console.log($(this).val())
        fromDate = getTdDataVal(this, 'date') +
            separator + getTdDataVal(this, 'month') +
            separator + getTdDataVal(this, 'year') + ' ' + $(this).val();
        $('#date').val(fromDate + ' - ' + fromDate);
        console.log(fromDate)
    } else if (countChkBoxChecked() > 1) {
        last = getChkBoxClass(this)

        if (
            (tmpLast != undefined) &&
            (tmpLast > last) &&
            (last > start)) {

            checkBoxFrom(last, tmpLast, false);


            toDate = getTdDataVal(this, 'date') +
                separator + getTdDataVal(this, 'month') +
                separator + getTdDataVal(this, 'year') + ' ' + $(this).val();
            console.log(fromDate + ' - ' + toDate)
            $('#date').val(fromDate + ' - ' + toDate);
            tmpLast = last;

        } else if (last > start) {
            tmpLast = last;
            checkBoxFrom(start, last, true);

            toDate = getTdDataVal(this, 'date') +
                separator + getTdDataVal(this, 'month') +
                separator + getTdDataVal(this, 'year') + ' ' + $(this).val();
            $('#date').val(fromDate + ' - ' + toDate);

            console.log(fromDate + ' - ' + toDate)
        }
        // console.log('Total checked : ' + countChkBoxChecked())
    } else {
        resetVariables();
    }

    function checkBoxFrom(start, last, status) {
        for (var i = start; i <= last; i++) {
            $('#' + i).prop('checked', status);
        }
    }
})