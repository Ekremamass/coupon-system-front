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
                        <p>connected as {user.email} <Link to="logout">{t('logout', { ns: 'login' })}</Link></p>
                    </>
                    :
                    <>
                        <p>{t('hello', { ns: 'login' })}&nbsp;&nbsp;&nbsp;
                            <Link to="register">{t('register', { ns: 'login' })}</Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="login">{t('login', { ns: 'login' })}</Link>
                        </p>
                    </>
            }
        </div>
    );
}

export default AuthMenu;
