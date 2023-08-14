import React, { useState } from "react";
import RegisterCompany from "../RegisterCompany/RegisterCompany";
import RegisterCustomer from "../RegisterCustomer/RegisterCustomer";
import "./Register.css";
import { useTranslation } from "react-i18next";

function Register(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState("COMPANY");
  const {t} = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="Register">
      <select value={selectedOption} onChange={handleChange}>
        <option value="COMPANY">{t('company', { ns: 'login' })}</option>
        <option value="CUSTOMER">{t('customer', { ns: 'login' })}</option>
      </select>
      {selectedOption === "COMPANY" ? <RegisterCompany /> : <RegisterCustomer />}
    </div>
  );
}

export default Register;
