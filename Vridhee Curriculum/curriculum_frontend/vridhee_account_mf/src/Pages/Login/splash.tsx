import React, { useEffect } from 'react'

const Splash = ({ onSplashComplete }: any) => {

  useEffect(() => {
    // Simulate a delay before transitioning to the landing screen
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);


  return (
    <div className='splashscreen' style={{ backgroundImage: `url('https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/image_2023_11_06T10_06_38_671Z.png')` }}>
      <img src='https://v3c.s3.ap-south-1.amazonaws.com/webappimages/assets/img/Group+240259.svg' alt='' />
    </div>

  )

}

export default Splash



