import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButtom from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument, createUserWithEmailAndPassword } from '../../firebase/firebase.utils';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

class SignUp extends React.Component {
  constructor(){
    super();
    this.state = initialState;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    console.log(`displayName when submitting the form: ${displayName}`);
    console.log('auth object when submitting the form');
    console.log(auth);
    if (password != confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('LOGGING user:');
      console.log(user);
      console.log('LOGGING auth:');
      console.log(auth);
      await createUserProfileDocument(user, { displayName })
      this.state = (initialState);
    } catch (err) {
      console.error(err);
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  render(){
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Display Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButtom type='submit'>SIGN UP</CustomButtom>
        </form>
      </div>
    )
  }
}

export default SignUp;
