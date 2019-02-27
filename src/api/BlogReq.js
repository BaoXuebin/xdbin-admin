import { fetch, flatCondition } from "./Req";

export const fetchBlogs = condition =>
    fetch(`/api/v1/blogs/all?${flatCondition(condition)}`);
export const hideBlogReq = blogId =>
    fetch(`/api/v1/blog/togglePub?type=pvt&blogId=${blogId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" }
    });
export const showBlogReq = blogId =>
    fetch(`/api/v1/blog/togglePub?type=pub&blogId=${blogId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" }
    });
export const deleteBlogReq = blogId =>
    fetch(`/api/v1/blog?blogId=${blogId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
    });
export const saveBlogReq = blog => fetch(`/api/v1/blog`, {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog)
});
export const fetchUpdateBlogByBlogId = blogId => fetch(`/api/v1/blog/update/${blogId}`, {
    method: 'get'
});