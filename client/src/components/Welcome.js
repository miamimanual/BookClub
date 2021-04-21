import { HashRouter, Route, Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function Welcome() {
    function onSuccess() {
        window.location.href = "/";
    }

    return (
        <HashRouter>
            <Route exact path="/">
                <section className="welcome general-position">
                    <h2>Bookclub</h2>
                    <h4>
                        Share your passion for books with people all over the
                        world
                    </h4>

                    <RegistrationForm onSuccess={onSuccess}></RegistrationForm>
                    <footer className="welcome-footer">
                        Already have an <Link to="/login">account</Link>
                        <br></br>
                    </footer>
                </section>
            </Route>
            <Route path="/login">
                <section className="login general-position">
                    <h2>Welcome to Munity</h2>
                    <LoginForm onSuccess={onSuccess}></LoginForm>
                    <footer>
                        No account? <Link to="/">Register</Link>{" "}
                    </footer>
                </section>
            </Route>
        </HashRouter>
    );
}

/*
   <Route path="/password-reset">
                <section className="password-reset general-position">
                    <h2>Welcome to Munity</h2>

                    <ResetPassword />
                    <footer></footer>
                </section>
            </Route>*/
