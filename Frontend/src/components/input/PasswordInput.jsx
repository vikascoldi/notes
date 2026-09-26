import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({value,onChange,placeholder}) => {
    const [isShowPass,setIsshowPass] = useState(false);

    const toggleShowpass= () =>{
        setIsshowPass(!isShowPass);
    }
  return (
    <div className='flex items-center bg-transparent border-b border-gray-400 rounded px-3 mb-3'>
      <input type={isShowPass ? "text":"password"} placeholder={placeholder || "Password"} onChange={onChange} value={value}  className={`w-full text-lg bg-transparent py-3  mr-3  outline-none rounded  ${value ? "bg-blue-100" : "bg-transparent"}`}  />
       <button  type='button' onClick={()=>toggleShowpass()}  className='cursor-pointer' > {isShowPass ?  <FiEye className='text-gray-400' size={18} /> :<FiEyeOff size={18} className='text-gray-400'  />} </button>
    </div>
  )
}

export default PasswordInput
