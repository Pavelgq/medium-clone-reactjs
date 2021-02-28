import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'

import {CurrentUserContext} from '@contexts/currentUser';
import './FeedToggler.css'

const FeedToggler = ({tagName = ''}) => {
    const [currentUserState] = useContext(CurrentUserContext)
    return (
      <div className="feed-toggle">
        <ul className="feed-toggle__list"> 
          {currentUserState.isLoggedIn && (
          <li className="feed-toggle__item">
            <NavLink to='/feed' className="feed-toggle__link">Your feed</NavLink>
          </li>
)}
          <li className="feed-toggle__item">
            <NavLink to='/' className="feed-toggle__link" exact>Global feed</NavLink>
          </li>
          {tagName && (
            <li className="feed-toggle__item">
              <NavLink to={`/tags/${tagName}`} className="feed-toggle__link">
                #
                {tagName}
              </NavLink>
            </li>
                )}
        </ul>
      </div>
    )
}

export default FeedToggler