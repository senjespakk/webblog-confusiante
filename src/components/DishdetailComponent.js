import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";


    function RenderComments(dish){
        const comment = dish.comments.map((com) => {
            return(
                <div key={com.id} >
                    <ul className="list-unstyled">
                        <li>{com.author} {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</li>
                        <li>{com.comment}</li>
                    </ul>
                </div>
            );
        });
        return(
            <div>{comment}</div>
        );

        
    }

    function RenderDish(props) {

        const dish = props.selected
        if (dish != null) {
            return (
                <div className="container">
                    <div key={dish.id}  className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card >
                                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                                <CardTitle className="m-0">{dish.name}</CardTitle>
                                <CardBody>{dish.description}</CardBody>
                            </Card>

                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>

                            {RenderComments(dish)}
                        </div>
                    </div>
                </div>
            );
        }
        else
            return(
                <div></div>
            );

    }



export default RenderDish;