import React, { Component } from 'react';
import Wrapper from '../_Wrapper';
import moment from 'moment';
import { Card, Icon, Popover, Modal, Button, Collapse, message } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchVideos, deleteVideo } from '../../api/VideoReq';
import PublishVideoModal from '../../containers/ext/PublishVideoModal';

import './style/Video.less';

const confirm = Modal.confirm;
const { Meta } = Card;
const { Panel } = Collapse;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

class Video extends Component {
    state = {
        loading: false,
        videos: [],
        pageNo: 1,
        pageSize: 12,
        total: 0,
        last: false,
        visible: false,
        publishModalVisible: false,
        source: ''
    };

    reqVideo = () => {
        const { pageNo, pageSize } = this.state;
        fetchVideos(pageNo, pageSize)
            .then((res) => {
                const { content, last, number, totalElements } = res;
                this.setState({
                    pageNo: number + 1,
                    videos: content,
                    last,
                    total: totalElements
                });
            })
            .catch((error) => { console.error(error); });
    }

    handleClosePlayer = () => {
        this.setState({ visible: false });
    }

    handleOpenPlayer = (source) => {
        this.setState({ visible: true, source });
    }

    handleOpenPublishModal = () => {
        this.setState({ publishModalVisible: true });
    };

    handleClosePublishModal = () => {
        this.setState({ publishModalVisible: false });
    };

    handlePublishNewVideo = (video) => {
        this.setState({
            publishModalVisible: false,
            videos: [video, ...this.state.videos]
        });
    };

    handleDeleteVideo = (id, name) => {
        confirm({
            title: '确定删除?',
            content: name,
            okText: '删除',
            okType: 'danger',
            okButtonProps: {
                disabled: false,
            },
            cancelText: '取消',
            onOk: () => {
                deleteVideo(id)
                    .then(() => {
                        const videos = this.state.videos.filter(video => video.id !== id);
                        this.setState({ videos: [...videos] });
                        message.success('删除成功');
                    })
                    .catch((error) => { console.error(error); message.error('删除失败'); });
            }
        });
    };

    async componentDidMount() {
        this.reqVideo();
    }

    render() {
        const { videos, visible, source } = this.state;
        return (
            <Card>
                <div style={{ margin: '1rem' }}>
                    <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                        <Button type="primary" icon="video-camera" onClick={this.handleOpenPublishModal}>发布新短片</Button>
                    </div>
                </div>
                <Grid fluid>
                    <Row>
                        {
                            videos.map(video => (
                                <Col key={video.id} style={{ margin: '1rem' }}>
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img className="cover" alt="example" src={video.image} onClick={() => { this.handleOpenPlayer(video.source); }} />}
                                        actions={[
                                            <Popover content={video.introduction} title={moment(video.uploadTime).fromNow()}>
                                                <Icon type="info-circle" />
                                            </Popover>,
                                            <Icon type="edit" />,
                                            <Icon type="delete" onClick={(e) => { this.handleDeleteVideo(video.id, video.name); }} />
                                        ]}
                                    >
                                        <Meta
                                            title={video.name}
                                            description={video.tags}
                                        />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Grid>
                <Modal
                    destroyOnClose
                    width={1200}
                    bodyStyle={{ padding: '0px' }}
                    visible={visible}
                    footer={null}
                    onCancel={this.handleClosePlayer}
                >
                    <video controls="controls" width="100%" height="100%" autoPlay style={{ marginBottom: '-5px' }}>
                        <source type="video/mp4" src={source} />
                        您的浏览器不支持Video标签。
                    </video>
                </Modal>
                <PublishVideoModal
                    visible={this.state.publishModalVisible} 
                    onCancel={this.handleClosePublishModal}
                    onPublish={this.handlePublishNewVideo}
                />
            </Card>
        );
    }
}

export default Wrapper(Video);
