import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import {Link, useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const{logOut}= useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from=location.state?.from?.pathname || "/";
    const handleLogout=()=>{
        logOut().then(()=>{
            alert('Sign-out successful !!');
            navigate(from,{replace:true})
        }).catch((error)=>{

        })
    }
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
        {/* <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>Logout</button> */}
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <p class="flex justify-center mb-3 font-normal dark:text-gray-400 text-red-700 text-bold">Are you sure want to Log Out ?</p>
    <div className='flex justify-center lg:justify-start gap-4 mb-5 mt-8'>
          <button
            onClick={handleLogout}
            className='bg-green-700 text-white font-semibold px-5 py-2 rounded w-40 lg:w-40 hover:bg-black transition-all duration-300'
          >
            Yes
          </button>

          <Link to='/admin/dashboard'>
            <button className='bg-green-700 text-white font-semibold px-5 py-2 rounded w-40 lg:w-40 hover:bg-black transition-all duration-300'>
              No
            </button>
          </Link>
        </div>
</div>
    </div>
  )
}

export default Logout