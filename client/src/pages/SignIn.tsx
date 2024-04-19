import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';
const storedUserId = localStorage.getItem("userIdArray") ? new Set(JSON.parse(localStorage.getItem("userIdArray"))) : new Set();
const storedNgoId = localStorage.getItem("ngoIdArray") ? new Set(JSON.parse(localStorage.getItem("ngoIdArray"))) : new Set();
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [userIdArray, setUserIdArray] = useState(Array.from(storedUserId));
const [ngoIdArray, setNgoIdArray] = useState(Array.from(storedNgoId));
  // const { loading, error } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();

      if (data.rest.role === "user") {
        storedUserId.add(data.rest._id);
        const updatedUserIdArray = Array.from(storedUserId);
        setUserIdArray(updatedUserIdArray);
        localStorage.setItem("userIdArray", JSON.stringify(updatedUserIdArray));
        localStorage.setItem("userId", JSON.stringify(data.rest._id));
      } else {
        storedNgoId.add(data.rest._id);
        const updatedNgoIdArray = Array.from(storedNgoId);
        setNgoIdArray(updatedNgoIdArray);
        localStorage.setItem("ngoIdArray", JSON.stringify(updatedNgoIdArray));
        localStorage.setItem("ngoId", JSON.stringify(data.rest._id));
      }
      if (data.success === false) {
        setError(data.messsage)
        return;
      }
  
      setLoading(false);
      setError(null);
  
      if (data.rest.role === 'user') {
        navigate('/user');
      } else if (data.rest.role === 'ngo') {
        navigate('/ngo');
      } else {
        navigate('/');
      }
  
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? "Loading..." : 'Sign In'}
        </button>
        {/* <OAuth/> */}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}