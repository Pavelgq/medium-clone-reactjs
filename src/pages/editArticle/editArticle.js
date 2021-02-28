import React, { useEffect, useContext, useState } from 'react'

import useFetch from '@hooks/useFetch'

import {CurrentUserContext} from '@contexts/currentUser';
import { Redirect } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

const editArticle = ({match}) => {
    const {slug} = match.params
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [
        {
            response: updateArticleResponse, 
            error: updateArticleError
        }, doUpdateArticle
    ] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)

    const [initialValues, setInitialValues] = useState(null)
    const [isSuccesfullSubmit, setIsSuccesfullSubmit] = useState(false)
    const handleSubmit = (article) => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }
        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList,
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }
        setIsSuccesfullSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to="/" />
    }
    if (isSuccesfullSubmit) {
        return <Redirect to={`/articles/${slug}`} />
    }

    return (
      <div>
        <ArticleForm 
          errors={(updateArticleError && updateArticleError.errors) || {}} 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
        />
      </div>
    )
}

export default editArticle