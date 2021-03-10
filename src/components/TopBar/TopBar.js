import React, {useContext, Fragment} from 'react'

import { NavLink, Link } from 'react-router-dom'

import {CurrentUserContext} from '@contexts/currentUser';
import styles from './TopBar.module.scss';

const TopBar = () => {
    const [currentUserState] = useContext(CurrentUserContext)
    return (
      <nav className={styles.nav}>
        <div className="container">
          <Link className={styles.logo} to='/'>Medium</Link>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink 
                to='/' 
                className={styles.link} 
                activeClassName={styles.active}
                exact
              >
                Home
              </NavLink>
            </li>

            {currentUserState.isLoggedIn === false && (
            <>
              <li className="list__item item">
                <NavLink 
                  to='/login'
                  className={styles.link}
                  activeClassName={styles.active}
                >
                  Sign in
                </NavLink>
              </li>
              <li className="list__item item">
                <NavLink 
                  to='/register'
                  className={styles.link}
                  activeClassName={styles.active}
                >
                  Sign up
                </NavLink>
              </li>
            </>
                    )}
            {currentUserState.isLoggedIn && (
            <>
              <li className={styles.item}>
                <NavLink to='/article/new' className={styles.link}>
                  <ion-icon name="create-outline" />
                                    &nbsp;New post
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink to='/settings' className={styles.link}>
                  <ion-icon name="settings-outline" />
                                    &nbsp;Settings
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink 
                  to={`/profiles/${currentUserState.currentUser.username}`} 
                  className={styles.link}
                >
                  <div className={styles.avatar}>
                    <img 
                      className={styles.image}
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