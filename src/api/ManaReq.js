import { fetch } from './Req';

export const defaultHandleError = (err) => { console.error(err); };

export const loginReq = ({ username, password }) => fetch('/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
});

export const validateReq = () => fetch('/validate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
});