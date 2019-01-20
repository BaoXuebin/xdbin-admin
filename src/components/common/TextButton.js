import React from 'react';
import Config from '../../config/Config';

import './styles/TextButton.less';

const TextButton = ({ content, onClick, color }) => (
    <span className="text-button" style={{ color: color || Config.theme }} onClick={onClick}>
        {content}
    </span>
);

export default TextButton;