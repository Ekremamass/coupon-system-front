import "./Main.css";
import Routing from "../Routing/Routing";
import { Outlet } from "react-router-dom";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<Routing/>
            <Outlet/>
        </div>
    );
}

export default Main;
