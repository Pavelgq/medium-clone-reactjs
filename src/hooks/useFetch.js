import { useState, useEffect, useCallback } from 'react'

import axios from 'axios'

import useLocalStorage from './useLocalStorage'

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((fetchOptions = {}) => {
    setOptions(fetchOptions)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    let skipGetResponseAfterDestroy = false
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    }
    if (!isLoading) {
      return false
    }
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setResponse(res.data)
          setIsLoading(false)
        }
      })
      .catch((resError) => {
        // Todo What if this error is 404
        if (!skipGetResponseAfterDestroy) {
          setError(resError.response.data)
          setIsLoading(false)
        }
      })

    return () => {
      skipGetResponseAfterDestroy = true
    }
  }, [isLoading, options, url])

  return [
    {
      isLoading,
      response,
      error,
    },
    doFetch,
  ]
}
