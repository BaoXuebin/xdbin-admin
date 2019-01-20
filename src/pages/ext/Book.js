import React, { Component } from 'react';
import Wrapper from '../_Wrapper';
import { Link } from 'react-router-dom';
import { Card, Button, message, Popover, Icon, Progress, Pagination, Modal } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputBookModal from '../../containers/ext/book/InputBookModal';
import { fetchBooks, deleteBook } from '../../api/BookReq';
import './style/Book.less';

const confirm = Modal.confirm;
class Book extends Component {
    state = {
        inputModalVisible: false,
        pageNo: 1,
        pageSize: 12,
        total: 0,
        last: false,
        books: []
    };

    handleReqError = (error) => { console.error(error); };

    handleBookReq = ({ pageNo, pageSize }) => {
        fetchBooks({ pageNo, pageSize })
            .then((res) => {
                const { content, last, pageNo, pageSize, total } = res;
                this.setState({ pageNo, pageSize, total, last, books: content });
            })
            .catch(this.handleReqError);
    };

    handleOpenInputModal = () => {
        this.setState({ inputModalVisible: true });
    };

    handleCloseInputModal = () => {
        this.setState({ inputModalVisible: false });
    };

    handleInputNewBook = book => {
        message.success('添加成功');
        this.setState({ inputModalVisible: false, books: [book, ...this.state.books.slice(0, 11)], total: this.state.total + 1 });
    };

    handleChangePage = (pageNo, pageSize) => {
        this.handleBookReq({ pageNo, pageSize });
    };

    deleteBookReq = (bookId) => {
        deleteBook(bookId)
            .then((book) => {
                this.setState({ books: [...this.state.books.filter(b => b.id !== book.id)], total: this.state.total - 1 });
            })
            .catch(this.handleReqError);
    };

    handleDeleteBook = (bookId, title) => {
        const _this = this;
        confirm({
            title: '确定删除?',
            content: title,
            okText: '删除',
            okType: 'danger',
            okButtonProps: {
                disabled: false,
            },
            cancelText: '取消',
            onOk() {
                _this.deleteBookReq(bookId);
            },
            onCancel() {}
        });
    };

    componentDidMount() {
        const { pageNo, pageSize } = this.state;
        this.handleBookReq({ pageNo, pageSize });
    }

    render() {
        const { inputModalVisible, books, pageNo, pageSize, total } = this.state;
        return (
            <Card>
                <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                    <Button type="primary" icon="book" onClick={this.handleOpenInputModal}>录入图书</Button>
                </div>
                <Grid fluid>
                    <Row>
                        {
                            books.map(book => (
                                <Col key={book.id} style={{ margin: '1rem' }}>
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<Link to={`./book/${book.id}`}>
                                            <img className="book-card-image" alt="example" src={book.image} />
                                        </Link>}
                                        actions={[
                                            <Popover overlayClassName="book-card-popover" content={[
                                                <p key="authors"><strong>作者：</strong>{book.authors.join('，')}</p>,
                                                <p key="translators"><strong>译者：</strong>{book.translators.join('，')}</p>,
                                                <p key="tags"><strong>标签：</strong>{book.tagGroup.join('，')}</p>,
                                                <p key="publisher"><strong>出版社：</strong>{book.publisher}</p>
                                            ]}>
                                                <Icon type="info-circle" />
                                            </Popover>,
                                            <Icon type="delete" onClick={() => { this.handleDeleteBook(book.id, book.title); }} />
                                        ]}
                                    >
                                        <p title={book.title} className="book-card-title">{book.title}</p>
                                        <Progress percent={book.progress || 0} size="small" />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row>
                        <Pagination showTotal={total => `共 ${total} 本`} defaultCurrent={pageNo} defaultPageSize={pageSize} total={total} onChange={this.handleChangePage} />
                    </Row>
                </Grid>
                <InputBookModal
                    visible={inputModalVisible} 
                    onCancel={this.handleCloseInputModal}
                    onPublish={this.handleInputNewBook}
                />
            </Card>
        );
    }
}

export default Wrapper(Book);
