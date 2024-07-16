import { Routes, Route } from "react-router-dom";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      Hello world!
      <Routes>
        {/* public routes */}
        <Route path="/sign-in" element={<SigninForm />}/>
        <Route index element={<Home />}
        {/* private routes */}
      </Routes>
    </main>
  );
};

export default App;
