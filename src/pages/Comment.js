import React, { Component } from 'react';
import Wrapper from './_Wrapper';
import { Card, Timeline } from 'antd';
import { fetchAllComment, deleteComment } from '../api/CommentReq';
import TimelineItem from '../components/comment/TimelineItem';

class Comment extends Component {
    state = {
        comments: [],
        pageNo: 1,
        total: 0,
        last: false,
        loading: false
    };

    handleReply = ({ replyId, content }) => {
        console.log(replyId, content);
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
            .catch((error) => { console.log(error); });
    }

    render() {
        const { comments } = this.state;
        return (
            <Card>
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
