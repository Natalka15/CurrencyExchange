{
  const refresh = () => {
  window.location.reload();
}
  window.setInterval(refresh, 12 * 60 * 60 * 1000);


fetch("https://api.nbp.pl/api/exchangerates/tables/A/")
  .then((response) => response.json())
  .then((data) => {
    const currency = data[0].rates;
    const euroBuy = document.querySelector(".js-euroBuy");
    const euroSell = document.querySelector(".js-euroSell");
    const dollarBuy = document.querySelector(".js-dollarBuy");
    const dollarSell = document.querySelector(".js-dollarSell");

    const currencyRate = () => {
      for (const currencyItem of currency) {
        const currencyLogo = currencyItem.code;
        const margin = 0.035;
        if (currencyLogo === "EUR") {
          const euro = currencyItem.mid;
          euroBuy.innerText = (euro - margin).toFixed(2);
          euroSell.innerText = (euro + margin).toFixed(2);
        } else if (currencyLogo === "USD") {
          const usd = currencyItem.mid;
          dollarBuy.innerText = (usd - margin).toFixed(2);
          dollarSell.innerText = (usd + margin).toFixed(2);
        }
      }
    }
    currencyRate();

    const currencyCounter = (event) => {
      event.preventDefault();
      const currencySell = document.querySelector(".js-currencySell").value;
          const currencyBuy = document.querySelector(".js-currencyBuy").value;
          const quote = document.querySelector(".js-quote").value;
          let quoteResult = document.querySelector(".js-form__quoteResult")
         

          const counter = (sell, buy, quote) => {
            if (sell === "PLN" && buy === "PLN" || sell === "EUR" && buy === "EUR" || sell === "USD" && buy === "USD") {
              return +quote;
            } else if (sell === "PLN" && buy === "EUR") {
              return (+quote / +euroSell.innerText).toFixed(2);
            }else if (sell === "PLN" && buy === "USD") {
              return (+quote / +dollarSell.innerText).toFixed(2);
            }else if (sell === "EUR" && buy === "PLN") {
              return (+quote * +euroBuy.innerText).toFixed(2);
            }else if (sell === "EUR" && buy === "USD") {
              return ((+quote * +euroBuy.innerText) / +dollarSell.innerText).toFixed(2);
            }else if (sell === "USD" && buy === "PLN") {
              return (+quote * +dollarBuy.innerText).toFixed(2);
            }else if (sell === "USD" && buy === "EUR") {
              return ((+quote * +dollarBuy.innerText) / +euroSell.innerText).toFixed(2);
            }else{
              return "Wpisz wartość";
            }
          }
          quoteResult.innerText = counter(currencySell, currencyBuy, quote);
    }
    const init = () => {
      const counterButton = document.querySelector(".js-form__button");
      counterButton.addEventListener("click", currencyCounter)
    }
    init();

  })};