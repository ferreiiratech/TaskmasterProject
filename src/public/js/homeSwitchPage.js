const taskTodayBtn = document.querySelector(".taskTodayBtn");
const scheduledBtn = document.querySelector(".scheduledBtn");
const settingBtn = document.querySelector(".settingBtn");

const calendarIcon = document.querySelector(".bi-calendar2-day");
const clockIcon = document.querySelector(".bi-clock-history");
const settingIcon = document.querySelector(".bi-gear-fill");

const containerTask = document.querySelector(".containerTask");
const containerScheduled = document.querySelector(".containerScheduled");
const containerSettings = document.querySelector(".containerSettings");

calendarIcon.classList.add("sectionOn")

const handleButtonClick = (btn, icon, container) => {
  // Remove a classe "sectionOn" de todos os ícones
  calendarIcon.classList.remove("sectionOn");
  clockIcon.classList.remove("sectionOn");
  settingIcon.classList.remove("sectionOn");

  // Adiciona a classe "sectionOn" ao ícone correspondente ao botão clicado
  icon.classList.add("sectionOn");

  // Exibe o container correspondente ao botão clicado
  containerTask.style.display = "none";
  containerScheduled.style.display = "none";
  containerSettings.style.display = "none";
  
  container.style.display = "block";
};

taskTodayBtn.addEventListener("click", () => {
  handleButtonClick(taskTodayBtn, calendarIcon, containerTask);
});

scheduledBtn.addEventListener("click", () => {
  handleButtonClick(scheduledBtn, clockIcon, containerScheduled);
});

settingBtn.addEventListener("click", () => {
  handleButtonClick(settingBtn, settingIcon, containerSettings);
});
