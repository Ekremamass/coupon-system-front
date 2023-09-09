import "./Home.css";
import Login from "../../Auth/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import LatestCoupons from "../../Customer/LatestCoupons/LatestCoupons";

function Home(): JSX.Element {
  const user = useSelector((state: RootState) => state.authReducer.user);
  return (
    <div className="Home">
      <div className="home-container">
        <LatestCoupons />
        {user.token ? <></> : <Login />}
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2219.357811417267!2d35.009115337228614!3d32.26758606639362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d3d6f14ccd803%3A0xf3e589e4837fcffa!2z16fXmdeV16HXpyDXl9ee15XXk9eU!5e0!3m2!1sen!2sil!4v1693970442837!5m2!1sen!2sil" width="950" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default Home;
