import React, { Component } from 'react';
import { Card, Timeline, Icon } from 'antd';
import Wrapper from '../_Wrapper';
import Loader from '../../components/common/Loader';
import { fetchMoods } from '../../api/MoodReq';
import MoodTimeLineItem from '../../components/mood/MoodTimeLineItem';

class Mood extends Component {

    state = {
        loading: false,
        total: 0,
        last: false,
        pageNo: 1,
        moods: []
    };

    async componentDidMount() {
        this.setState({ loading: true });
        await fetchMoods(this.state.pageNo)
            .then((result) => {
                const { content, pageNo, total, last } = result;
                this.setState({
                    moods: content,
                    pageNo,
                    total,
                    last
                });
            })
            .catch((error) => { console.log(error); })
            .finally(() => { this.setState({ loading: false }); });
    }

    render() {
        const { loading, moods, total } = this.state;
        return (
            <Card>
                {
                    loading && <Loader />
                }
                <Timeline>
                    {
                        moods.map(mood =>
                            <Timeline.Item key={mood.id} dot={ mood.pub ? null : <Icon type="eye-invisible" style={{ fontSize: '16px' }} /> }>
                                <MoodTimeLineItem mood={mood} />
                            </Timeline.Item>
                        )
                    }
                </Timeline>
            </Card>
        );
    }
}

export default Wrapper(Mood);
