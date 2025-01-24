import { Carousel } from "react-bootstrap";
import "../styles/carousel.css"

const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="./main.jpg" alt="smart home" />
          <Carousel.Caption>
            <h3>Home !Q</h3>
            <p>Comfort at your fingertips...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" src="./thermostat.jpeg" alt="thermostat"
          />
          <Carousel.Caption>
            <h3>Smart Thermostat</h3>
            <p>Coooooooooool right!?</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" src="./goggles.jpg" alt="goggles"
          />
          <Carousel.Caption>
            <h3>Smart Goggles</h3>
            <p>👀 on the prize. literally!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
