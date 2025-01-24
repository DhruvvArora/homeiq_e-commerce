import Navbar from "../components/Navbar";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <ReviewForm />
      <ReviewList />
    </div>
  );
};

export default Home;