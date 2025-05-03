// RealTimeChart.jsx
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import io from "socket.io-client";
import "./RealTimeChart.css";

// Registering ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sensor Data",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  const socketRef = useRef(null);

  useEffect(() => {
    // Connecting to the Socket.IO server
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("sensorData", (data) => {
      const newLabel = new Date(data.timestamp).toLocaleTimeString();
      const newData = data.value;

      setChartData((prevData) => {
        const updatedLabels = [...prevData.labels, newLabel].slice(-10); // Keep only the last 10 labels
        const updatedData = [...prevData.datasets[0].data, newData].slice(-10); // Keep only the last 10 data points

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    });

    return () => {
      // Cleanup on component unmount
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="chart-container">
      <h3>Real-Time Sensor Data</h3>
      <Line data={chartData} />
    </div>
  );
};

export default RealTimeChart;
