import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataProvider } from "../context/DataContext";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";

export type PostType = {
  id: string;
  title: string;
  datetime: string;
  body: string;
};

function App() {
  return (
    <div className="w-full max-w-[800px] h-screen flex flex-col justify-start items-center border border-solid border-[#333] shadow-[0px_0px_15px_gray]">
      <Header />
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<NewPost />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
