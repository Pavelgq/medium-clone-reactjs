import React from 'react'
import { Link } from 'react-router-dom'

import TagList from '@components/TagList/TagList';
import AddToFavorite from '@components/AddToFavorite/AddToFavorite';
import styles from './Feed.module.css'

const Feed = ({articles}) => (
  <div className={styles.article}>
    {articles.map((article, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className={styles.preview} key={index}>
        <div className={styles.meta}>
          <div className='container'>
            <Link to={`/profiles/${article.author.username}`} className={styles.link}>
              <div className={styles.avatar}>
                <img 
                  src={article.author.image} 
                  alt="author avatar"
                  className={styles.image}
                />
              </div>
            </Link>
            <div className={styles.info}>
              <Link 
                to={`/profiles/${article.author.username}`}
                className={styles.link}
              >
                {article.author.username}
              </Link>
              <span className={styles.data}>{article.createdAt}</span>
            </div>
          </div>
          <div className={styles.like}>
            <AddToFavorite 
              isFavorite={article.favorited}
              favoritesCount={article.favoritesCount}
              articleSlug={article.slug}
            />
          </div>
        </div>
        <Link to={`/articles/${article.slug}`} className={styles.link}>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
          <span className={styles.more}>Read more...</span>
          <TagList tags={article.tagList} />
        </Link>
      </div>
))}
  </div>
    )

export default Feed