import axios from "../axios";
import { Component } from "react";

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: null,
        };
        // this solve the 'cannot access setState of undefined method
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/users", this.state)
            .then((response) => {
                this.props.onSuccess(); // calls onSuccess function, which is passed as a prop in Welcome
                console.log("[RegistrationForm] axios success", response);
            })
            .catch((error) => {
                console.log(
                    "[RegistrationForm] axios error",
                    error.response.data
                );
                this.setState({ error: error.response.data.message });
            });
    }
    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state);

        //
    }

    render() {
        return (
            <div className="registration-form">
                <p className="error">{this.state.error}</p>
                <form
                    className="general-position-register"
                    onSubmit={this.onFormSubmit}
                >
                    <input
                        className="input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.onInputChange}
                        required
                    />
                    <input
                        className="input"
                        type="text"
                        name="lastName" // lasttName
                        placeholder="Last Name"
                        onChange={this.onInputChange}
                        required
                    />
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onInputChange}
                        required
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onInputChange}
                        required
                    />
                    <button className="button-general" type="submit">
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
