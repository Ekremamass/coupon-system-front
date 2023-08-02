import { useSelector } from "react-redux";
import "./AuthMenu.css";
import { RootState } from "../../../Redux/Store";
import { Link } from "react-router-dom";

function AuthMenu(): JSX.Element {
    const user =useSelector((state:RootState)=>state.authReducer.user)
    return (
        <div className="AuthMenu">
            {
                (user.token)
                    ?
                    <>
                        <p>connected as {user.email} <Link to="logout">Logout</Link></p>
                    </>
                    :
                    <>
                        <p>hello guest&nbsp;&nbsp;&nbsp;
                            <Link to="register">Register</Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="login">Login</Link>
                        </p>
                    </>
            }
        </div>
    );
}

export default AuthMenu;
