import React, { Component } from 'react';
import { Modal, Form, Input, Switch } from 'antd';

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

class PublishVideoModal extends Component {

    state = {};

    handlePublishNewVideo() {}

    render() {
        return (
            <Modal
                title="发布新短片"
                width={650}
                visible={this.props.visible}
                onOk={this.handlePublishNewVideo}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="短片标题"
                    >
                        <Input placeholder="短片标题" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="短片描述"
                    >
                        <TextArea placeholder="短片描述" autosize={{ minRows: 2, maxRows: 6 }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="短片标签"
                    >
                        <Input placeholder="#AD,#Love" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="封面图片"
                    >
                        <Input placeholder="https://xxxx.com/xx.png" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="视频地址"
                    >
                        <Input placeholder="https://xxxx.com/xx.mp4" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否公开"
                    >
                        <Switch defaultChecked />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default PublishVideoModal;
