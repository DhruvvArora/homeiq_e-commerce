import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import "../App.css";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="layout-wrapper">
        <Sidebar />
        <main className="main-content">
          <Carousel />
          <Product />
        </main>
      </div>
    </div>
  );
};

export default Home;
