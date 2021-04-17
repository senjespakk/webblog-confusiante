import React from 'react';
import CommentForm from "./CommentComponent";
import { Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



    function RenderComments({comments, addComment, dishId}){
        return(
            <div className="col-12 col-md-5 m-1" >
                <h4>comments</h4>
                <ul className="list-unstyled">
                    <Stagger in >
                        {comments.map((comment) => {
                            return(
                                <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.author}: {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                        <p>---{comment.comment}</p>
                                        <hr/>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
        
    }

    function RenderDish({dish}) {
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{exitTransform: 'scale(0.5 translateY(-50%)'}}>
                    <Card >
                        <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
                        <CardTitle className="m-0">{dish.name}</CardTitle>
                        <CardBody>{dish.description}</CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }

        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if (props.selected != null) {
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
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.selected.id}
                        />
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
