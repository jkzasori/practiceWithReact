import React, { Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, 
            Breadcrumb, BreadcrumbItem, Button,
            Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap'; 
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';

    const required = (val) => val && val.length;
    const minLength = (len) => (val) => !(val) || (val.length >= len);
    const maxLength = (len) => (val) => val && (val.length<= len);

    function RenderDish ({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments ({comments, addComment, dishId}) {
        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map( (comment) => {
                            return(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p> 
                                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        }else {
            return(
                <div></div>
            )
        }
    }

    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
         
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        
        render(){
            return(
                <div >
                    <Button outline className="seconday" onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Sunmit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                            <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                        <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            minLength: 'Must be greater than 2 characters. ',
                                            maxLength: 'Must be 15 characters or less. '
                                        }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            className="form-control"
                                            rows="6"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }

    }
    const DishDetail = (props) => {
        if(props.dish !=null)
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} 
                           addComment={props.addComment}
                           dishId={props.dish.id} />
                </div>
            </div>
        );
        else 
            return(
                <div></div>
            )
    }


export default DishDetail;