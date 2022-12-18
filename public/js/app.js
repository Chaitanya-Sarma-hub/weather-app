const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${city}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.city;
        messageTwo.textContent = data.forecast;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
