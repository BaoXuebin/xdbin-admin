import { fetch } from './Req';

export const defaultHandleError = (err) => { console.error(err); };

export const loginReq = ({ username, password }) => fetch('/api/v1/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
});

export const validateReq = () => fetch('/api/v1/validate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
});

export const fetchQiniuToken = type => fetch(`/api/v1/qiniu/token?type=${type}`);