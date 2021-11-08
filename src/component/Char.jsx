import React from 'react';
import { Line } from 'react-chartjs-2';


function Char() {

    const datas = [
        {
        "time": "2021-11-08T15:28:00.772444Z",
        "trade_id": 5611600,
        "price": "1.75340000",
        "size": "4077.93000000",
        "side": "sell"
        },
        {
        "time": "2021-11-08T15:28:00.77023Z",
        "trade_id": 5611599,
        "price": "1.75340000",
        "size": "350.68000000",
        "side": "sell"
        },
        {
        "time": "2021-11-08T15:27:39.033963Z",
        "trade_id": 5611598,
        "price": "1.75390000",
        "size": "54.55000000",
        "side": "sell"
        },
        {
        "time": "2021-11-08T15:27:12.988858Z",
        "trade_id": 5611597,
        "price": "1.75340000",
        "size": "48.72000000",
        "side": "buy"
        },
        {
        "time": "2021-11-08T15:26:56.073571Z",
        "trade_id": 5611596,
        "price": "1.75380000",
        "size": "80.51000000",
        "side": "buy"
        }
    ];

    const getSellPrice = () => {
        var res = datas.filter(x => x.side ==='sell').map(x => x.price);
        console.log(res);
        return res;
    }

    const getBuyPrice = () => {
        var res = datas.filter(x => x.side ==='buy').map(x => x.price);
        console.log(res);
        return res;
    }

    const getTime = () => {
        var times = datas.map(x => x.time);
        return times;
    }
    
    const data = {
        labels: getTime(),
        datasets: [
          {
            label: 'Buy of Price',
            data: getBuyPrice(),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Sell of Price',
            data: getSellPrice(),
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
            yAxes: [
                {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'Buy',
                },
                {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  id: 'sell',
                },
              ],
        },
        tension: 0.1
      };

    return (
        <div>
             <Line data={data} options={options} />
        </div>
    )
}

export default Char
