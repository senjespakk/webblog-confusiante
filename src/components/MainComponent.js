import React, { Component } from 'react';
import  Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import About from './AboutComponent';
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes,  fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }
};

const mapDispatchToProps = (dispatch) => ({
  postFeedback: (firstname, lastname, telnum, agree, contackType, message) => dispatch(postFeedback(firstname, lastname, telnum, agree, contackType, message)),
  postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});
class Main extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }


  render() {
    
    const HomePage = () => {
      return(
        <Home
          dish={this.props.dishes.dishftdes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promos.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}

         />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail selected={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments= {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.postComment}
        />
      );
    };


    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage}/>
              <Route exact path="/menu" component={() => <Menu  dishes={this.props.dishes}/>}/>
              <Route path="/menu/:dishId" component={DishWithId}/>
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
              <Redirect to="/home"/>
            </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
