import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SalesReport from "../components/SalesReport";


const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <SalesReport />
    </div>
  );
};

export default Home;