import React, { Component } from 'react';
import Wrapper from './_Wrapper';
import { Card, Tag, Input, Icon } from 'antd';
import { fetchAllTagsReq, defaultHandleError, addTagReq } from '../api/TagReq';

class TagPage extends Component {
    state = {
        tags: []
    };

    handleAddTag = (e) => {
        if (e.keyCode === 13) {
            console.log(this.input);
            const tagName = this.input.input.value;
            addTagReq(tagName)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        tags: [...this.state.tags, { tagId: this.state.tags.length + 1, tagName }]
                    }, () => {
                        this.input.input.value = '';
                    });
                })
                .catch(defaultHandleError);
        }
    };

    handleDelTag = (tagId) => {
        console.log('delete');
    };

    componentDidMount() {
        fetchAllTagsReq()
            .then((tags) => {
                this.setState({ tags });
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        return (
            <Card title="标签管理" bordered={true}>
                <Input
                    placeholder="Add a tag"
                    prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onKeyDown={this.handleAddTag}
                    ref={(input) => { this.input = input; }}
                    style={{ maxWidth: '280px' }}
                />
                <div style={{ height: '1rem' }} />
                <div>
                {
                    this.state.tags.map(t => (
                        <Tag
                            key={t.tagId}
                            closable
                            style={{ marginTop: '.5rem' }}
                            onClose={(e) => { e.preventDefault(); this.handleDelTag(t.tagId); }}
                        >{t.tagName}</Tag>
                    ))
                    }
                </div>
            </Card>
        );
    }
}

export default Wrapper(TagPage);
