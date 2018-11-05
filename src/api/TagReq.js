import { fetch } from './Req';

export const defaultHandleError = (err) => { console.error(err); };
export const fetchAllTagsReq = () => fetch('/tags');
export const addTagReq = (tagName) => fetch('/tag', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tagName })
});