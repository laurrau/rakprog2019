import React from "react";
import "./form.css";
import {Link} from "react-router-dom";

class SignupPage extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            confirmPassword:""
        };
    }
    handleSubmit = (event) =>{
      event.preventDefault();
        console.log("Submit", this.state);
        fetch("api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state),
        })
        .then( res => {
          console.log("response", res);
        })
        .catch( err =>{
          console.log("Error", err);
        });
};

handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
};

    render(){
        return(
            <div className="form">
            <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="email" placeholder="email address" name={"email"} onChange={this.handleChange}/>
            <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
            <input type="password" placeholder="password" name={"confirmPassword"} onChange={this.handleChange}/>
            <button>create</button>
            <p className="message">Already registered? <Link to={"/login"}>Sign In</Link></p>
          </form>
          </div>
        );
    }
}

export default SignupPage;