import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Login = React.lazy(() => import("./pages/Login"));
const Main = React.lazy(() => import("./pages/Main"));

function App() {
  return (
    <Suspense fallback={"loading"}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<Main />} />
      </Routes>
    </Suspense>
  );
}

export default App;
