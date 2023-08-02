import AuthMenu from "../../Auth/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<span>🔖</span>
            <h1>Coupon System</h1>
            <span>🔖</span>
            <AuthMenu/>
        </div>
    );
}

export default Header;
