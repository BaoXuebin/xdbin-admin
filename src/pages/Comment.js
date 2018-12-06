import React, { Component } from 'react';
import { Card, Timeline } from 'antd';

import Wrapper from './_Wrapper';
import { fetchAllComment, saveComment, deleteComment } from '../api/CommentReq';
import TimelineItem from '../components/comment/TimelineItem';
import Loader from '../components/common/Loader';

class Comment extends Component {
    state = {
        comments: [],
        pageNo: 1,
        total: 0,
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

    async componentDidMount() {
        this.setState({ loading: true });
        await fetchAllComment(this.state.pageNo)
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

    render() {
        const { comments, loading } = this.state;
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
            </Card>
        );
    }
}

export default Wrapper(Comment);
