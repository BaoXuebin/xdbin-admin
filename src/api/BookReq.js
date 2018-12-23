import { fetch } from './Req';

export const fetchBookByISBN = isbn => fetch(`/api/v1/book/isbn/${isbn}`);
export const fetchBooks = (condition) => fetch(`/api/v1/book/all`);
export const fetchBookById = bookId => fetch(`/api/v1/book/all/${bookId}`);
export const saveBook = book => fetch(`/api/v1/book`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
});
export const fetchCommentsByBookId = bookId => fetch(`/api/v1/book/${bookId}/comment`);
export const saveOrUpdateComment = comment => fetch(`/api/v1/book/comment`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
});
export const deleteComment = commentId => fetch(`/api/v1/book/comment/${commentId}`, { method: 'delete' });