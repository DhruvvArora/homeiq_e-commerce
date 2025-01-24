import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";
import "../App.css";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Trending />
    </div>
  );
};

export default Home;