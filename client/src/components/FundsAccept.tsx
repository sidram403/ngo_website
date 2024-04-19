import React, { useEffect, useState } from 'react'

const FundsAccept = ({onSubmit}) => {
  const [userDetails, setUserDetails] = useState([]);
  const [fundDetails, setFundDetails] = useState([]);
  useEffect(() => {
    // Fetch organizationName values from the backend

    const fetchOrganizationNames = async () => {
      const storedNgoId = localStorage.getItem("ngoId");
      const storedUserId = localStorage.getItem("userIdArray");
      const requestData = {
        // userId: JSON.parse(storedUserId),
        ngoId: JSON.parse(storedNgoId),
      };
      try {
        const res = await fetch("/server/ngo/getFunds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        const data = await res.json();
        setUserDetails(data.userDetails);
        setFundDetails(data.fundDetails);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganizationNames();
  }, []);
  return (
    <div className="py-32 px-32">
    {userDetails.map((user, index) => (
      <div key={index} className="py-8 px-32">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            You have Fund form request from user "{`${user.fullname}`}"
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Form details
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                User Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.fullname}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {fundDetails[index].name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Amount
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {fundDetails[index].amount}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date and Time
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {fundDetails[index].date}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex mt-8 items-center justify-center gap-8">
          <button className="bg-green-500 text-white px-6 py-2 rounded-md ">
            Accept
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    ))}
    {userDetails.length === 0 && (
      <div>You don't have any donation form request from user</div>
    )}
  </div>
  )
}

export default FundsAccept