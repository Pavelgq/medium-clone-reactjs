import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import useFetch from '@hooks/useFetch';

import Loading from '@components/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import './PopularTags.css'

const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags')

    useEffect(() => {
        doFetch()
    }, [doFetch])

    if (isLoading || !response) {
        return <Loading />
    }
    console.log(response)
    if (error) {
        return <ErrorMessage />
    }

    return (
      <div className='tags'>
        <p className='tags__title'>Popular Tags</p>
        <div className='tags__list'>
          {response.tags.map((tag) => (
            <Link 
              to={`/tag/${tag}`} 
              className='tags__link' 
              key={tag}
            >
              {tag}
            </Link>
        )
        )}
        </div>
      </div>
    )
}

export default PopularTags