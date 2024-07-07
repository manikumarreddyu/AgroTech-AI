import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import React from "react";
import ChartComponent from "./Chart";
 
 

const Report = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const crop  = searchParams.get('commodity');
     
     
    const [CData, setCData] = useState(null );
 

    const initialData = 
        {
            "current_price": 1862.6,
            "export": "JOrdan, United Arab Emirates, Taiwan",
            "forecast_values": [
              [
                "Aug 24",
                1855.9,
                -0.36
              ],
              [
                "Sep 24",
                1855.9,
                -0.36
              ],
              [
                "Oct 24",
                1832.45,
                -1.62
              ],
              [
                "Nov 24",
                1909.5,
                2.52
              ],
              [
                "Dec 24",
                2075.32,
                11.42
              ],
              [
                "Jan 25",
                1953.05,
                4.86
              ],
              [
                "Feb 25",
                1951.38,
                4.77
              ],
              [
                "Mar 25",
                1953.05,
                4.86
              ],
              [
                "Apr 25",
                1931.28,
                3.69
              ],
              [
                "May 25",
                1941.32,
                4.23
              ],
              [
                "Jun 25",
                1896.1,
                1.8
              ],
              [
                "Jul 25",
                1862.6,
                0.0
              ]
            ],
            "forecast_x": ['Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25'],
            "forecast_y": [
              1855.9,
              1855.9,
              1832.45,
              1909.5,
              2075.32,
              1953.05,
              1951.38,
              1953.05,
              1931.28,
              1941.32,
              1896.1,
              1862.6
            ],
            "image_url": "src/assets/crops_images/jute.png",
            "max_crop": [
              "Dec 24",
              2075.32
            ],
            "min_crop": [
              "Oct 24",
              1832.45
            ],
            "name": "jute",
            "previous_values": [
              [
                "Jul 23",
                1951.38
              ],
              [
                "Aug 23",
                1954.72
              ],
              [
                "Sep 23",
                1963.1
              ],
              [
                "Oct 23",
                1983.2
              ],
              [
                "Nov 23",
                1993.25
              ],
              [
                "Dec 23",
                1983.2
              ],
              [
                "Jan 24",
                1827.42
              ],
              [
                "Feb 24",
                1852.55
              ],
              [
                "Mar 24",
                1948.02
              ],
              [
                "Apr 24",
                1978.18
              ],
              [
                "May 24",
                1979.85
              ],
              [
                "Jun 24",
                1971.48
              ]
            ],
            "previous_x": [
              "Jul 23",
              "Aug 23",
              "Sep 23",
              "Oct 23",
              "Nov 23",
              "Dec 23",
              "Jan 24",
              "Feb 24",
              "Mar 24",
              "Apr 24",
              "May 24",
              "Jun 24"
            ],
            "previous_y": [
              1951.38,
              1954.72,
              1963.1,
              1983.2,
              1993.25,
              1983.2,
              1827.42,
              1852.55,
              1948.02,
              1978.18,
              1979.85,
              1971.48
            ],
            "prime_loc": " West Bengal , Assam , Orissa , Bihar , Uttar Pradesh",
            "type_c": "kharif"
          }
    const [receivedData, setReceivedData] = useState(initialData);
    const [error, setError] = useState(null);
     
  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:5000/commodity_predict";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {crop } ), // Adjust 'jute' as needed
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const responseData = await response.json();
        console.log(responseData);
        setReceivedData(responseData);
        
      } catch (error) {
        console.log('Error:', error);
        setError(error.message);
      }
    };

   
      fetchData();
    
  }, [CData]); // Only run effect when CData changes or on mount

    console.log(receivedData);



    return( 
        <div className="container-fluid mx-auto">
            <div className="row"> 
           <h1 className="text-3xl font-bold text-center">Report of crop</h1>
           </div>
           <div className="main_content">
                    <div className="container">
                        <h2 className="header" style={{textTransform:"capitalize"}}>{receivedData.name}</h2>
                        <div className="row">
                            <div className="col s8 m7">
                                <div className="card horizontal medium">
                                    <div className="card-image">
                                    <img
                                            src={` ${receivedData.image_url} `}
                                            alt="alt"
                                            className="commodity_icon"
                                            style={{height:"200px",width:"200px"}}
                                        />
                                    </div>
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <table>
                                                <tr>
                                                    <td>Current Price</td>
                                                    <td><b>₹ { receivedData.current_price} / ql</b></td>
                                                </tr>
                                                <tr>
                                                    <td>Prime Location</td>
                                                    <td><b>{ receivedData.prime_loc}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>Crop Type</td>
                                                    <td><b>{ receivedData.type_c}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>Export</td>
                                                    <td><b>{ receivedData.export}</b></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="card grey lighten-3 mt-3">
                                    <div className="card-content black-text">
                                        <span className="card-title">Brief Forecast</span>
                                        <table>
                                            <tr>
                                                <td>
                                                    <p>Min. crop price time</p>
                                                </td>
                                                <td>
                                                    <h5>{ receivedData.min_crop[0]}</h5>
                                                </td>
                                                <td>
                                                    <h4>₹{ receivedData.min_crop[1]}</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Max. crop price time</p>
                                                </td>
                                                <td>
                                                    <h5>{ receivedData.max_crop[0]}</h5>
                                                </td>
                                                <td>
                                                    <h4>₹{ receivedData.max_crop[1]}</h4>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <ChartComponent    
                                    forecastX={receivedData.forecast_x}
                                    forecastY={receivedData.forecast_y}
                                    previousX={receivedData.previous_x}
                                    previousY={receivedData.previous_y}
                                /> 
                        

                            
                                               
                            </div>
                        </div>
                        
                    </div>
                </div>
            
            
                        
        </div>
    )

}
export default Report;