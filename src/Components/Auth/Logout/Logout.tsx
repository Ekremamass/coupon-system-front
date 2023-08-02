import { useDispatch } from "react-redux";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLoggedOut } from "../../../Redux/AuthAppState";
import { removedCompaniesAction } from "../../../Redux/CompanyAppState";

function Logout(): JSX.Element {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userLoggedOut());
        dispatch(removedCompaniesAction());
        navigate("/login");
    }, []);
    return (
        <></>
    );
}

export default Logout;