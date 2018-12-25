import React, { Component } from 'react';
import { Card } from 'antd';
import Wrapper from '../../_Wrapper';
import { fetchBookById, updateReadProgress } from '../../../api/BookReq';
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

    handleUpdateProgressReq = (progress) => {
        updateReadProgress(this.state.book.id, progress)
            .then((bookProgress) => {
                if (bookProgress.status > 200) { this.handleReqError('Error update progress.'); }
                this.setState({ book: Object.assign(this.state.book, { progress: bookProgress.progress }) });
            })
            .catch(this.handleReqError);
    };

    handleMinusProgress = () => {
        this.handleUpdateProgressReq(this.state.book.progress - 1);
    };

    handlePlusProgress = () => {
        this.handleUpdateProgressReq(this.state.book.progress + 1);
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
                    <BookInfo book={book} onMinusProgress={this.handleMinusProgress} onPlusProgress={this.handlePlusProgress} />
                    <div style={{ height: '10px' }} />
                    <BookComment bookId={this.bookId} />
                </div>
            </Card>
        );
    }
}

export default Wrapper(Detail);
