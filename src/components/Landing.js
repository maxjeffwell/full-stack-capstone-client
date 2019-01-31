import React from 'react';
import { Footer } from './Footer';

const Landing = () => {
    return (
        <div className="landing-title">
            <h1>
                educationELLy
            </h1>
            <div>
            Student data at your fingertips
            </div>
            Quickly access student lists
            <div>
            Improve collaboration and manage workflows
            </div>
            <div id='landing-page'>
                Click the "Log in" link in the right hand corner and enter your demo account information to access your student list and update student ELL student information!
            </div>
            <div id="demo-account">
                Use demo email: DemoELL and demo password: Passworddemo
            </div>
          <Footer />
        </div>
    );
};

export default Landing;
