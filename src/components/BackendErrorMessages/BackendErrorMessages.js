import React from 'react'

import styles from './BackendErrorMessages.module.scss';

const BackendErrorMessages = ({backendErrors}) => {
    if (!backendErrors) {
        return <span className={styles.item}>Server is not a response</span>
    }
    const errorMessages = Object.keys(backendErrors).map((name) => {
        for (let i = 0; i <= backendErrors[name].length; i += 1) {
            const message = backendErrors[name][i]
            return (
              <li className={styles.item} key={name+(i+1)}>
                {`${name}: ${message}`}
              </li>   
            )
        }
        return (
          <span className={styles.item}>No errors</span>
        )
    })
    return <ul className={styles.list}>{errorMessages}</ul>
}

export default BackendErrorMessages