import React from 'react';
import moment from 'moment';
import { Popover } from 'antd';

const PopoverTime = ({ time }) => (
    <Popover content={moment(time).format('YYYY-MM-DD HH:mm:ss')} trigger="hover">
        <span className="publish-time">
            {moment(time).fromNow()}
        </span>
    </Popover>
);

export default PopoverTime;
