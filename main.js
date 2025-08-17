// Base URL of working currency API
const BASE_URL = "https://open.er-api.com/v6/latest";

// Get HTML elements
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// 1️⃣ Fill dropdowns with currency options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option"); // create new option
    option.value = currCode;                       // set value
    option.innerText = currCode;                   // set text

    // Set default selection
    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.append(option); // add option to dropdown
  }

  // Update flag when selection changes
  select.addEventListener("change", (evt) => updateFlag(evt.target));
}

// 2️⃣ Function to update flag image
function updateFlag(element) {
  let currCode = element.value;               // get selected currency
  let countryCode = countryList[currCode];   // get country code
  let img = element.parentElement.querySelector("img"); // find flag image
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`; // update image
}

// 3️⃣ Convert button click event
btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); // stop form from reloading

  // Get amount
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value || 1; // default = 1
  amount.value = amtVal;

  // API URL for selected base currency
  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    // Fetch data from API
    let response = await fetch(URL);
    let data = await response.json();

    // Get exchange rate for target currency
    let rate = data.rates[toCurr.value];
    let finalAmount = (amtVal * rate).toFixed(2); // multiply amount

    // Show result
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Error fetching exchange rate!";
    console.error(err);
  }
});
