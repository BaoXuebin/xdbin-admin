import React, { PureComponent } from "react";
import _Wrapper from "../_Wrapper";
import { Card, Input, Checkbox, message, Switch, Button } from "antd";

import "./Add.css";
import { fetchAllTagsReq } from "../../api/TagReq";
import Uploader from "../../components/common/Uploader";
import MultiTextEditor from "../../components/common/MultiTextEditor";
import { saveBlogReq, fetchUpdateBlogByBlogId } from "../../api/BlogReq";

const CheckboxGroup = Checkbox.Group;

class AddOrUpdate extends PureComponent {
    state = {
        tagOptions: [],
        viewBlogId: "",
        viewTitle: "",
        blogId: null,
        title: "",
        tags: [],
        pub: true,
        summaryType: 1,
        summary: "",
        contentType: 1,
        content: "",
        loading: false
    };

    componentWillMount() {
        const blogId = this.props.params.blogId;
        if (blogId) {
            this.handleReqUpdateBlog(blogId);
        }
        this.handleReqTags();
    }

    handleChangeTitle = e => {
        this.setState({ title: e.target.value });
    };

    handleChangeTags = checkedValues => {
        this.setState({
            tags: checkedValues
        });
    };

    handleChangePub = pub => {
        this.setState({ pub });
    };

    handleSaveSummary = async (type, summary) => {
        this.setState({ summaryType: type, summary });
    };

    handleSaveContent = async (type, content) => {
        this.setState({ contentType: type, content });
    };

    handleReqTags = () => {
        fetchAllTagsReq()
            .then(res => {
                const tags = res.map(t => ({
                    value: t.tagId,
                    label: t.tagName
                }));
                this.setState({ tagOptions: tags });
            })
            .catch(() => {
                message.error("获取标签失败");
            });
    };

    handleReqUpdateBlog = (blogId) => {
        fetchUpdateBlogByBlogId(blogId)
            .then((res) => {
                const { blogId, title, ifPub, summary, content, tags } = res;
                this.setState({
                    blogId, title, summary, content,
                    pub: ifPub,
                    tags: tags.map(t => t.tagId)
                }, () => { this.props.setBreadcrumbName(title); });
            })
            .catch(() => { message.error('获取博客失败'); });
    };

    handleClear = () => {
        this.setState({
            title: "",
            tags: [],
            pub: true,
            summary: "",
            content: ""
        });
    };

    handlePublish = () => {
        const { blogId, title, tags, pub, summaryType, summary, contentType, content } = this.state;
        if (!title || !title.trim()) {
            message.error("标题不能为空");
            return;
        } else if (tags.length > 3) {
            message.error("标签最多只能选择 3 个");
            return;
        } else if (!content || !content.trim()) {
            message.error("博客内容不能为空");
            return;
        }
        const blog = {
            blogId,
            title,
            tags: tags.map(t => ({ tagId: t })),
            ifPub: pub,
            summary,
            content,
            summaryType,
            contentType
        };
        this.setState({ loading: true });
        saveBlogReq(blog)
            .then(res => {
                this.setState(
                    { viewBlogId: res.blogId, viewTitle: res.title },
                    () => {
                        message.success("发布成功");
                        this.handleClear();
                    }
                );
            })
            .catch(() => {
                message.error("发布失败");
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    render() {
        const {
            tagOptions,
            title,
            summary,
            content,
            loading,
            tags,
            viewBlogId,
            viewTitle
        } = this.state;
        return (
            <Card>
                <Input
                    placeholder="输入博客标题"
                    className="input"
                    value={title}
                    onChange={this.handleChangeTitle}
                />
                <div className="item" style={{ maxWidth: "600px" }}>
                    <CheckboxGroup
                        options={tagOptions}
                        value={tags}
                        onChange={this.handleChangeTags}
                    />
                </div>
                <div className="item">
                    <Uploader />
                </div>
                <div className="item">
                    <Switch
                        checkedChildren="公开"
                        unCheckedChildren="隐藏"
                        defaultChecked
                        onChange={this.handleChangePub}
                    />
                </div>
                <div className="item">
                    <MultiTextEditor
                        title="博客摘要"
                        value={summary}
                        onSave={this.handleSaveSummary}
                    />
                </div>
                <div className="item">
                    <MultiTextEditor
                        title="博客内容"
                        value={content}
                        onSave={this.handleSaveContent}
                    />
                </div>
                <div className="item">
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={this.handlePublish}
                    >
                        发布
                    </Button>
                    {viewBlogId && (
                        <a
                            style={{
                                marginLeft: "1.5rem",
                                fontSize: "16px",
                                textDecoration: "underline"
                            }}
                            target="_blank"
                            href={`https://xdbin.com/blog/${viewBlogId}`}
                        >
                            {viewTitle}
                        </a>
                    )}
                </div>
            </Card>
        );
    }
}

export default _Wrapper(AddOrUpdate);
