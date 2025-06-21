import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";
import Stats from "./pages/Stats";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/stats" element={<Stats/>}/>
      </Routes>
    </Router>
  );
}

export default App;
