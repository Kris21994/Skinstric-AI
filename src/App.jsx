import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TestPage from "./components/TestPage";
import ShortcutPage from "./components/ShortcutPage";
import ScanPage from "./components/ScanPage";
import Select from "./components/Select";
import Summary from "./components/Summary";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/shortcut" element={<ShortcutPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/select" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
