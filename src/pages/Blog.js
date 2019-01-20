import React, { Component } from 'react';
import moment from 'moment';
import { Card, Table, Divider, Tag } from 'antd';

import Wrapper from './_Wrapper';
import { fetchBlogs } from '../api/BlogReq';
import TextButton from '../components/common/TextButton';

import Config from '../config/Config';
// const Config = require('../config/Config');

class Blog extends Component {
    columns = [
        {
            title: '博客ID',
            dataIndex: 'blogId',
            key: 'blogId',
            width: 100,
            render: blogId => <span title={blogId}>{blogId.substring(blogId.length - 6)}</span>,
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 350,
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            width: 300,
            render: tags => (
                <span>
                    {tags.map(tag => <Tag color={Config.theme} key={tag.tagId}>{tag.tagName}</Tag>)}
                </span>
            ),
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: 200,
            render: updateTime => <span>{moment(updateTime).format('YYYY.MM.DD HH:mm:ss')}</span>,
        },
        {
            title: '发布时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
            width: 200,
            render: publishTime => <span>{moment(publishTime).format('YYYY.MM.DD HH:mm:ss')}</span>,
        },
        {
            title: '是否公开',
            dataIndex: 'pub',
            key: 'pub',
            width: 100,
            render: pub => pub ? '公开' : '隐藏',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <TextButton content="修改" onClick={() => { console.log(`update: ${record.blogId}`); }} />
                    <Divider type="vertical" />
                    {
                        record.pub ? <TextButton content="隐藏" onClick={() => { console.log(`hide: ${record.blogId}`); }} /> :
                            <TextButton content="可见" onClick={() => { console.log(`show: ${record.blogId}`); }} />
                    }
                    
                    <Divider type="vertical" />
                    <TextButton content="删除" color="#f50" onClick={() => { console.log(`delete: ${record.blogId}`); }} />
                </span>
            ),
        }
    ];

    state = {
        loading: true,
        blogs: [],
        pageNo: 1,
        pageSize: 12,
        total: 0
    };

    componentDidMount() {
        const { pageNo, pageSize } = this.state;
        this.handleFetchBlogs({ pageNo, pageSize });
    }

    handleFetchBlogs = ({ pageNo, pageSize }) => {
        this.setState({ loading: true });
        fetchBlogs({ pageNo, pageSize })
            .then((blog) => {
                const { content, pageNo, pageSize, total } = blog;
                this.setState({
                    blogs: content,
                    pageNo, pageSize, total
                });
            })
            .catch((e) => { console.error(e); })
            .finally(() => { this.setState({ loading: false }); });
    }

    handleChangePagination = (pageNo, pageSize) => {
        this.handleFetchBlogs({ pageNo, pageSize });
    }

    handleMapDataSource = () => {
        return this.state.blogs.map(blog => ({
            key: blog.blogId,
            blogId: blog.blogId,
            pub: blog.pub,
            publishTime: blog.publishTime,
            updateTime: blog.updateTime,
            title: blog.title,
            tags: blog.tags,
        }));
    }

    render() {
        const { loading, pageNo, pageSize, total } = this.state;
        return (
            <Card>
                <Table
                    loading={loading}
                    columns={this.columns}
                    dataSource={this.handleMapDataSource()}
                    size="middle"
                    pagination={{ current: pageNo, pageSize, total, onChange: this.handleChangePagination }}
                />
            </Card>
        );
    }
}

export default Wrapper(Blog);
