import React, { useEffect, useState } from "react";

const ServicesForm = ({onSubmit, ngos}) => {
    const [serviceForm, setServiceForm] = useState({ service: '', date: '', duration: '', selectedNGO: '', user:'' });
    const [error, setError] = useState(null);

    useEffect(() => {
      let storedUserId = localStorage.getItem("userId");
      setServiceForm({ ...serviceForm, user: JSON.parse(storedUserId) })
     },[])

    const handleSubmit = async (e) => {

      e.preventDefault();
      
      try {
        let storedUserId = localStorage.getItem("userId");
        setServiceForm({ ...serviceForm, user: JSON.parse(storedUserId) })
        const res = await fetch("/server/form/setServices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceForm),
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        
        
        setError(null);
        setServiceForm({ service: '', date: '', duration: '', selectedNGO: '', user:JSON.parse(storedUserId) } );
      } catch (error) {
        setError(error.message);
      }
      
    };
      
  return (
    <div className="mb-8 py-32 px-32">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Service
          </label>
          <input
            type="text"
            value={serviceForm.service}
            onChange={(e) =>
              setServiceForm({ ...serviceForm, service: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Date
          </label>
          <input
            type="date"
            value={serviceForm.date}
            onChange={(e) => setServiceForm({ ...serviceForm, date: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Duration
          </label>
          <input
            type="text"
            value={serviceForm.duration}
            onChange={(e) =>
              setServiceForm({ ...serviceForm, duration: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">NGO</label>
          <select
            value={serviceForm.selectedNGO}
            onChange={(e) =>
              setServiceForm({ ...serviceForm, selectedNGO: e.target.value })
            }
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Service
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      
    </div>
  );
};

export default ServicesForm;
