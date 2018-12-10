import React, { Component } from 'react';
import Wrapper from '../_Wrapper';
import moment from 'moment';
import { Card, Row, Col, Icon, Popover, Modal } from 'antd';
import { fetchVideos } from '../../api/VideoReq';

const { Meta } = Card;

class Video extends Component {
    state = {
        loading: false,
        videos: [],
        pageNo: 1,
        total: 0,
        last: false,
        visible: false,
        source: ''
    };

    reqVideo = () => {
        fetchVideos(this.state.pageNo)
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

    async componentDidMount() {
        this.reqVideo();
    }

    render() {
        const { videos, visible, source } = this.state;
        return (
            <Card>
                <Row gutter={16}>
                    {
                        videos.map(video => (
                            <Col key={video.id} span={4} style={{ marginBottom: '1rem' }}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={video.image} />}
                                    actions={[
                                        <Popover content={video.introduction} title={moment(video.uploadTime).fromNow()}>
                                            <Icon type="info-circle" />
                                        </Popover>,
                                        <Icon type="edit" />,
                                        <Icon type="delete" />
                                    ]}
                                    onClick={() => { this.handleOpenPlayer(video.source); }}
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
            </Card>
        );
    }
}

export default Wrapper(Video);
