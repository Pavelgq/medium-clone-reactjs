import React, {useContext, Fragment} from 'react'

import { NavLink, Link } from 'react-router-dom'

import {CurrentUserContext} from '@contexts/currentUser';
import './TopBar.css';

const TopBar = () => {
    const [currentUserState] = useContext(CurrentUserContext)
    console.log(currentUserState)
    return (
      <nav className="nav">
        <div className="container">
          <Link className='nav__logo' to='/'>Medium</Link>
          <ul className="nav__list list">
            <li className="list__item item">
              <NavLink to='/' className='item__link' exact>Home</NavLink>
            </li>

            {currentUserState.isLoggedIn === false && (
            <>
              <li className="list__item item">
                <NavLink to='/login' className='item__link'>Sign in</NavLink>
              </li>
              <li className="list__item item">
                <NavLink to='/register' className='item__link'>Sign up</NavLink>
              </li>
            </>
                    )}

            {currentUserState.isLoggedIn && (
            <>
              <li className="list__item item">
                <NavLink to='/article/new' className='item__link'>
                  <ion-icon name="create-outline" />
                                    &nbsp;New post
                </NavLink>
              </li>
              <li className="list__item item">
                <NavLink to='/settings' className='item__link'>
                  <ion-icon name="settings-outline" />
                                    &nbsp;Settings
                </NavLink>
              </li>
              <li className="list__item item">
                <NavLink 
                  to={`/profiles/${currentUserState.currentUser.username}`} 
                  className="item__link"
                >
                  <div className='item__avatar avatar'>
                    <img 
                      className="avatar__img" 
                      src={currentUserState.currentUser.image 
                        || 'https://static.productionready.io/images/smiley-cyrus.jpg'} 
                      alt='user avatar'
                    />
                  </div>
                  {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
                    )}
          </ul>
        </div>
      </nav>
    )
}

export default TopBar;