import React from 'react';
import { Button } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Progress } from 'antd';

import './style/BookInfo.less';

const ButtonGroup = Button.Group;
const BookInfo = ({ book, onMinusProgress, onPlusProgress }) => (
    <Grid fluid className="ins">
        <Row>
            <h2>{book.title}</h2>
        </Row>
        <Row>
            <Col>
                <img className="book-info-image" src={book.image} alt={book.title} />
            </Col>
            <Col xs={6}>
                <div style={{ marginLeft: '1rem' }}>
                    <div><label>ISBN：</label>{book.isbn}</div>
                    <div><label>标题：</label>{book.title}</div>
                    <div><label>副标题：</label>{book.subTitle}</div>
                    <div><label>作者：</label>{book.authors.join('，')}</div>
                    <div><label>译者：</label>{book.translators.join('，')}</div>
                    <div><label>出版日期：</label>{book.publishDate}</div>
                    <div><label>页数：</label>{book.pages}</div>
                    <div><label>价格：</label>{book.price}</div>
                    <div><label>出版社：</label>{book.publisher}</div>
                    <div><label>标签：</label>{book.tagGroup.join('，')}</div>
                    <div><label>豆瓣链接：</label><a href={book.doubanLink} target="_blank">{book.doubanLink}</a></div>
                </div>
            </Col>
            <Col xs={3} style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Progress type="circle" percent={book.progress || 0} strokeWidth={10} strokeColor="green" />
                <p style={{ marginTop: '1rem' }}>阅读进度</p>
                <div>
                    <ButtonGroup>
                        <Button icon="minus" onClick={onMinusProgress} />
                        <Button icon="plus" onClick={onPlusProgress} />
                    </ButtonGroup>
                </div>
            </Col>
        </Row>
        <Row>
            <Col style={{ marginTop: '1rem' }}>
                <div><label>简介：</label></div>
                <div>{book.summary}</div>
            </Col>
        </Row>
    </Grid>
);

export default BookInfo;
