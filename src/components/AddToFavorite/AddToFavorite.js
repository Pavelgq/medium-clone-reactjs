import React from "react"

import classNames from "classnames";
import useFetch from "@hooks/useFetch";

const AddToFavorite = ({isFavorite, favoritesCount, articleSlug}) => {
    const apiUrl = `/articles/${articleSlug}/favorite`;
    const [{response}, doFetch] = useFetch(apiUrl);
    const favoritesCountWithResponce = response 
        ? response.article.favoritesCount
        : favoritesCount
    const isFavoritedWithResponce = response 
        ? response.article.favorited 
        : isFavorite
    
    const buttonClasses = classNames({
        btn: true,
        "btn-sm": true,
        "btn-primary": isFavoritedWithResponce,
        "btn-outline-primary": !isFavoritedWithResponce
    })
    
    const handleLike = (event) => {
        console.log("click")
        event.preventDefault()
        doFetch({
            method: isFavoritedWithResponce ? "delete" : "post"
        })
    }
    
    return (
      <button type='submit' className={buttonClasses} onClick={handleLike}>
        <ion-icon name="heart-outline" />
        <span>
          {favoritesCountWithResponce}
        </span>
      </button>
    )
}

export default AddToFavorite