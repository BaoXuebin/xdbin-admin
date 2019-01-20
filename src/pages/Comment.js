import React, { Component } from 'react';
import { Card, Timeline, Pagination } from 'antd';

import Wrapper from './_Wrapper';
import { fetchAllComment, saveComment, deleteComment } from '../api/CommentReq';
import TimelineItem from '../components/comment/TimelineItem';
import Loader from '../components/common/Loader';

class Comment extends Component {
    state = {
        comments: [],
        pageNo: 1,
        total: 0,
        pageSize: 10,
        last: false,
        loading: false
    };

    handleReply = ({ origin, replyId, title, content }) => {
        saveComment({ origin, replyId, content })
            .then((comment) => {
                comment.title = title;
                this.setState({ comments: [comment, ...this.state.comments] });
            })
            .catch((err) => { console.error(err); });
    };

    handleDelete = commentId => {
        deleteComment(commentId)
            .then((commentId) => {
                this.setState({
                    comments: this.state.comments.filter(c => c.id !== commentId)
                });
            })
            .catch((error) => { console.error(error); });
    };

    handleChangePage = (pageNo, pageSize) => {
        this.handleFetchComments(pageNo, pageSize);
    };

    handleFetchComments(pageNo, pageSize) {
        this.setState({ loading: true });
        fetchAllComment(pageNo)
            .then((result) => {
                const { content, pageNo, total, last } = result;
                this.setState({
                    comments: content,
                    pageNo,
                    total,
                    last
                });
            })
            .catch((error) => { console.log(error); })
            .finally(() => { this.setState({ loading: false }); });
    }

    componentDidMount() {
        this.handleFetchComments(this.state.pageNo);
    }

    render() {
        const { comments, loading, total, pageNo, pageSize } = this.state;
        return (
            <Card>
                {
                    loading && <Loader />
                }
                <Timeline>
                    {
                        comments.map(comment =>
                            <Timeline.Item key={comment.id}>
                                <TimelineItem comment={comment} onReply={this.handleReply} onDelete={this.handleDelete} />
                            </Timeline.Item>
                        )
                    }
                </Timeline>
                <Pagination showTotal={total => `共 ${total} 条`} defaultCurrent={pageNo} defaultPageSize={pageSize} total={total} onChange={this.handleChangePage} />
            </Card>
        );
    }
}

export default Wrapper(Comment);
