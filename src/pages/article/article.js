import React, {useContext, useEffect, useState} from 'react'

import useFetch from '@hooks/useFetch'
import { Link, Redirect } from 'react-router-dom'

import Loading from '@components/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import TagList from '@components/TagList/TagList';
import {CurrentUserContext} from '@contexts/currentUser'

const Articles = ({match}) => {
    const {slug} = match.params
    const apiUrl = `/articles/${slug}`
    const [{
            response: fetchArticleResponse, 
            isLoading: fetchArticleIsLoading, 
            error: fetchArticleError
        }, doFetch] = useFetch(apiUrl)
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)
    const [isSuccesfullDelete, setIsSuccesfullDelete] = useState(false)

    const isAuthor = () => {
        if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
            return false
        }
        return (
            fetchArticleResponse.article.author.username === currentUserState.currentUser.username
            )
    }

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete'
        })
    }

    useEffect(() => {
        doFetch()
    }, [doFetch])
    
    useEffect(() => {
        if (!deleteArticleResponse) {
            return
        }
        setIsSuccesfullDelete(true)
    }, [deleteArticleResponse])

    if (isSuccesfullDelete) {
        return <Redirect to='/' />
    }

    return (
      <div className='article'>
        <div className='article__bunner'>
          {fetchArticleIsLoading && <Loading />}
          {fetchArticleError && <ErrorMessage />}
          {!fetchArticleIsLoading && fetchArticleResponse && (
            <div className='container'>
              <h1>{fetchArticleResponse.article.title}</h1>
              <div className='article__meta'>
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  <img 
                    className='avatar__img' 
                    src={fetchArticleResponse.article.author.image} 
                    alt='avatar'
                  />
                </Link>
                <span className='article__date'>{fetchArticleResponse.article.createdAt}</span>
              </div>
              {isAuthor() && (
              <span>
                <Link 
                  className='button' 
                  to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                >
                  Edit
                </Link>
                <button type='submit' className='' onClick={deleteArticle}>Delete</button>
              </span>
                        )}
            </div>
                )}
        </div>
        <div className='container'>
          {fetchArticleIsLoading && <Loading />}
          {fetchArticleError && <ErrorMessage />}
          {!fetchArticleIsLoading && fetchArticleResponse && (
            <div className=''>
              <div className=''>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
                )}
        </div>

      </div>
    )
}

export default Articles;