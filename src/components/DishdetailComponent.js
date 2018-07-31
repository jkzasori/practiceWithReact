import React, { Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, 
            Breadcrumb, BreadcrumbItem, Button,
            Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap'; 
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';

    const required = (val) => val && val.length;
    const minLength = (len) => (val) => !(val) || (val.length >= len);
    const maxLength = (len) => (val) => val && (val.length<= len);

    class DishDetail extends Component {
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
        }
        handleSubmit(values){
            console.log("Current State is: "+JSON.stringify(values));
            alert("Current State is: "+JSON.stringify(values));
         
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        

        render(){

            const RenderDish = ({dish}) => {
                return(
                    <div >
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
            const RenderComments = ({comments})=> {
                if(comments != null){
                    return(
                        <div >
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
                        </div>
                    );
                }else {
                    return(
                        <div>ttt</div>
                    )
                }
            }

            if(this.props.dish !=null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments} />
                            <Button outline className="seconday" onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
                        </div>
                    </div>
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
                                        <Label htmlFor="yourname">Your Name</Label>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                        <Errors 
                                        className="text-danger"
                                        model=".yourname"
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
            else 
                return(
                    <div></div>
                )
        }

    }


export default DishDetail;