import React from "react"

export default function Loader () {
    return(
        <div className="img-loader-bg">
            <img  className='img-loader' style={{width:70,height:70}} src='./images/icon-4.png' alt='Loading...'></img>
        </div>
    )
}