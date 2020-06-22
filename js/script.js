window.setInterval(refresh, 12 * 60 * 60 * 1000);
function refresh() {
  window.location.reload();
}

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
      const quoteResult = document.querySelector(".js-form__quoteResult");
      const plnSell = document.querySelector(".js-plnSell").checked;
      const eurSell = document.querySelector(".js-eurSell").checked;
      const usdSell = document.querySelector(".js-usdSell").checked;
      const plnBuy = document.querySelector(".js-plnBuy").checked;
      const eurBuy = document.querySelector(".js-eurBuy").checked;
      const usdBuy = document.querySelector(".js-usdBuy").checked;
      const quote = document.querySelector(".js-quote").value;

      if (plnSell) {
        if (eurBuy) {
          quoteResult.innerText = (+quote / +euroBuy.innerText).toFixed(2);
        } else if (usdBuy) {
          quoteResult.innerText = (+quote / +dollarSell.innerText).toFixed(2);
        } else if (plnBuy) {
          quoteResult.innerText = +quote
        }
      } else if (eurSell) {
        if (plnBuy) {
          quoteResult.innerText = (+quote * +euroBuy.innerText).toFixed(2);
        } else if (usdBuy) {
          quoteResult.innerText = ((+quote * +euroBuy.innerText) / +dollarSell.innerText).toFixed(2);
        } else if (eurBuy) {
          quoteResult.innerText = +quote
        }
      } else if (usdSell) {
        if (plnBuy) {
          quoteResult.innerText = (+quote * +dollarBuy.innerText).toFixed(2);
        } else if (usdBuy) {

          quoteResult.innerText = +quote;
        } else if (euroBuy) {
          quoteResult.innerText = ((+quote * +dollarBuy.innerText) / +euroSell.innerText).toFixed(2);
        }
      } else {
        quoteResult.innerText = "Wpisz wartość";
      }
    }
    const init = () => {
      const counterButton = document.querySelector(".js-form__button");
      counterButton.addEventListener("click", currencyCounter)
    }
    init();

  });