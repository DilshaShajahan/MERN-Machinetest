import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import RealTimeChart from "../components/RealTimeChart";



function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/protected/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data.message);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">

      <RealTimeChart />

    </div>
  );
}

export default Dashboard;
