import { fetch } from './Req';

export const fetchVideos = page => fetch(`/api/v1/video/all?page=${page || ''}`);
export const saveComment = ({ origin, replyId, content }) => fetch(`/api/v1/comment`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin, replyId, content, username: '止于秋分', email: 'baoxbin@qq.com', website: 'https://xdbin.com' })
});
export const deleteComment = commentId => fetch(`/api/v1/comment/${commentId}`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
});