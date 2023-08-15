import { useDispatch } from "react-redux";
import "./DeleteCoupon.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function DeleteCoupon(): JSX.Element {
    const dispatch = useDispatch();
  const {t} = useTranslation();

  const params = useParams();
  const id = +(params.id || 0);

  const navigate = useNavigate();
  
    return (
        <div className="DeleteCoupon">
			
        </div>
    );
}

export default DeleteCoupon;
