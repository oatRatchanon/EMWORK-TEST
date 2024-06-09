import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemberList from "./components/MemberList";
import MemberForm from "./components/MemberForm";
import MemberAgeChart from "./components/MemberAgeChart";
import { useEffect } from "react";
import sampleMembers from "./utils/generate.js";

const App = () => {
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(sampleMembers));
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MemberList />} />
          <Route path="/add" element={<MemberForm />} />
          <Route path="/edit/:id" element={<MemberForm />} />
          <Route path="/chart" element={<MemberAgeChart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
