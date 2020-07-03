import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import s from './MainNavigation.module.scss';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import Logo from '../UIElements/Logo';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isDrawerOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
        <nav className={s.navigationDrawerNav}>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          onClick={openDrawerHandler}
          className={s.navigationBtn}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to={routes.HOME} className={s.navigationHome}>
          <Logo width="50" height="48" />

          <h1 className={s.title}>YourPlaces</h1>
        </Link>

        <nav className={s.navigationHeaderNav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
