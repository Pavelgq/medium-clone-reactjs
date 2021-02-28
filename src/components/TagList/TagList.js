import React from 'react'


const TagList = ({tags}) => (
  <ul className='article__tag-list'>
    {tags.map((tag) => <li key={tag} className="article__tag-item">{tag}</li>)}
  </ul>
    )

export default TagList