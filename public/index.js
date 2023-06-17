const apiKey = '6730456c34a54da2beded4d589da4f39'

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


    const result = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&format=JSON&apikey=6730456c34a54da2beded4d589da4f39')
    const data = await result.json();

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
}

stocks.forEach( stock => stock.values.reverse());

new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.reverse().map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
});


new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
       labels: stocks.map(value => value.meta.symbol),
   datasets: [{
       label: 'highestprice',
       data: stocks.map(value => highestPrice(value)),
       backgroundColor: stocks.map(value=>getColor(value.meta.symbol)),
       borderColor: stocks.map(value=>getColor(value.meta.symbol)),
           }]
       
       }
   }); 

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }; 

function getHighestPrice(stock) {
    let highestPrice = 0
    stock.values.forEach(value => {
        const price = parseFloat(value.high);
        if (price > highestPrice) {
          highestPrice = price;
        }
      });

      return highestPrice;

    }}

main()