const body = document.querySelector("body");

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