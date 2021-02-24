import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Row, Label, Col, Form } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLenght = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("current state: " + JSON.stringify(values));
        alert("Your comment is: "+JSON.stringify(values));
    }

    render() {
        return(
            <React.Fragment>
                <Button onClick={this.toggleModal}>
                    <span className="fa fa-comment fa-lg" color="primary">Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>write comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="contactType" md={2}>Rating</Label>
                                <Col md={2}>
                                    <Control.select model=".contactType" name="contactType" 
                                        className="form-control">
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Col md={2}>
                                    <Control.text model=".author" id="author" name="author" 
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLenght: maxLenght(12)
                                        }}
                                    />
                                    <Errors
                                        className="text-warning" model=".author" show="touched"
                                        messages={{
                                            required: 'We need your name',
                                            minLength: 'Too short',
                                            maxLenght: 'Too long'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Author</Label>
                                <Col md={2}>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                        rows="5"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 8, offset: 2}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CommentForm;