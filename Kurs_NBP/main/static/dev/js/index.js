document.addEventListener('DOMContentLoaded', () => {
  const nameHTML = document.querySelector('.js-currency-name');
  const chartHTML = document.querySelector('.js-currency-chart');
  const inputsHTML = document.querySelectorAll('.js-currency');
  const beforeValue = document.querySelector("input[name=currency]:checked").value;
  const currency = {
    EUR:'Euro',
    GBP:'Funt szterling',
    CHF:'Frank szwajcarski',
    USD:'Dolar amerykański',
    CAD:'Dolar kanadyjski',
    HUF:'Forint',
    UAH:'Hrywna ukraińska',
    JPY:'Jen japoński',
    CZK:'Korona czeska',
    MXN:'Peso meksykańskie'
  }
  const innerHTMLInit = (value)=>{
    nameHTML.innerHTML=currency[value];
    chartHTML.innerHTML=`<img src="static/chart${value}.png" alt="${value}">`
  };
  
  
  const inputsListenerInit = () => {
    inputsHTML.forEach(inputHTML => {
      inputHTML.addEventListener('change', ()=>{
        const value = document.querySelector("input[name=currency]:checked").value;
        innerHTMLInit(value);
      })
    });
  };
  const init = ()=>{
    innerHTMLInit(beforeValue);
    inputsListenerInit();
  }
  if(nameHTML && chartHTML && inputsHTML.length>0 && beforeValue){
    init();
  }
  
  
  
})
