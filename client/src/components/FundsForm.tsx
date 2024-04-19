import React, { useState } from 'react'

const FundsForm = ({onSubmit, ngos}) => {
    const [funds, setFunds] = useState({ name: '', amount: '', dateTime: '', selectedNGO: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(funds);
    setFunds({ name: '', amount: '', dateTime: '', selectedNGO: '' });
  };
  return (
    <div className="mb-8 py-32 px-32">
        <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={funds.name}
          onChange={(e) => setFunds({ ...funds, name: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Amount</label>
        <input
          type="text"
          value={funds.amount}
          onChange={(e) => setFunds({ ...funds, amount: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Date and Time</label>
        <input
          type="datetime-local"
          value={funds.dateTime}
          onChange={(e) => setFunds({ ...funds, dateTime: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">NGO</label>
        <select
          value={funds.selectedNGO}
          onChange={(e) => setFunds({ ...funds, selectedNGO: e.target.value })}
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
        Submit Funds
      </button>
    </form>
    </div>

  )
}

export default FundsForm