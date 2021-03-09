import React, {useState, useEffect, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';

import useFetch from '@hooks/useFetch';
import useLocalStorage from '@hooks/useLocalStorage';

import {CurrentUserContext} from '@contexts/currentUser';
import BackendErrorMessages from '@components/BackendErrorMessages/BackendErrorMessages';


import styles from './authentication.module.scss'

const Authentication = ({match}) => {
    const isLogin = match.path === '/login'
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLogin ? '/user/login' : '/users'
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [username, setUsername] = useState('')
    const [isSuccesSubmit, setIsSuccesSubmit] = useState(false)
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const [, setToken] = useLocalStorage('token')
    const [, dispatch] = useContext(CurrentUserContext)
    const handleSubmit = (event) => {
        event.preventDefault()
        const user = isLogin ? {email, password} : {email, password, username}
        doFetch({
            method: 'POST',
            data: {
                user
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return 
        }
        setToken(response.user.token)
        setIsSuccesSubmit(true)
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    }, [response, setToken, dispatch])

    if (isSuccesSubmit) {
        return <Redirect to='/' />
    }

    return (
      <div className={styles.authPage}>
        <div className="container--col">
          <h2 className={styles.title}>{pageTitle}</h2>
          <p className={styles.question}>
            <Link 
              className={styles.questionLink}
              to={descriptionLink}
            >
              {descriptionText}
            </Link>
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <fieldset className={styles.field}>
              {!isLogin && (
                <fieldset className={styles.field}>
                  <input 
                    className={styles.inputText} 
                    type="text" 
                    placeholder="Name" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>
                        )}
              <fieldset className={styles.field}>
                <input 
                  className={styles.inputText} 
                  type="email" 
                  placeholder="E-mail" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className={styles.field}>
                <input 
                  className={styles.inputText} 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </fieldset>
              <button 
                type='submit'
                className={styles.button} 
                disabled={isLoading}
              >
                {pageTitle}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    )
}

export default Authentication