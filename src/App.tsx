import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import {Layout} from "./components/layout/Layout.tsx";
import Stats from "@/pages/Stats.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Home from "@/pages/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/stats/:code"} element={<Stats/>}/>
          <Route path={"*"} element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
