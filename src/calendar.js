const calendarEl = document.getElementById("calendar");
const openCalendarBtn = document.getElementById("openCalendar");

let calendarMonth = today.getMonth();
let calendarYear = today.getFullYear();

openCalendarBtn.addEventListener("click", () => {
    calendarEl.classList.toggle("hidden");
    renderCalendar(calendarMonth, calendarYear);
});

function renderCalendar(month, year) {
    calendarEl.innerHTML = "";

    const header = document.createElement("div");
    header.className = "calendar-header";

    const prev = document.createElement("button");
    prev.textContent = "←";
    prev.addEventListener("click", () => {
        if (month === 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
        calendarMonth = month;
        calendarYear = year;
        renderCalendar(month, year);
    });

    const next = document.createElement("button");
    next.textContent = "→";
    next.addEventListener("click", () => {
        if (month === 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
        calendarMonth = month;
        calendarYear = year;
        renderCalendar(month, year);
    });

    const title = document.createElement("span");
    title.textContent = new Date(year, month).toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
    });

    header.appendChild(prev);
    header.appendChild(title);
    header.appendChild(next);

    const daysGrid = document.createElement("div");
    daysGrid.className = "calendar-days";

    const weekDays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
    weekDays.forEach(d => {
        const el = document.createElement("div");
        el.textContent = d;
        el.style.fontWeight = "bold";
        el.style.cursor = "default";
        daysGrid.appendChild(el);
    });

    let firstDay = new Date(year, month, 1).getDay();
    if (firstDay === 0) firstDay = 7;

    for (let i = 1; i < firstDay; i++) {
        const empty = document.createElement("div");
        daysGrid.appendChild(empty);
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement("div");
        cell.textContent = d;

        const dateObj = new Date(year, month, d);

        if (dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            cell.classList.add("disabled");
        } else {
            cell.addEventListener("click", () => {
                shownMonday = getMonday(dateObj);
                updatePlanning(shownMonday);
                calendarEl.classList.add("hidden");
            });
        }

        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }

        daysGrid.appendChild(cell);
    }

    calendarEl.appendChild(header);
    calendarEl.appendChild(daysGrid);
}
