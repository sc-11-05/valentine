import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Love from "./Love";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/love" element={<Love />} />
    </Routes>
  );
}

export default App;
