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

      
    
      const margin = 0.035;

      const calculateCurrencyRate = (currencyBuy, currencySell) => {
        for (const currencyItem of currency) {
const currencyLogo = currencyItem.code;
      const currencyRate = currencyItem.mid;
            console.log(currencyLogo, currencyRate)
          
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
      calculateCurrencyRate();

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
        quoteResult.innerText = converter(currencySell, currencyBuy, quote, 4).toFixed(2);
      }

      const init = () => {
        const counterButton = document.querySelector(".js-form__button");
        counterButton.addEventListener("click", currencyCounter)
      }
      init();

    })
};