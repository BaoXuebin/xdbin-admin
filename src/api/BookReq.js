import { fetch } from './Req';

const flatCondition = (condition) => {
    let result = '';
    if (!condition) return result;
    for (let key in condition) {
        if (result === '') {
            result += `${key}=${condition[key]}`;
        } else {
            result += `&${key}=${condition[key]}`;
        }
    }
    return result;
};

export const fetchBookByISBN = isbn => fetch(`/api/v1/book/isbn/${isbn}`);
export const fetchBooks = (condition) => fetch(`/api/v1/book/all?${flatCondition(condition)}`);
export const fetchBookById = bookId => fetch(`/api/v1/book/all/${bookId}`);
export const saveBook = book => fetch(`/api/v1/book`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
});
export const deleteBook = bookId => fetch(`/api/v1/book/${bookId}`, { method: 'delete' });
export const fetchCommentsByBookId = (bookId, condition) => fetch(`/api/v1/book/${bookId}/comment?${flatCondition(condition)}`);
export const saveOrUpdateComment = comment => fetch(`/api/v1/book/comment`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
});
export const deleteComment = commentId => fetch(`/api/v1/book/comment/${commentId}`, { method: 'delete' });
export const updateReadProgress = (bookId, progress) => fetch(`/api/v1/book/${bookId}/progress?progress=${progress}`, { method: 'post' });