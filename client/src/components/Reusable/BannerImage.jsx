import React from 'react'

function BannerImage(props) {
  return (
    <div>
      <img src={props.src} alt="" className="absolute h-full w-full object-cover"/>
      <div className="inset-0 bg-black opacity-25 absolute"></div>
    </div>
  )
}

export default BannerImage