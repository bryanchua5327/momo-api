import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

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
      </Routes>
    </div>
  );
}

export default App;
