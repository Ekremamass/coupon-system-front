import React, { useState } from "react";
import RegisterCompany from "../RegisterCompany/RegisterCompany";
import RegisterCustomer from "../RegisterCustomer/RegisterCustomer";
import "./Register.css";

function Register(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState("COMPANY");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="Register">
      <select value={selectedOption} onChange={handleChange}>
        <option value="COMPANY">Company</option>
        <option value="CUSTOMER">Customer</option>
      </select>
      {selectedOption === "COMPANY" ? <RegisterCompany /> : <RegisterCustomer />}
    </div>
  );
}

export default Register;
