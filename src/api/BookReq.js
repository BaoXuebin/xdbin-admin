import { fetch } from './Req';

export const fetchBookByISBN = isbn => fetch(`/api/v1/book/isbn/${isbn}`);
export const saveBook = book => fetch(`/api/v1/book`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
});