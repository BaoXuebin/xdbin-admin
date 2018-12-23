import React, { Component } from 'react';
import { Card } from 'antd';
import Wrapper from '../../_Wrapper';
import { fetchBookById } from '../../../api/BookReq';
import BookInfo from '../../../containers/ext/book/BookInfo';
import Loader from '../../../components/common/Loader';
import BookComment from '../../../containers/ext/book/BookComment';

class Detail extends Component {
    state = {
        loading: false,
        book: null
    };

    bookId = this.props.params.bookId;

    handleReqError = (error) => { console.error(error); };

    handleReqBook = () => {
        this.setState({ loading: true });
        const { bookId } = this.props.params;
        fetchBookById(bookId)
            .then((book) => {
                this.setState({ book });
                this.props.setBreadcrumbName(book.title);
            })
            .catch(this.handleReqError)
            .finally(() => { this.setState({ loading: false }); });
    };

    componentDidMount() {
        this.handleReqBook();
    }

    render() {
        const { book, loading } = this.state;
        if (loading || !book) {
            return <Loader />
        }
        return (
            <Card>
                <div style={{ maxWidth: '1000px' }}>
                    <BookInfo book={book} />
                    <div style={{ height: '10px' }} />
                    <BookComment bookId={this.bookId} />
                </div>
            </Card>
        );
    }
}

export default Wrapper(Detail);
