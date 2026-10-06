import React, { useState, useRef, useEffect } from 'react'
import { getInitials } from '../../utils/helper'
import { LogOut, ChevronDown } from 'lucide-react'

const Profileinfo = ({ onLogout }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null);
  const userName = "Vikas Yadav"

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative shrink-0' ref={ref}>
      <button
        type='button'
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className='group flex cursor-pointer items-center gap-2.5 rounded-xl p-1 hover:bg-slate-100 md:py-1.5 md:pl-1.5 md:pr-2.5'
      >
        <div className='relative'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-sm ring-2 ring-white'>
            {getInitials(userName)}
          </div>
          <span className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white' />
        </div>

        <div className='hidden flex-col items-start leading-tight sm:flex'>
          <p className='text-sm font-semibold text-slate-900'>{userName}</p>
          <p className='text-xs text-slate-500'>Admin</p>
        </div>

        <ChevronDown
          size={16}
          className={`hidden text-slate-400 transition-transform duration-200 sm:block ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role='menu'
          className='absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg shadow-slate-200/70'
        >
          <button
            type='button'
            role='menuitem'
            onClick={onLogout}
            className='flex w-full cursor-pointer items-center gap-2 px-3.5 py-2 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600'
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