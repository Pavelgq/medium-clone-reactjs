import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';

import useFetch from '@hooks/useFetch';
import useLocalStorage from '@hooks/useLocalStorage';
import {CurrentUserContext} from '@contexts/currentUser';
import BackendErrorMessages from '@components/BackendErrorMessages/BackendErrorMessages';


const Settings = () => {
    const [currentUserState, dispatch] = useContext(CurrentUserContext)
    const apiUrl = '/user'
    const [{response, error}, doFetch] = useFetch(apiUrl)

    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSuccesfullLogout, setIsSuccesfullLogout] = useState(false)
    const [, setToken] = useLocalStorage('token')

    

    const handleSubmit = (event) => {
        event.preventDefault()
        doFetch({
            method: 'put',
            data: {
                user: {
                    ...currentUserState.currentUser,
                    image,
                    username,
                    email,
                    bio,
                    password,
                }
            }
        })
    }

    const logout = (event) => {
        event.preventDefault()
        setToken('')
        dispatch({type:'LOGOUT'})
        setIsSuccesfullLogout(true)
    }

    useEffect(() => {
        if (!currentUserState.currentUser) {
            return
        }
        setImage(currentUserState.currentUser.image)
        setUsername(currentUserState.currentUser.username)
        setBio(currentUserState.currentUser.bio)
        setEmail(currentUserState.currentUser.email)
    }, [currentUserState.currentUser])

    useEffect(() => {
        if (!response) {
            return 
        }
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    }, [response, dispatch])

    if (isSuccesfullLogout) {
        return <Redirect to='/' />
    }
    
    return (
      <div className=''>
        <div className='container'>
          <h1 className=''>Your settings</h1>
          {error && <BackendErrorMessages backendErrors={error.errors} />}
          <form onSubmit={handleSubmit}>
            <fieldset className=''>
              <input 
                type='text' 
                className='' 
                placeholder='Url of profile picture'
                value={image}
                onChange={e => setImage(e.target.value)}
              />
              <input 
                type='text' 
                className='' 
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <textarea 
                className=''
                rows='8'
                placeholder='Short bio'
                value={bio}
                onChange={e => setBio(e.target.value)}
              />
              <input 
                type='text' 
                className='' 
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input 
                type='password' 
                className='' 
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </fieldset>
            <button type='submit' className=''>Update settings</button>
          </form>
          <hr />
          <button type='submit' className='btn btn-outline-danger' onClick={logout}>Log Out</button>
        </div>
      </div>
    )
}

export default Settings