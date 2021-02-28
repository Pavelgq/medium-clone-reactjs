import React from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {range, compactRange} from '~/utils';

import './Pagination.css'

const PaginationItem = ({page, currentPage, url}) => {
    const liClasses = classNames({
        '': true,
        'active': currentPage === page,
    })
    return (
      <li className={liClasses}>
        <Link to={`${url}?page=${page}`} className="pagination__link">
          {page}
        </Link>
      </li>
    )
}

const Pagination = ({total, limit, url, currentPage}) => {
    const pageCount = Math.ceil(total/limit)
    const pages = range(1, pageCount)
    const pagesActive = compactRange(pageCount, currentPage).sort()
    console.log(pagesActive)
    return (
      <ul className="pagination">
        {pages.map(page => {
                if (!pagesActive.includes(page)) {
                    return false
                }
                return (
                  <PaginationItem
                    page={page}
                    currentPage={currentPage}
                    url={url}
                    key={page}
                  />
                )
            })}
      </ul>
    )
}

export default Pagination