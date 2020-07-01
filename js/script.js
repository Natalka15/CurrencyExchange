{
  const refresh = () => {
    window.location.reload();
  }
  window.setInterval(refresh, 12 * 60 * 60 * 1000);


  fetch("https://api.nbp.pl/api/exchangerates/tables/A/")
    .then((response) => response.json())
    .then((data) => {
      const currency = data[0].rates;
      render(currency);
    })



  const render = (currency) => {
    const currencyLogosArray = ["USD", "EUR", "CHF", "GBP", "UAH", "CZK", "NOK", "RON", "TRY", "RUB"]

    let htmlStringTableRates = "";
    const margin = 0.02;
    for (const currencyItem of currency) {
      for (const currencyItemChosen of currencyLogosArray) {
        if (currencyItem.code === currencyItemChosen) {
          htmlStringTableRates +=
            `
          <tr class = "table__row">
          <th class = "table__data--header table__data"
          scope = "row" >${currencyItem.currency} </th> 
          <td class = "table__data">${currencyItem.code} </td> 
          <td class = "table__data">${(currencyItem.mid - margin).toFixed(3)} </td> 
          <td class = "table__data"> ${(+currencyItem.mid + margin).toFixed(3)}</td> 
          </tr>
            `
        }
      }
      document.querySelector(".js-table").innerHTML = htmlStringTableRates;
    }
    let htmlStringOptions = "<option>PLN</option>";
    
    for (const currencyItemChosen of currencyLogosArray){

    htmlStringOptions += 
    `
    <option>${currencyItemChosen}</option>
    `
};
  document.querySelector(".js-currencySell").innerHTML = htmlStringOptions;
  document.querySelector(".js-currencyBuy").innerHTML = htmlStringOptions;

  }


  const converter = (sell, buy, quote, rate) => {
    if (sell === buy) {
      return +quote;
    } else if (sell === "PLN" && buy !== "PLN") {
      return (+quote / (rate + margin));
    } else if (sell !== "PLN" && buy === "PLN") {
      return (+quote * (rate - margin));
    } else if (sell !== "PLN" && buy !== "PLN") {
      return ((+quote * (rate - margin)) / (rate + margin));
    } else {
      return "Wpisz wartość";
    }
  }

  const currencyCounter = (event) => {
    event.preventDefault();
    const currencySell = document.querySelector(".js-currencySell").value;
    const currencyBuy = document.querySelector(".js-currencyBuy").value;
    const quote = document.querySelector(".js-quote").value;
    let quoteResult = document.querySelector(".js-form__quoteResult");
    quoteResult.innerText = converter(currencySell, currencyBuy, quote, rate);

  }

  const init = () => {
    const counterButton = document.querySelector(".js-form__button");
    counterButton.addEventListener("click", currencyCounter)
  }
  init();


};