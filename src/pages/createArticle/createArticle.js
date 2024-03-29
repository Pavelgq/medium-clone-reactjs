import React, {useState, useEffect, useContext} from 'react'
import { Redirect } from 'react-router-dom';
import useFetch from '@hooks/useFetch';

import {CurrentUserContext} from '@contexts/currentUser';

import ArticleForm from '../../components/ArticleForm/ArticleForm';


const createArticle = () => {
    const apiUrl = '/articles'
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)
    const initialValues = {
        title: '',
        body: '',
        description: '',
        tagList: [],
    }
    const [isSuccesfullSubmit, setIsSuccesfullSubmit] = useState(false)
    const handleSubmit = (article) => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setIsSuccesfullSubmit(true)
    }, [response])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to="/" />
    }
    if (isSuccesfullSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`} />
    }

    return (
      <div>
        <ArticleForm 
          errors={(error && error.errors) || {}} 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
        />
      </div>
    )
}

export default createArticle