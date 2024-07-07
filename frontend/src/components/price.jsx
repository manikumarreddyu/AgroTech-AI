import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import gain from '../assets/images/gain-icon.png';
import loss from '../assets/images/loss-icon.png';

const Price = () => {
    var commodityArray= ['arhar','bajra','barley','copra','urad','gram','groundnut','jowar','jute','maize','masoor','moong','niger','paddy','ragi','rape']
    console.log(commodityArray)

    const initialData = {
        chunks: [
          ["arhar", "bajra", "barley", "copra", "urad", "gram", "groundnut", "jowar"],
          ["jute", "maize", "masoor", "moong", "niger", "paddy", "ragi", "rape"]
        ],
        commodities: [
          "arhar"
        ],
        six_months_forecast: [
          ["Aug 24", "Copra", 5650.8, -0.36, "Barley", 1085.84, -0.36],
  
        ],
        top_gainers: [
          ["Gram", 3592.4, 5.51],
      
        ],
        top_losers: [
          ["Niger", 4648.0, -6.28],
         
        ]
      };
    const [receivedData, setReceivedData] = useState(initialData);
     
   
  console.log(receivedData);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/price_predict');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setReceivedData(responseData);
        } catch (error) {
            console.log('Error:', error);
        }
        };
        fetchData();
    }, []);

    console.log(receivedData);


    return( 
        <div className="container-fluid mx-auto">
            <div className="row"> 
                <h1 className="text-3xl font-bold text-center">Price Prediction</h1>
                 
            </div>
            <div className="row">

                {/* Top Gainers */}

                <div className="col"> 
                    <div class="table_container">
                        <h1 class="heading">Top Gainers (Current trends)</h1>
                        <table class="border-4 border-sky-500">
                            <thead>
                            <tr>
                                <th className="px-2">Item Name</th>
                                <th className="px-2">Price (per Qtl.)</th>
                                <th className="px-2">Change</th>
                            </tr>
                            </thead>
                            <tbody>
                                {receivedData.top_gainers.map((ele, index) => (
                                    <tr key={index}>
                                    <td>{ele[0]}</td>
                                    <td>{ele[1]}</td>
                                    <td>{ele[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Loosers */}

                <div className="col"> 
                    <div class="table_container">
                        <h1 class="heading">Top Loosers (Current trends)</h1>
                        <table class="border-4 border-sky-500">
                            <thead>
                            <tr>
                                <th className="px-2">Item Name</th>
                                <th className="px-2">Price (per Qtl.)</th>
                                <th className="px-2">Change</th>
                            </tr>
                            </thead>
                            <tbody>
                                {receivedData.top_losers.map((ele, index) => (
                                    <tr key={index}>
                                    <td>{ele[0]}</td>
                                    <td>{ele[1]}</td>
                                    <td>{ele[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Star Commodity Prediction */}


            <div className="row">
                <div className="col">
                    <h4 class="heading">Star Commodity Prediction</h4>
                    <div className="table_container">
                    <table class="border-4 border-sky-500">
                            <tr>
                            <td><h5 id="crop1">{ receivedData.six_months_forecast[0][1] }</h5></td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td class="right">
                                <h4 id="price1">₹{ receivedData.six_months_forecast[0][2] }</h4>
                                <p id="pos-change" class="valign-wrapper right">{ receivedData.six_months_forecast[0][3] }% <img src={gain} alt="Gain Icon" class="commodity_icon" /></p>
                            </td>
                            </tr>
                            <tr>
                            <td><h5 id="crop2">{ receivedData.six_months_forecast[0][4] }</h5></td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td class="right">
                                <h4 id="price2">₹{ receivedData.six_months_forecast[0][5] }</h4>
                                <p id="neg-change" class="valign-wrapper right">{ receivedData.six_months_forecast[0][6] }% <img src={loss} alt="Loss Icon" class="commodity_icon" /></p>
                            </td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>

            {/*  */}
            <div className="row">
                <div className="col grid grid-rows-4 grid-flow-col gap-1">
                {commodityArray.map((commodity, index) => (
                    <div key={index}>
                        <Link to={`/report?commodity=${commodity} `}  className="btn">
                                                    <div className="card row-span-1">
                                    <div className="card-content row valign-wrapper">
                                        <div className="col s3">
                                       
                                            
                                        <img
                                            src={`src/assets/crops_images/${commodity}.png`}
                                            alt={commodity}
                                            className="commodity_icon"
                                        />
                                        </div>
                                        <div className="col s9">
                                        <span className="card-title">{commodity.charAt(0).toUpperCase() + commodity.slice(1)}</span>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                        </div>
                        ))}
                </div>
            </div>
                        
        </div>
    )

}
export default Price;