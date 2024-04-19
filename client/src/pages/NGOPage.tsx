import React, { useEffect, useState } from "react";

import DonationAccept from "../components/DonationAccept";
import ServicesAccept from "../components/ServicesAccept";
import FundsAccept from "../components/FundsAccept";
import FundRaise from "../components/FundRaise";
import Navbar from "../components/Navbar";



const NGOPage = () => {
  
  

  const [activeSection, setActiveSection] = useState("donation");

  const handleDonationSubmit = (donation) => {
    console.log("Donation:", donation);
  };

  const handleServiceSubmit = (service) => {
    console.log("Service:", service);
  };

  const handleFundsSubmit = (funds) => {
    console.log("Funds:", funds);
  };
  const handleFundRaiseSubmit = (fundRaise) => {
    console.log("fundRequest:", fundRaise);
  };

  
  

  return (
    <div className="bg-white ">
      <Navbar setActiveSection={setActiveSection} />
      {/* <Hero /> */}
      {activeSection === "donation" && (
        <DonationAccept onSubmit={handleDonationSubmit} />
        
      )}
      {activeSection === "services" && (
        <ServicesAccept  onSubmit={handleServiceSubmit} />
      )}
      {activeSection === "funds" && <FundsAccept  onSubmit={handleFundsSubmit} />}
      {activeSection === "fundRequests" && <FundRaise  onSubmit={handleFundRaiseSubmit} />}

    </div>
  );
};

export default NGOPage;
