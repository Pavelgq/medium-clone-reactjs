import React, {Fragment, useEffect} from 'react';
import {stringify} from 'query-string';

import useFetch from '@hooks/useFetch';

import FeedToggler from '@components/FeedToggler/FeedToggler';
import Feed from '@components/Feed/Feed';
import Pagination from '@components/Pagination/Pagination';
import PopularTags from '@components/PopularTags/PopularTags';
import Loading from '@components/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import {getPaginator, limit} from '~/utils';
import styles from './globalFeed.module.css';

const GlobalFeed = ({location, match}) => {
    const {offset, currentPage} = getPaginator(location.search)
    const stringifiedParam = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles?${stringifiedParam}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const {url} = match;
    useEffect(() => {
       doFetch()
    }, [doFetch, currentPage])
    return (
      <main className={styles.main}>
        <div className={styles.banner}>
          <div className='container--col'>
            <h1 className={styles.title}>Medium Clone</h1>
            <p className={styles.subTitle}>A place to share knowledge</p>
          </div>
        </div>
        <div className={styles.content}>
          <section className={styles.feeds}>
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
            <>
              <Feed articles={response.articles} />
              <Pagination 
                total={response.articlesCount} 
                limit={limit} 
                url={url} 
                currentPage={currentPage}
              />
            </>
                    )}
          </section>
          <aside className={styles.widgets}>
            <PopularTags />
          </aside>
        </div>
      </main>
    );
}

export default GlobalFeed