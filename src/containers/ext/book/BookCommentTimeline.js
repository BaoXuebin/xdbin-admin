import React, { Component } from 'react';
import moment from 'moment';
import { Timeline, Popover, Modal } from 'antd';
import Config from '../../../config/Config';
import './style/BookCommentTimeline.less';

const confirm = Modal.confirm;

const TextButtonStyle = {
    color: Config.theme
};

const TextButton = ({ content, onClick }) => (
    <span className="text-button" style={TextButtonStyle} onClick={onClick}>
        {content}
    </span>
);

const Time = ({ time }) => (
    <Popover content={moment(time).format('YYYY-MM-DD HH:mm:ss')} trigger="hover">
        <span className="publish-time">
            {moment(time).fromNow()}
        </span>
    </Popover>
);

class BookCommentTimeline extends Component {

    handleUpdate = () => {
        // this.props.onUpdate(commentId);
    };

    handleDelete = (commentId, comment) => {
        const _this = this;
        confirm({
            title: '确定删除?',
            content: comment,
            okText: '删除',
            okType: 'danger',
            okButtonProps: {
                disabled: false,
            },
            cancelText: '取消',
            onOk() {
                _this.props.onDelete(commentId);
            },
            onCancel() {}
        });
    };

    render() {
        return (
            <Timeline>
                {
                    this.props.comments.map(comment =>
                        <Timeline.Item key={comment.id}>
                            <div>
                                <p>
                                    <span style={{ color: Config.theme, fontWeight: "bolder" }}>@{comment.author}</span>
                                    &nbsp;记录
                                    &nbsp;<span style={{ fontWeight: "bolder" }}>{comment.position}</span>
                                </p>
                                { comment.comment }
                                <div style={{ marginTop: '.5rem' }}>
                                    <Time time={ comment.publishTime } />
                                    <TextButton content="修改" onClick={this.handleUpdate} />
                                    <TextButton content="删除" onClick={() => { this.handleDelete(comment.id, comment.comment); }} />
                                </div>
                            </div>
                        </Timeline.Item>
                    )
                }
            </Timeline>
        );
    }
}

export default BookCommentTimeline;