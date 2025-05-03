import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainTabs from "./pages/MainTabs";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<MainTabs />} />
      </Routes>
    </Router>
  );
}

export default App;
