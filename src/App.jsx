import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import TodaysRaces from "@/components/pages/TodaysRaces";
import TopPicks from "@/components/pages/TopPicks";
import HorseAnalysis from "@/components/pages/HorseAnalysis";
import Results from "@/components/pages/Results";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<TopPicks />} />
            <Route path="/todays-races" element={<TodaysRaces />} />
            <Route path="/top-picks" element={<TopPicks />} />
            <Route path="/horse-analysis/:horseId" element={<HorseAnalysis />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;