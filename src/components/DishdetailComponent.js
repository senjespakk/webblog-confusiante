import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

    function RenderComments({comments}){
        return(
            <div className="col-12 col-md-5 m-1" >
                <h4>comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return(
                            <li key={comment.id}>
                                <p>{comment.author}: {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                <p>---{comment.comment}</p>
                                <hr/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
        
    }

    function RenderDish({dish}) {
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card >
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardTitle className="m-0">{dish.name}</CardTitle>
                    <CardBody>{dish.description}</CardBody>
                </Card>
            </div>
        );
    }

    const DishDetail = (props) => {
        if (props.selected != null) {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.selected.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.selected.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div  className="row">
                        <RenderDish dish={props.selected}/>
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            );
        }
        else    
            return(
                <div></div>
            );
    };


export default DishDetail;
