import React, { useEffect, useState } from "react";
import DonationForm from "../components/DonationForm";
import ServicesForm from "../components/ServicesForm";
import FundsForm from "../components/FundsForm";
import FundRequests from "../components/FundRequests";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import Navbar from "../components/Navbar";


const sampleRequests = [
    { name: 'Emergency Relief', amount: '$500', ngo: 'NGO 1' },
    { name: 'Education Program', amount: '$1000', ngo: 'NGO 2' },
    { name: 'Medical Supplies', amount: '$750', ngo: 'NGO 3' },
  ];

const UserPage = () => {
  const [userId, setUserId] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const [activeSection, setActiveSection] = useState("donation");
  const [requestedFunds, setRequestedFunds] = useState([]);

  const handleDonationSubmit = (donation) => {
    console.log("Donation:", donation);
  };

  
  
  const handleServiceSubmit = (service) => {
    console.log("Service:", service);
  };

  const handleFundsSubmit = (funds) => {
    console.log("Funds:", funds);
  };

  const handleFundRequest = (index) => {
    console.log("Fund requested:", requestedFunds[index]);
  };

  

  useEffect(() => {
    // Fetch organizationName values from the backend
    const fetchData = async () =>{
      try {
        const res = await fetch("/server/ngo/getOrganizationNames", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setOrganizations(data)
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchData()
    
  }, []);
  
  return (
    <div className="bg-white ">
      <Navbar setActiveSection={setActiveSection} />
      {/* <Hero /> */}
      {activeSection === "donation" && (
        <DonationForm ngos={organizations} onSubmit={handleDonationSubmit} />
      )}
      {activeSection === "services" && (
        <ServicesForm ngos={organizations} onSubmit={handleServiceSubmit} />
      )}
      {activeSection === "funds" && <FundsForm ngos={organizations} onSubmit={handleFundsSubmit} />}
      {activeSection === "fundRequests" && (
        <FundRequests
          
          onSendAmount={handleFundRequest}
        />
      )}
    </div>
  );
};

export default UserPage;
