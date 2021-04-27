import axios from "../axios";
import { Component } from "react";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: null,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/login", this.state)
            .then((response) => {
                this.props.onSuccess(); // calls onSuccess function, which is passed as a prop in Welcome
                console.log("[LoginForm] axios success", response);
            })
            .catch((error) => {
                console.log("[LoginForm] axios error", error.response.data);
                this.setState({ error: error.response.data.message });
            });
    }
    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="login-form">
                <p className="error">{this.state.error}</p>
                <form
                    className="general-position mobile-view-login-form"
                    onSubmit={this.onFormSubmit}
                >
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
                    <button
                        className="button-general button-login"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
