import React, { Component } from 'react';
import moment from 'moment';
import { Popover, Modal } from 'antd';

import Config from '../../config/Config';
import './styles/TimelineItem.less';

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

class TimelineItem extends Component {

    handleReply = () => {
        this.props.onReply({
            replyId: this.props.comment.id,
            content: 'ssss'
        });
    };

    handleDelete = () => {
        const _this = this;
        confirm({
            title: '确定删除?',
            content: this.props.comment.content,
            okText: '删除',
            okType: 'danger',
            okButtonProps: {
                disabled: false,
            },
            cancelText: '取消',
            onOk() {
                _this.props.onDelete(_this.props.comment.id);
            },
            onCancel() {}
        });
    };

    render() {
        const { comment } = this.props;
        return (
            <div>
                <p>
                    <span style={{ color: Config.theme, fontWeight: "bolder" }}>@{comment.username}</span>
                    &nbsp;{comment.origin === 'xdbin.com' ? '留言' : '评论'}
                    &nbsp;<span style={{ fontWeight: "bolder" }}>{comment.title}</span>
                </p>
                { comment.content }
                <div style={{ marginTop: '.5rem' }}>
                    <Time time={ comment.publishTime } />
                    <TextButton content="回复" onClick={this.handleReply} />
                    <TextButton content="删除" onClick={this.handleDelete} />
                </div>
            </div>
        );
    }
}

export default TimelineItem;
