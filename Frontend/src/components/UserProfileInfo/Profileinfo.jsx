import React, { useState, useRef, useEffect } from 'react'
import { getInitials } from '../../utils/helper'
import { LogOut, ChevronDown } from 'lucide-react'

const Profileinfo = ({ onLogout }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative mr-2' ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-150 group'
      >
        <div className='relative'>
          <div className='w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-semibold text-sm ring-2 ring-white shadow-sm'>
            {getInitials("Admin Tester")}
          </div>
          <span className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white' />
        </div>

        <div className='flex flex-col items-start leading-tight'>
          <p className='text-sm font-semibold text-gray-900'>Vikas Yadav</p>
          <p className='text-xs text-gray-400'>Admin</p>
        </div>

        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150'>
          <button
            onClick={onLogout}
            className='w-full flex items-center gap-2 px-3.5 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors'
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Profileinfo