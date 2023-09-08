// App.jsx

// import { ActionButton } from "./components/ActionButton";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Book } from "./pages/book";
import { Study } from "./pages/study";

const App = () => {
  return (
    <BrowserRouter>
      <h1>本と学びとキャリアのアプリ</h1>
      <ul>
        <li>
          <Link to="/book">本の記録</Link>
        </li>
        <li>
          <Link to="/study">学びの記録</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path="/book" element={<Book />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;