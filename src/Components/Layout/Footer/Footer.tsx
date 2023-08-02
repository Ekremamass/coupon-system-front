import Copyrights from "../../Shared/Copyrights/Copyrights";
import FollowUs from "../../Shared/FollowUs/FollowUs";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<Copyrights/>
            <FollowUs/>
        </div>
    );
}

export default Footer;
