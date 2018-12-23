import React, { Component, Fragment } from 'react';
import { Collapse, Row, Col, Button, Icon } from 'antd';
import { fetchCommentsByBookId, deleteComment } from '../../../api/BookReq';
import Loader from '../../../components/common/Loader';
import './style/BookComment.less';
import PublishBookCommentModal from './PublishBookCommentModal';
import BookCommentTimeline from './BookCommentTimeline';

const Panel = Collapse.Panel;
const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    </p>
  );

const ButtonGroup = Button.Group;

class BookComment extends Component {

    state = {
        comments: [],
        last: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: true,
        visible: false
    };

    handleReqComment = () => {
        this.setState({ loading: true });
        const { bookId } = this.props;
        fetchCommentsByBookId(bookId)
            .then((res) => {
                const { last, total, pageNo, pageSize, content } = res;
                this.setState({ last, total, pageNo, pageSize, comments: content });
                console.log(res);
            })
            .catch(this.handleReqError)
            .finally(() => { this.setState({ loading: false }); });
    };

    handleOpenModal = () => {
        this.setState({ visible: true });
    };

    handleCloseModal = () => {
        this.setState({ visible: false });
    };

    componentDidMount() {
        this.handleReqComment();
    }

    handlePublish = (comment) => {
        this.handleCloseModal();
        this.setState({
            comments: [comment, ...this.state.comments],
            total: this.state.total + 1
        });
    };

    handleDeleteComment = (commentId) => {
        deleteComment(commentId)
            .then((comment) => {
                this.setState({
                    comments: [...this.state.comments.filter(c => comment.id !== c.id)],
                    total: this.state.total - 1
                });
            })
            .catch(this.handleReqError);
    };

    render() {
        const { loading, total, visible, comments } = this.state;
        let _html = '';
        if (loading) {
            _html = <Loader isLoading={loading} text="笔记加载中" />;
        } else if (!loading && total === 0) {
            _html = <p className="empty">暂无读书笔记</p>;
        } else {
            _html = <BookCommentTimeline comments={comments} onDelete={this.handleDeleteComment} onUpdate={() => {}} />;
        }
        return (
            <Fragment>
                <Row gutter={16}>
                    <Col span={12}>
                        <span style={{ fontWeight: 'bolder', marginTop: '1rem' }}>读书笔记：</span>
                    </Col>
                    <Col span={12} align="right">
                        <ButtonGroup>
                            <Button type="primary" icon="cloud" />
                        </ButtonGroup>
                        &nbsp;
                        <Button type="primary" icon="plus" onClick={this.handleOpenModal} />
                    </Col>
                </Row>
                <div style={{ height: '10px' }} />
                { _html }
                <PublishBookCommentModal bookId={this.props.bookId} visible={visible} onCancel={this.handleCloseModal} onPublish={this.handlePublish} />
            </Fragment>
        );
    }
}

export default BookComment;