import React from 'react'
import { FadeLoader } from 'react-spinners'
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <FadeLoader color="#6cbe02"/>
    </div>
  )
}

export default Loader
