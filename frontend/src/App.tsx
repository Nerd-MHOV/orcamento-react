import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { NewTariff } from "./pages/NewTariffs";
import { TariffsPage } from "./pages/Tariffs";
import { TestPage } from "./pages/TextPage";
import { Private } from "./private";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route element={<Private />}>
              <Route index element={<Home />} />
              <Route path="/tariffs">
                <Route index element={<TariffsPage />} />
                <Route path="/tariffs/create" element={<NewTariff />} />
                <Route path="/tariffs/test" element={<TestPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
