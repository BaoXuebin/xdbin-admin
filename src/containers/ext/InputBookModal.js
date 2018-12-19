import React, { Component } from 'react';
import { Modal, Form, Input, message, Button } from 'antd';

import { fetchBookByISBN, saveBook } from '../../api/BookReq';

const FormItem = Form.Item;
const { TextArea, Search } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};

class InputBookModal extends Component {

    state = {
        loading: false
    };

    handleQueryByISBN = () => {
        if (this.state.isbn) {
            this.setState({ loading: true });
            fetchBookByISBN(this.state.isbn)
                .then((res) => {
                    const { isbn13, title, subtitle, author, translator, tags, publisher, pubdate, pages, price, summary, alt, image } = res;
                    this.setState({
                        title, author, translator, publisher, pages, price, image, summary,
                        isbn: isbn13,
                        subTitle: subtitle,
                        tags: tags.map(t => t.name),
                        publishDate: pubdate,
                        doubanLink: alt
                    });
                })
                .catch((error) => { console.error(error); })
                .finally(() => { this.setState({ loading: false }); });
        }
    };

    handleInputNewBook = () => {
        const { isbn, title, subTitle, publisher, publishDate,
            pages, price, summary, image, doubanLink } = this.state;
        saveBook({
            isbn, title, subTitle, publisher, pages, price, summary, image, doubanLink,
            publishDate,
            authors: this.state.author,
            translators: this.state.translator,
            tagGroup: this.state.tags
        })
            .then((res) => {
                if (res.code && res.code !== 200) {
                    message.error(res.error);
                    return;
                }
                this.handleClear();
                this.props.onPublish(res);
            })
            .catch((error) => { console.error(error); });
    }

    handleChangeIsbn = (e) => {
        this.setState({ isbn: e.target.value });
    };

    handleChangeTitle = (e) => {
        this.setState({ title: e.target.value });
    };

    handleChangeSubTitle = (e) => {
        this.setState({ subTitle: e.target.value });
    };

    handleChangeAuthor = (e) => {
        this.setState({ author: e.target.value });
    };
    
    handleChangeTranslator = (e) => {
        this.setState({ translator: e.target.value });
    };

    handleChangeTags = (e) => {
        this.setState({ tags: e.target.value });
    };

    handleChangePublisher = (e) => {
        this.setState({ publisher: e.target.value });
    };

    handleChangePublishDate = (e) => {
        this.setState({ publishDate: e.target.value });
    };

    handleChangePages = (e) => {
        this.setState({ pages: e.target.value });
    };

    handleChangePrice = (e) => {
        this.setState({ price: e.target.value });
    };

    handleChangeSummary = (e) => {
        this.setState({ summary: e.target.value });
    };

    handleChangeImage = (e) => {
        this.setState({ image: e.target.value });
    };

    handleChangeDoubanLink = (e) => {
        this.setState({ doubanLink: e.target.value });
    };

    handleClear = () => {
        this.setState({
            isbn: '',
            title: '',
            subTitle: '',
            author: '',
            translator: '',
            tags: '',
            publisher: '',
            publishDate: '',
            pages: '',
            price: '',
            summary: '',
            image: '',
            doubanLink: ''
        });
    };

    render() {
        const { isbn, title, subTitle, author, translator, tags, publisher, publishDate,
                pages, price, summary, image, doubanLink, loading } = this.state;
        return (
            <Modal
                title="录入图书"
                width={650}
                visible={this.props.visible}
                onOk={this.handleInputNewBook}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="ISBN"
                    >
                        <Input placeholder="ISBN" value={isbn} onChange={this.handleChangeIsbn} />
                        <Button onClick={this.handleQueryByISBN} loading={loading}>查询</Button>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                    >
                        <Input placeholder="标题" value={title} onChange={this.handleChangeTitle} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="副标题"
                    >
                        <Input placeholder="副标题" value={subTitle} onChange={this.handleChangeSubTitle} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="作者"
                    >
                        <Input placeholder="作者" value={author} onChange={this.handleChangeAuthor} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="译者"
                    >
                        <Input placeholder="译者" value={translator} onChange={this.handleChangeTranslator} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="标签"
                    >
                        <Input placeholder="标签" value={tags} onChange={this.handleChangeTags} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="出版社"
                    >
                        <Input placeholder="出版社" value={publisher} onChange={this.handleChangePublisher} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="发行日期"
                    >
                        <Input placeholder="发行日期" value={publishDate} onChange={this.handleChangePublishDate} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="页数"
                    >
                        <Input placeholder="页数" value={pages} onChange={this.handleChangePages} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="价格"
                    >
                        <Input placeholder="价格" value={price} onChange={this.handleChangePrice} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                        <TextArea placeholder="简介" autosize={{ minRows: 2, maxRows: 6 }} value={summary} onChange={this.handleChangeSummary} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="封面图片"
                    >
                        <Input placeholder="封面图片" value={image} onChange={this.handleChangeImage} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="豆瓣链接"
                    >
                        <Input placeholder="豆瓣链接" value={doubanLink} onChange={this.handleChangeDoubanLink} />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default InputBookModal;
