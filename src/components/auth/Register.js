import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // add reduxForm to component export statement and tell it about different field names, then we can use the field component inside of the component itself

class Register extends Component {
    onSubmit = (formProps) => { // arrow function makes it so we don't have to worry about binding the context of onSubmit
        console.log(formProps); // when we use reduxForm we get a function on our props object called handleSubmit. Use this function to take email and password out of the form and provide it to the onSubmit callback
    };

    render() {
        const { handleSubmit } = this.props; // can't just add onSubmit as a callback directly to form tag. we have to destructure handleSubmit function from our props object


        return (
        <form onSubmit={handleSubmit(this.onSubmit)}> {/* now we can add an onSubmit and call handleSubmit and to handleSubmit we'll pass the callback we want to be executed when user submits the form, which is the onSubmit method we just created. we don't call onSubmit as soon as we render the form, however. onSubmit will be called in the future. we pass a reference to the onSubmit function to handleSubmit.*/}
            <fieldset>
                <label>Email</label>
            <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
            />
            </fieldset>
            <fieldset>
                <label>Password</label>
            <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
            />
            </fieldset>
            <button>Register</button>
        </form>
        );
    }
}

export default reduxForm({ form: 'register' })(Register); // now that we've wired up the form, we can make use of the inputs we'll need for email and password
