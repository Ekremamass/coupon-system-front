import "./Home.css";
import Login from "../../Auth/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import LatestCoupons from "../../Customer/LatestCoupons/LatestCoupons";




function Home(): JSX.Element {
    const user =useSelector((state:RootState)=>state.authReducer.user)
  return (
    <div className="Home">
      <img src="images/banner.jpg" alt="banner" />
      <div className="container">
      <LatestCoupons/>
      {(user.token) ? <></> : <Login />}
      
      </div>
    </div>
  );
}

export default Home;
