const body = document.querySelector("body");

export function redirectPage(url, className, time) {
  body.classList.add(`${className}`);
  setTimeout(() => {
    window.location.href = url;
  }, time);
}

export function userAlert(title, message) {
  const alertMenu = document.createElement("div");
  alertMenu.classList.add("alert-menu");
  setTimeout(() => {
    alertMenu.classList.add("show-alert-menu");
  }, 100);

  alertMenu.innerHTML = `
      <h2>${title}</h2>
      <p>${message}</p>
  `;
  body.appendChild(alertMenu);
  setTimeout(() => {
    alertMenu.classList.remove("show-alert-menu");
    setTimeout(() => {
      alertMenu.remove();
    }, 500);
  }, 2000);
}

export function applyBlur() {
  const backDrop = document.querySelector(".back-drop");
  backDrop.classList.toggle("blur");
}
