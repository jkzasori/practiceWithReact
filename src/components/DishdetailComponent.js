import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    renderComment(dish){
        <div className="col-12 col-md-5 m-1" >
                    <h3>Comments</h3>
                    {dish.comments.map( (comments) => {
                        return(
                            <div key={comments.id}>
                            <p>{comments.comment}</p> <p>--{comments.author}, {comments.date}</p>
                            </div>
                        )
                    })
                    }
                </div>
    }
    renderDish(dish) {
        if (dish != null) {
            return(
            <div className="row">
                <div className="col-12 col-md-5 m-1" >
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle heading>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>
                    {dish.comments.map( (comments) => {
                        return(
                            <div key={comments.id}>
                            <p>{comments.comment}</p> <p>--{comments.author}, {comments.date}</p>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }
    render(){
        return(
            <div className="row red" dishdetail={this.props}>
                <div className="col-12" >
                    {this.renderDish(this.props.dishdetail)}
                </div>
            </div>
        );
    }
}

export default DishDetail;