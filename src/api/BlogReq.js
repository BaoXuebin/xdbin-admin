import { fetch, flatCondition } from './Req';

export const fetchBlogs = condition => fetch(`/api/v1/blogs/all?${flatCondition(condition)}`);