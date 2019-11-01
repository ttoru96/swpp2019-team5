import React from "react";
import { faTimes, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UploadImage.scss";

class UploadImage extends React.Component {
    state = { selectedImageURL: null };

    onClickClosePopUpButton = () => {
        this.props.onClosePopUp();
    };

    isImageFile = file => {
        return file && file["type"].split("/")[0] === "image";
    };

    onFileChanged = event => {
        if (event.target.files && event.target.files[0]) {
            if (this.isImageFile(event.target.files[0])) {
                this.setState(
                    {
                        ...this.state,
                        selectedImageURL: URL.createObjectURL(
                            event.target.files[0],
                        ),
                    },
                    () => {
                        console.log(this.state.selectedImageURL);
                    },
                );
            } else {
                alert("you need to input image file");
                console.log(event.target.files[0]);
                console.log(this.state.selectedImageURL);
            }
        }
    };

    render() {
        console.log(this.state.selectedImageURL);

        return (
            <div id="upload-image">
                <div className="overlay"></div>
                <div id="popup-container">
                    <div id="upload-image-header">
                        <div className="header-column">
                            <div id="upload-image-title">
                                <p>Upload your outfit!</p>
                            </div>
                        </div>
                        <div className="header-column">
                            <button
                                id="cancel-upload-image"
                                onClick={this.onClickClosePopUpButton}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    id="cancel-upload-image-icon"
                                />
                            </button>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="choose-file"
                        onChange={this.onFileChanged}
                    />

                    <img
                        id="selected-image-file"
                        src={this.state.selectedImageURL}
                        alt="selected image file"
                    />
                </div>
            </div>
        );
    }
}

export default UploadImage;
