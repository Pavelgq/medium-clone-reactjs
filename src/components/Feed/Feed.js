import React from 'react'
import { Link } from 'react-router-dom'

import TagList from '@components/TagList/TagList';
import AddToFavorite from '@components/AddToFavorite/AddToFavorite';
import './Feed.css'

const Feed = ({articles}) => (
  <div className='article'>
    {articles.map((article, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className='article__preview' key={index}>
        <div className='article__meta'>
          <Link to={`/profiles/${article.author.username}`} className='article__link'>
            <div className='article__avatar avatar'>
              <img 
                src={article.author.image} 
                alt="author avatar"
                className='avatar__img'
              />
            </div>
          </Link>
          <div className="article__info">
            <Link 
              to={`/profiles/${article.author.username}`}
              className="article__link"
            >
              {article.author.username}
            </Link>
            <span className="article__data">{article.createdAt}</span>
          </div>
          <div className="">
            <AddToFavorite 
              isFavorite={article.favorited}
              favoritesCount={article.favoritesCount}
              articleSlug={article.slug}
            />
          </div>
        </div>
        <Link to={`/articles/${article.slug}`} className="article__link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <TagList tags={article.tagList} />
        </Link>
      </div>
))}
  </div>
    )

export default Feed