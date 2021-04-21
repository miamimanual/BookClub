import { Component } from "react";
import axios from "../axios";

class ProfilePictureUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload_picture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                this.props.onUpload(response.data.profilePicURL);
            });
    }

    onChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    render() {
        return (
            <div className="modal-background">
                <div className="modal">
                    <button
                        className="button-close"
                        onClick={this.props.onClose}
                    >
                        x
                    </button>
                    <form className="uploader-form" onSubmit={this.onSubmit}>
                        <h3>Please choose your new profile picture</h3>
                        <input
                            type="file"
                            name="file"
                            onChange={this.onChange}
                            required
                        />
                        <br></br>
                        <button
                            className="button-general button-upload"
                            type="submit"
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProfilePictureUploader;
