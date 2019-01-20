import { fetch } from './Req';

export const fetchVideos = (page, pageSize) => fetch(`/api/v1/video/all?page=${page || ''}&pageSize=${pageSize || ''}`);
export const saveVideo = ({ name, introduction, image, source, tags, pub }) => fetch(`/api/v1/video`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, introduction, image, source, tags, pub })
});
export const deleteVideo = id => fetch(`/api/v1/video/${id}`, { method: 'delete' });