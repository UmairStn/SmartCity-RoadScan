import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DepthGraph({ depthHistory }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '📊 Live Depth Reading',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#FFFFFF'
      },
      tooltip: {
        backgroundColor: '#1E3A5F',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Depth: ${context.parsed.y} cm`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Depth (cm)',
          font: {
            weight: 'bold'
          },
          color: '#FFFFFF'
        },
        ticks: {
          color: '#93C5FD',
          stepSize: 3,
          callback: function(value) {
            return value + ' cm';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time',
          font: {
            weight: 'bold'
          },
          color: '#FFFFFF'
        },
        ticks: {
          color: '#93C5FD',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const data = {
    labels: depthHistory.map(item => item.time),
    datasets: [
      {
        label: 'Depth',
        data: depthHistory.map(item => item.value),
        borderColor: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      }
    ]
  };

  return (
    <div 
      className="rounded-xl shadow-lg p-6 border-2"
      style={{ 
        backgroundColor: '#1E3A5F',
        borderColor: '#2E5A8F'
      }}
    >
      <div style={{ height: '280px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

DepthGraph.propTypes = {
  depthHistory: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
};

export default DepthGraph;