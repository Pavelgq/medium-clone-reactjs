import React from 'react'

const BackendErrorMessages = ({backendErrors}) => {
    console.log(backendErrors)
    if (!backendErrors) {
        return <span>Неизвестная ошибка</span>
    }
    const errorMessages = Object.keys(backendErrors).map((name) => {
        for (let i = 0; i <= backendErrors[name].length; i += 1) {
            const message = backendErrors[name][i]
            return (
              <li key={name+(i+1)}>
                {`${name}: ${message}`}
              </li>   
            )
        }
        return (
          <span>No errors</span>
        )
    })
    return <ul className="error-messages">{errorMessages}</ul>
}

export default BackendErrorMessages