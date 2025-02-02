import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser, googleSignInStart, emailSignInStart } from './redux/user/user.actions'
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument, onSnapshot, onAuthStateChanged, addCollectionAndDocuments } from './firebase/firebase.utils.js';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    // const { setCurrentUser } = this.props;
    const { checkUserSession } = this.props;
    checkUserSession();

    // this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     onSnapshot(userRef, (snapShot => { // the onSnapshot have something to do with the errors
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //     }))
    //   } else {
    //     setCurrentUser(userAuth)
    //   }
    // })
  }

  componentWillUnmount(){
    // this.unsubscribeFromAuth();
  }
  render (){
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route path='/signin' render={() => this.props.currentUser ?
          (<Redirect to='/' />) :
          (<SignInAndSignUpPage />)}
        />
      </Switch>
    </div>
  )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
