import React from 'react'

const SkyModal = () => {
  return (
    <div>
       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5"></path>
                </svg>
            </div>
    </div>
  )
}

export default SkyModal
