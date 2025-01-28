import Add from "./pages/Add";
import Books from "./pages/Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
