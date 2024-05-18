import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageContext from '../../HandleData/ImageContext';
import { RiMenuFoldFill, RiMenuFold2Fill } from "react-icons/ri";
import { useRecoilState } from 'recoil';
import { NavActiveState } from '../../HandleData/atoms';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

function NavBar() {
  const navlogo = useContext(ImageContext);
  const [isNavActive, setIsNavActive] = useRecoilState(NavActiveState);
  const [firstClick, setFirstClick] = useState(true);

  function handleNavActive() {
    setIsNavActive(!isNavActive);
    if (firstClick) {
      setFirstClick(false);
    }
  }

  useEffect(()=>{
    if (!firstClick) {
    navanimate();
    }

  },[firstClick])


  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.navbar', { y: -100 }, { y: 0 });
    tl.fromTo('.navimg', { y: -1000, opacity: 0 }, { y: 0, opacity: 1 });
    tl.fromTo('.menu', { x: 100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.5 });
    tl.fromTo('.navelements', { x: -100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.5 });
  }, []);

  function navanimate() {
    const tl = gsap.timeline();
    tl.fromTo('.mobilenav', { x: -100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.5 });
  }

  return (
    <div className='navbar z-40 absolute bg-white h-[7vh] w-full font-mateSc text-black'>
      <div className='h-full w-full flex'>
        <div className='navimg h-full xs:w-[20vh] flex justify-center items-center font-bold'>
          <img className='h-[7vh] w-auto' src={navlogo} alt="Nav Logo" />
          <h1>PGHT</h1>
        </div>
        <div className='hidden lg:flex font-bold gap-10 text-black flex w-full h-full justify-end mr-[20vh] items-center rounded-xl'>
          <Link className='navelements' to='homepage'>Home</Link>
          <Link className='navelements' to='addhabits'>Add Habits</Link>
          <Link className='navelements' to='myhabits'>My Habits</Link>
          <Link className='navelements' to='bmi'>BMI</Link>
          <Link className='navelements' to='profile'>Profile</Link>
        </div>
        <div className='menu xs:w-full lg:w-[10vh] h-full flex justify-end items-center p-2 lg:hidden' onClick={handleNavActive}>
          {isNavActive ? <RiMenuFold2Fill size={35} /> : <RiMenuFoldFill size={35} />}
        </div>
      </div>
      {isNavActive &&
        <div className='z-40 absolute bg-white h-fit p-4 w-full flex flex-col font-bold gap-4 lg:hidden shadow-xl'>
          <Link className='mobilenav' onClick={handleNavActive} to='homepage'>Home</Link>
          <Link className='mobilenav' onClick={handleNavActive} to='addhabits'>Add Habits</Link>
          <Link className='mobilenav' onClick={handleNavActive} to='myhabits'>My Habits</Link>
          <Link className='mobilenav' onClick={handleNavActive} to='bmi'>BMI</Link>
          <Link className='mobilenav' onClick={handleNavActive} to='profile'>Profile</Link>
        </div>
      }
    </div>
  );
}

export default NavBar;
