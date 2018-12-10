import React, { Component } from 'react';
import { Avatar } from 'antd';
import PopoverTime from '../common/PopoverTime';

import './styles/MoodTimeLineItem.less';

class MoodTimeLineItem extends Component {
    render() {
        const { user, publishTime, content, avatar, action, pub } = this.props.mood;
        return (
            <div className="MoodTimeLineItem">
                <Avatar src={avatar} />
                <div className="username">{user}</div>
                { action && <div className="action">{action}</div> }
                <PopoverTime time={publishTime} />
                { pub === 0 && <div className="pub">[私密]</div> }
                <div className="content">{content}</div>
            </div>
        );
    }
}

export default MoodTimeLineItem;
