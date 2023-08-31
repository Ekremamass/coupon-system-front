import { useSelector } from "react-redux";
import "./AuthMenu.css";
import { RootState } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AuthMenu(): JSX.Element {
    const user =useSelector((state:RootState)=>state.authReducer.user)
    const {t} = useTranslation();
    return (
        <div className="AuthMenu">
            {
                (user.token)
                    ?
                    <>
                        <p>connected as {user.email} <Link to="logout"><button>{t('logout', { ns: 'login' })}</button></Link></p>
                    </>
                    :
                    <>
                            <Link to="register"><button>{t('register', { ns: 'login' })}</button></Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="login"><button>{t('login', { ns: 'login' })}</button></Link>
                    </>
            }
        </div>
    );
}

export default AuthMenu;
