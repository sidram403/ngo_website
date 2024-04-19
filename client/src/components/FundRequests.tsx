import React, { useEffect, useState } from "react";

const FundRequests = ({  onSendAmount }) => {
  const [fundRequests, setFundRequests] = useState([]);
  const [ngoDetails, setNgoDetails] = useState([]);

  useEffect(() => {
    // Fetch organizationName values from the backend
    const fetchFundRequests = async () => {
      try {
        const res = await fetch("/server/user/getFundRequests", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setFundRequests(data.fundRaiseDetails);
        setNgoDetails(data.ngoDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFundRequests();
  }, []);
  return (
    <div className="mb-8 py-32 px-32">
      <h2 className="text-xl font-semibold mb-4">Fund Requested</h2>
      {fundRequests.map((fund, index) => (
        <ul>
          <li key={index} className="mb-2">
            {fund.fundreason} - {fund.amount} requested by{" "}
            {ngoDetails[index].organizationName}
            <button
              onClick={() => onSendAmount(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
            >
              Send Amount
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default FundRequests;
