import React, {useState, useEffect} from 'react'

import BackendErrorMessages from '@components/BackendErrorMessages/BackendErrorMessages';

const ArticleForm = ({onSubmit, errors, initialValues}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [description, setDescription] = useState('')
    const [tagList, setTagList] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const article = {
          title,
          body,
          description,
          tagList: tagList.split(' ')
        }
        onSubmit(article)
    }

    useEffect(() => {
      if (!initialValues) {
        return
      }
      setTitle(initialValues.title)
      setDescription(initialValues.description)
      setBody(initialValues.body)
      setTagList(initialValues.tagList.join(' '))
    }, [initialValues])
    return (
      <div className=''>
        <div className=''>
          <div className='article'>
            {errors && <BackendErrorMessages backendErrors={errors} />}
            <form className='article__form' onSubmit={handleSubmit}>
              <fieldset className='article__info'>
                <input 
                  type='text' 
                  className='article__text' 
                  placeholder='Article title' 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />       
                <input 
                  type='text' 
                  className='article__text' 
                  placeholder='What is this article about?' 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <textarea 
                  className='article__textarea' 
                  rows='8' 
                  placeholder='Write your article'
                  value={body}
                  onChange={e => setBody(e.target.value)}
                />
                <input 
                  type='text' 
                  className='article__text' 
                  placeholder='Enter tags' 
                  value={tagList}
                  onChange={e => setTagList(e.target.value)}
                />
              </fieldset>
              <button type='submit' className='article__submit'>
                Publish article
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default ArticleForm