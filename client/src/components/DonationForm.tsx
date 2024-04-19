import React, { useEffect, useState } from 'react'




// Parse storedUserId back to a JavaScript object

const DonationForm = ({ onSubmit, ngos }) => {
    const [donationForm, setDonationForm] = useState({ item: '', quantity: '', date: '', selectedNGO: '', user: ""});
    const [error, setError] = useState(null);
    
   useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    setDonationForm({ ...donationForm, user: JSON.parse(storedUserId) })
   },[])
  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {
      let storedUserId = localStorage.getItem("userId");
      setDonationForm({ ...donationForm, user: JSON.parse(storedUserId) })
      const res = await fetch("/server/form/setDonation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationForm),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      
      
      setError(null);
      setDonationForm({ item: '', quantity: '', date: '', selectedNGO: '', user:JSON.parse(storedUserId) } );
    } catch (error) {
      setError(error.message);
    }
    
  };
  return (
    <div className="mb-8 py-32 px-32">
        <h2 className="text-xl font-semibold mb-4">Donation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Item</label>
            <input
              type="text"
              value={donationForm.item}
              
              onChange={(e) => setDonationForm({ ...donationForm, item: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Quantity</label>
            <input
              type="text"
              value={donationForm.quantity}
              onChange={(e) => setDonationForm({ ...donationForm, quantity: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              value={donationForm.date}
              onChange={(e) => setDonationForm({ ...donationForm, date: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">NGO</label>
            <select
              value={donationForm.selectedNGO}
              onChange={(e) => setDonationForm({ ...donationForm, selectedNGO: e.target.value })}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select NGO</option>
              {ngos.map((ngo, index) => (
                <option key={index} value={ngo._id}>
                  {ngo.organizationName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit Donation
          </button>
        </form>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
  )
}

export default DonationForm