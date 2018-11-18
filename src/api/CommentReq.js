import { fetch } from './Req';

export const fetchAllComment = () => fetch('/api/v1/comment/all');
export const deleteComment = commentId => fetch(`/api/v1/comment/${commentId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
});