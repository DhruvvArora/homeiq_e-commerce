import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Inventory from "../components/Inventory";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Inventory />
    </div>
  );
};

export default Home;