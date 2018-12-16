import React, { Component } from 'react';
import { Modal, Form, Input, Switch, message } from 'antd';
import Uploader from '../../components/common/Uploader';
import { saveVideo } from '../../api/VideoReq';

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

    state = {
        pub: true
    };

    handlePublishNewVideo = () => {
        const form = {
            name: this.title.input.value,
            introduction: this.introduction.textAreaRef.value,
            tags: this.tags.input.value,
            image: this.image.input.value,
            source: this.source.input.value,
            pub: this.state.pub ? 1 : 0
        };
        console.log(form);
        if (!form.name) { message.error('短片标题不能为空'); return; }
        if (!form.image) { message.error('短片封面不能为空'); return; }
        if (!form.source) { message.error('短片资源不能为空'); return; }

        saveVideo(form)
            .then((res) => {
                if (res.code && res.code !== 200) {
                    message.error(res.error);
                    return;
                }
                this.handleClear();
                this.props.onPublish(res);
            })
            .catch((error) => {
                console.error(error);
                message.error('短片保存失败');
            });
        
    }

    handleClear = () => {
        this.title.input.value = '';
        this.introduction.textAreaRef.value = '';
        this.tags.input.value = '';
        this.image.input.value = '';
        this.source.input.value = '';
    };

    handleSwitch = (pub) => {
        this.setState({ pub });
    };

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
                        <Input placeholder="短片标题" ref={(title) => { this.title = title; }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="短片描述"
                    >
                        <TextArea placeholder="短片描述" autosize={{ minRows: 2, maxRows: 6 }} ref={(introduction) => { this.introduction = introduction; }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="短片标签"
                    >
                        <Input placeholder="#AD,#Love" ref={(tags) => { this.tags = tags; }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="封面图片"
                    >
                        <Input placeholder="https://xxxx.com/xx.png" ref={(image) => { this.image = image; }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="视频地址"
                    >
                        <Input placeholder="https://xxxx.com/xx.mp4" ref={(source) => { this.source = source; }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否公开"
                    >
                        <Switch defaultChecked onChange={this.handleSwitch} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上传组件"
                    >
                        <Uploader />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default PublishVideoModal;
