import { Link } from "react-router-dom";
import "./Page404.css";

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <h1>404 Not Found</h1>
      <p>Oops! You have ventured into the unknown.</p>
      <p>Looks like you're lost in the depths of cyberspace.</p>
      <p>
        Don't worry, you can find your way back by clicking the button below:
      </p>
      <Link to="/home">Go Home</Link>
    </div>
  );
}

export default Page404;
