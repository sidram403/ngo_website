import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  role?: string;
  fullname?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  skills?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({role:"user"});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    if (e.target.id === "user" || e.target.id === "ngo") {
      setFormData({
        ...formData,
        role: e.target.id,
      });
    }
    if (
      e.target.type === "email" ||
      e.target.type === "text" ||
      e.target.type === "password" || 
      e.target.localName === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <div className="flex gap-4 py-4">
        <p>Signup as</p>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="user"
            className="w-5"
            onChange={handleChange}
            checked={formData.role === "user"}
          />
          <span>User</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="ngo"
            className="w-5"
            onChange={handleChange}
            checked={formData.role === "ngo"}
          />
          <span>NGO</span>
        </div>
      </div>

      {formData.role === "user" && (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Full Name'
          className='border p-3 rounded-lg'
          id='fullname'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
         <input
          type='text'
          placeholder='Phone Number'
          className='border p-3 rounded-lg'
          id='phone'
          onChange={handleChange}
        />
         <textarea
          
          placeholder='Address'
          className='border p-3 rounded-lg'
          id='address'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Interest/skills'
          className='border p-3 rounded-lg'
          id='skills'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      )}

      {formData.role === 'ngo' && (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Organization Name'
          className='border p-3 rounded-lg'
          id='organizationName'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Organization Number'
          className='border p-3 rounded-lg'
          id='organizationNumber'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
         <input
          type='text'
          placeholder='Phone Number'
          className='border p-3 rounded-lg'
          id='phone'
          onChange={handleChange}
        />
         <textarea
          
          placeholder='Address'
          className='border p-3 rounded-lg'
          id='address'
          onChange={handleChange}
        />
       <input
          type='text'
          placeholder='Mission Statement'
          className='border p-3 rounded-lg'
          id='mission'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      )}
      
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
