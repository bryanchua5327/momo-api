import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css"
import Graph from "./TransactionGraph";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>No Mo' Fraud</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trxnGraph/:id" element={<Graph />} />

      </Routes>
    </div>
  );
}

export default App;
