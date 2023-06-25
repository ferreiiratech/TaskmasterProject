const inputTask = document.querySelector("#task");
const formTask = document.querySelector("#formTask");
const bodyTask = document.querySelector("html");
const divFormMain = document.querySelector(".divFormMain");
const divCircle = document.querySelector(".divCircle");
const labelTask = document.querySelector(".labelTask");
const divCalendar = document.querySelector(".divCalendar");
const labels = document.querySelectorAll(".labelTask label");
const inputs = document.querySelectorAll(".labelTask input");
const divDateSubmit = document.querySelector(".divDateTimeSubmit");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");

const animationEndHandler = (event) => {
  if (event.animationName === "openForm") {
    setTimeout(expandForm, 100);
  }
};

const animationForm = () => {
  formTask.style.animation = "openForm 200ms ease-in-out forwards";
};

formTask.addEventListener("animationstart", animationEndHandler);

const expandForm = () => {
  divFormMain.classList.add("expanded");
  divCircle.classList.add("expanded");
  labelTask.classList.add("expanded");
  divCalendar.classList.add("expanded");
  divDateSubmit.classList.add("expanded");
};

const retractForm = (event) => {
  if (!formTask.contains(event.target)) {
    formTask.style.animation = "closeForm 200ms ease-in-out forwards";

    divFormMain.classList.remove("expanded");
    divCircle.classList.remove("expanded");
    labelTask.classList.remove("expanded");
    divCalendar.classList.remove("expanded");
    divDateSubmit.classList.remove("expanded");

    inputs.forEach((input) => {
      input.checked = false;
    });

    labels.forEach((label) => {
      label.style.color = "";
    });
  }
};

const changeColorSelectedLabel = (event) => {
  labels.forEach((label) => {
    if (label === event.target) {
      label.style.color = "#4a4a4acc";
    } else {
      label.style.color = "";
    }
  });
};

inputTask.addEventListener("click", animationForm);

bodyTask.addEventListener("click", retractForm);

labels.forEach((label) => {
  label.addEventListener("click", changeColorSelectedLabel);
});

// config hora atual yyyy-mm-dd
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// Obtem a hora no formato "HH:mm"
const formattedTime = currentDate.toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

dateInput.value = formattedDate;
timeInput.value = formattedTime;
