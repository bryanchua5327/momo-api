import Home from "./Home"
import Splitter from "./pages/billSplitter"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/splitter" element={ <Splitter/> } />
      </Routes>
    </div>
  )
}

export default App