import React, { useState } from 'react'

const FundRaise = ({onSubmit}) => {
  const [fundRaiseForm, setFundRaiseForm] = useState({ fundName: '', amount: '', reason: '', ngo: '', });
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {

    e.preventDefault();
  }
  return (
    <div className="mb-8 py-32 px-32">
      <h2 className="text-xl font-semibold mb-4">Raise a Fund Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Fund Name
          </label>
          <input
            type="text"
            value={fundRaiseForm.fundName}
            onChange={(e) =>
              setFundRaiseForm({ ...fundRaiseForm, fundName: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Fund Amount
          </label>
          <input
            type="text"
            value={fundRaiseForm.amount}
            onChange={(e) => setFundRaiseForm({ ...fundRaiseForm, amount: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Fund Reason
          </label>
          <input
            type="text"
            value={fundRaiseForm.reason}
            onChange={(e) =>
              setFundRaiseForm({ ...fundRaiseForm, reason: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Fund Request
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      
    </div>
  )
}

export default FundRaise