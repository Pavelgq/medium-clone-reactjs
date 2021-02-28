import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

import useFetch from '@hooks/useFetch';

import UserArticles from '@pages/userProfile/components/UserArticles/UserArticles';

const UserProfile = ({match, location}) => {
    
    const {slug} = match.params
    const isFavorites = location.pathname.includes('favorites')
    const apiUrl = `/profiles/${slug}`
    const [{response}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch])
    console.log('я тут',response)
    if (!response) {
        return null
    }

    return  (
      <div className='profile-page user'>
        <div className='user__info'>
          <div className='container'>
            <img className='user__avatar' alt='user avatar' src={response.profile.image} />
            <h4>{response.profile.userName}</h4>
            <p>{response.profile.bio}</p>
          </div>
        </div>
        <div className='container articles'>
          <ul className='articles__toggle'>
            <li className='articles__item'>
              <NavLink 
                className='articles__link' 
                to={`/profiles/${response.profile.username}`}
                exact
              >
                My posts
              </NavLink>
              <NavLink 
                className='articles__link' 
                to={`/profiles/${response.profile.username}/favorites`}
              >
                Favorite posts
              </NavLink>
            </li>
          </ul>
        </div>
        <UserArticles 
          username={response.profile.username} 
          location={location} 
          isFavorites={isFavorites}
          url={match.url}
        />
      </div>
    )
}

export default UserProfile