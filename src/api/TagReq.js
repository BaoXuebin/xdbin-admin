import { fetch } from './Req';

export const defaultHandleError = (err) => { console.error(err); };
export const fetchAllTagsReq = () => fetch('/api/v1/tags');
export const addTagReq = (tagName) => fetch('/api/v1/tag', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tagName })
});