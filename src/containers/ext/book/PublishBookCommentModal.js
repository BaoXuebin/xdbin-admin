import React, { Component } from 'react';
import { Modal, Form, Input, Switch, InputNumber } from 'antd';
import { saveOrUpdateComment } from '../../../api/BookReq';

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
class PublishBookCommentModal extends Component {

    state = {
        author: '初意',
        avatar: 'http://cdn.xdbin.com/pics/20181120000045',
        chapter: 0,
        section: 0,
        position: '',
        comment: '',
        pub: true
    };

    handlePublish = () => {
        const { author, avatar, chapter, section, position, comment, pub } = this.state;
        const { bookId } = this.props;
        saveOrUpdateComment({ bookId, author, avatar, comment, chapter, section, position, pub: pub ? 1 : 0 })
            .then((comment) => {
                this.props.onPublish(comment);
            })
            .catch((error) => { console.error(error); });
    };

    handleChangeAuthor = (e) => {
        this.setState({ author: e.target.value });
    };

    handleChangeChapter = (chapter) => {
        this.setState({ chapter });
    };

    handleChangeSection = (section) => {
        this.setState({ section });
    };

    handleChangePosition = (e) => {
        this.setState({ position: e.target.value });
    };

    handleChangeComment = (e) => {
        this.setState({ comment: e.target.value });
    };

    handleTogglePub = (pub) => {
        this.setState({ pub });
    };

    render() {
        const { author, chapter, section, position, comment, pub } = this.state;
        return (
            <Modal
                title="读书评论"
                width={650}
                visible={this.props.visible}
                onOk={this.handlePublish}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="昵称"
                    >
                        <Input placeholder="昵称" value={author} onChange={this.handleChangeAuthor} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="章节"
                    >
                        <InputNumber min={0} defaultValue={chapter} onChange={this.handleChangeChapter} /> 章&nbsp;&nbsp;&nbsp;
                        <InputNumber min={0} defaultValue={section} onChange={this.handleChangeSection} /> 节
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="位置"
                    >
                        <Input placeholder="位置" value={position} onChange={this.handleChangePosition} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="笔记"
                    >
                        <TextArea placeholder="笔记" autosize={{ minRows: 4, maxRows: 6 }} value={comment} onChange={this.handleChangeComment} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公开"
                    >
                        <Switch checked={pub} onChange={this.handleTogglePub} />
                    </FormItem>
                </Form>
            </Modal>
        );
    };
}

export default PublishBookCommentModal;
