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
      init(currency);
    })



  const render = (currency) => {
    const currencyLogosArray = ["USD", "EUR", "CHF", "GBP", "UAH", "CZK", "NOK", "RON", "TRY", "RUB"]

    let htmlStringTableRates = `
    <caption class="table__caption">
            kursy walut
    </caption>
    <tr class="table__row">
    <th class="table__data--header table__data" scope="col">nazwa waluty</th>
    <th class="table__data--header table__data" scope="col">logo waluty</th>
    <th class="table__data--header table__data" scope="col">kupno</th>
    <th class="table__data--header table__data" scope="col">sprzedaż</th>
</tr>`;

    const margin = 0.02;
    for (const currencyItem of currency) {
      for (const currencyItemChosen of currencyLogosArray) {
        if (currencyItem.code === currencyItemChosen) {
          htmlStringTableRates +=
            `
          <tr class = "table__row">
          <th class = "table__data--header table__data"
          scope = "row" >${currencyItem.currency} </th> 
          <td class = "table__data js-currencyLogo">${currencyItem.code} </td> 
          <td class = "table__data js-currencyWithoutMargin">${(currencyItem.mid - margin).toFixed(3)} </td> 
          <td class = "table__data js-currencyWithMargin"> ${(+currencyItem.mid + margin).toFixed(3)}</td> 
          </tr>
            `
        }
      }
      document.querySelector(".js-table").innerHTML = htmlStringTableRates;
    }
    let htmlStringOptions = `<option>PLN</option>`;

    for (const currencyItemChosen of currencyLogosArray) {

      htmlStringOptions +=
        `
    <option>${currencyItemChosen}</option>
    `
    };
    document.querySelector(".js-currencySell").innerHTML = htmlStringOptions;
    document.querySelector(".js-currencyBuy").innerHTML = htmlStringOptions;

  }


  const converter = (sell, buy, quote, rateWithMargin, rateWithoutMargin) => {
    if (sell === buy) {
      return +quote;
    } else if (sell === "PLN" && buy !== "PLN") {
      return (+quote / (rateWithMargin));
    } else if (sell !== "PLN" && buy === "PLN") {
      return (+quote * (rateWithoutMargin));
    } else if (sell !== "PLN" && buy !== "PLN") {
      return ((+quote * (rateWithoutMargin)) / (rateWithMargin));
    } else {
      return "Wpisz wartość";
    }
  }

  const currencyCounter = (event) => {
    event.preventDefault();
    const currencySell = document.querySelector(".js-currencySell").value;
    const currencyBuy = document.querySelector(".js-currencyBuy").value;
    const currencyLogo = document.querySelectorAll(".js-currencyLogo");
    const rateWithMargin = document.querySelectorAll(".js-currencyWithMargin");
    const rateWithoutMargin = document.querySelectorAll(".js-currencyWithoutMargin");
    
    console.log(currencyLogo)

      for (const withMargin of rateWithMargin){
        withMargin1 = withMargin.innerText;
      console.log(withMargin1)
      }
      for (const withoutMargin of rateWithoutMargin){
        withoutMargin1 = withoutMargin.innerText;
      // console.log(withoutMargin1)
    }
    

    const quote = document.querySelector(".js-quote").value;
    let quoteResult = document.querySelector(".js-form__quoteResult");
    quoteResult.innerText = converter(currencySell, currencyBuy, quote);
  }





  const init = () => {

    const counterButton = document.querySelector(".js-form__button");
    counterButton.addEventListener("click", currencyCounter);
  }


};