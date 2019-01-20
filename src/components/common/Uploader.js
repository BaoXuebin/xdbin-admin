import React, { Component } from 'react';
import { Button } from 'antd';
import * as qiniu from 'qiniu-js';

import { fetchQiniuToken } from '../../api/ManaReq';

const ButtonGroup = Button.Group;

class Uploader extends Component {

    state = {
        filename: null,
        error: null,
        fileUrl: null,
        loading: false
    };

    handleChooseFile = () => {
        if (!this.fileInput) return;
        this.fileInput.click();
    };

    handleChangeFile = (e) => {
        this.file = e.target.files[0];
        this.setState({ filename: this.file.name });
    };

    handleThrowError = (message, error) => {
        this.setState({ error: message });
        console.error(error);
    };

    handleUpload = () => {
        this.setState({ loading: true });
        fetchQiniuToken(this.props.type)
            .then((res) => {
                const { key, token } = res;
                const observable = qiniu.upload(
                    this.file,
                    key,
                    token,
                    { region: qiniu.region.z0 }
                );
                const _this = this;
                observable.subscribe({
                    error(err) { _this.handleThrowError('图片上传失败', err); },
                    complete(res) {
                        _this.setState({ fileUrl: res.url, loading: false, filename: null });
                        _this.fileInput.value = '';
                    }
                });
            })
            .catch((error) => { this.handleThrowError('', error); });
    };

    render() {
        const { filename, fileUrl, loading } = this.state;
        const { type } = this.props;
        return (
            <div>
                <input type="file" style={{ display: 'none' }} ref={(_file) => { this.fileInput = _file; }} onChange={this.handleChangeFile} />
                <ButtonGroup>
                    <Button type="primary" icon={type === 'video' ? 'video-camera' : 'paper-clip'} onClick={this.handleChooseFile}>{ filename || (type === 'video' ? '选择视频文件' : '选择文件') }</Button>
                    <Button type="primary" icon="upload" onClick={this.handleUpload} disabled={filename === null} loading={loading} />
                </ButtonGroup>
                {
                    fileUrl &&
                    <div>{ fileUrl }</div>
                }
            </div>
        );
    }
}

export default Uploader;