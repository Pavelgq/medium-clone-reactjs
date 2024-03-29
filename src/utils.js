import {parse} from 'query-string';


export const range = (from, to) => [...Array(to).keys()].map(el => el + from)

export const compactRange = (count, current) => {
    const arr = [1, 2, count - 1, count]

    if (current > 1 && current < count) {
        arr.push(current - 1, current, current + 1)
    }
    const result = []
    arr.forEach(value => {
        if (!result.includes(value)) {
            result.push(value)
        }
    })
    return result 
}

export const limit = 10 // TODO: add change limits on widget page

export const getPaginator = (search) => {
    const parsedSearch = parse(search)
    const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
    const offset = currentPage * limit - limit

    return {currentPage, offset}
}