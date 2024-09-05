import React, { useEffect, useState } from 'react';
import './LoadingIcon.css';

const LoadingIcon = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000)
    };

    fakeDataFetch();
  }, []);

  return isLoading ? <LoadingIcon /> :

  <div className="loading-container">
    <svg className="loading-svg" version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="100" height="100" viewBox="0 0 500.000000 500.000000"
         preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
         fill="#000000" stroke="none">
        <circle cx="250" cy="250" r="50" fill="#000" />
      </g>
    </svg>
  </div>
};

export default LoadingIcon;