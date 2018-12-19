import React, { Component } from 'react';
import Wrapper from '../_Wrapper';
import { Card, Button, message } from 'antd';
import InputBookModal from '../../containers/ext/InputBookModal';

class Book extends Component {

    state = {
        inputModalVisible: false
    };

    handleOpenInputModal = () => {
        this.setState({ inputModalVisible: true });
    };

    handleCloseInputModal = () => {
        this.setState({ inputModalVisible: false });
    };

    handleInputNewBook = (book) => {
        message.success('添加成功');
        this.setState({ inputModalVisible: false });
        console.log(book);
    };

    render() {
        return (
            <Card>
                <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                    <Button type="primary" icon="book" onClick={this.handleOpenInputModal}>录入图书</Button>
                </div>
                <InputBookModal
                    visible={this.state.inputModalVisible} 
                    onCancel={this.handleCloseInputModal}
                    onPublish={this.handleInputNewBook}
                />
            </Card>
        );
    }
}

export default Wrapper(Book);
