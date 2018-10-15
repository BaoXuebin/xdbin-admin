import React, { Component } from 'react';
import Wrapper from './_Wrapper';
import { Card } from 'antd';

class Tag extends Component {
    render() {
        return (
            <Card title="标签管理" bordered={true}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        );
    }
}

export default Wrapper(Tag);
