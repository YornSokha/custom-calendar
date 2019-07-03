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
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date

                cell.classList.add("text-center");

                let data_month = document.createAttribute('data-month');
                data_month.value = month;
                let data_year = document.createAttribute('data-year');
                data_year.value = year;
                cell.setAttributeNode(data_month);
                cell.setAttributeNode(data_year);



                let morningChkbox = document.createElement("span");
                let checkBoxM = document.createElement("input"); 
                checkBoxM.type = "checkbox"; 
                checkBoxM.value = "M";
                //"<input type='checkbox' value='M' style='display:inline'/>";
                morningChkbox.appendChild(checkBoxM);
                
                let afternoonChkbox = document.createElement("span");
                let checkBoxA = document.createElement("input");
                checkBoxA.type = "checkbox"; 
                checkBoxA.value = "A";
                // "<input type='checkbox' value='A' style='display:inline'/>";
                afternoonChkbox.appendChild(checkBoxA);
            

                let cellText = document.createTextNode(date);
                let dateDisplay = document.createElement("span");
                dateDisplay.style = "text-align:center;display:block";
                dateDisplay.appendChild(cellText);




                cell.appendChild(dateDisplay);
                cell.appendChild(morningChkbox);
                cell.appendChild(afternoonChkbox);

                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}