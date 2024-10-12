import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const ChartComponent = ({ forecastX, forecastY, previousX, previousY }) => {
    const forecastData = {
        labels: forecastX,
        datasets: [
            {
                label: 'Next year Price',
                data: forecastY,
                fill: false,
                borderColor: '#46b422',
                lineTension: 0.1
            }
        ]
    };

    const previousData = {
        labels: previousX,
        datasets: [
            {
                label: 'Previous year Price',
                data: previousY,
                fill: false,
                borderColor: '#46b422',
                lineTension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        suggestedMin: 1000,
                        stepSize: 200
                    }
                }
            ]
        }
    };

    return (
        <div>
            <div className="chartjs-wrapper">
                <Line data={forecastData} options={options} />
            </div>
            <div className="chartjs-wrapper">
                <Line data={previousData} options={options} />
            </div>
        </div>
    );
};

export default ChartComponent;
