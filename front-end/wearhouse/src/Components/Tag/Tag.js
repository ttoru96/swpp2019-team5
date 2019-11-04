import React, { Component } from "react";
import "./Tag.scss";
import { faPen, faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//props : tag(tag_name) ex) "Black", delete (function), edit(function)
class Tag extends Component {
    componentDidMount() {
        this.setState({
            tag_name: this.props.tag,
            editMode: this.props.editMode, //it tells whether [x, pencil image] show up next to tag name
            editTag: false, //it tells whether tag_name is editable.
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps)
            this.setState({
                tag_name: this.props.tag,
                editMode: this.props.editMode,
                editTag: false,
            });
    }
    state = { tag_name: "", editMode: null, editTag: false };

    onEditTag = () => {
        this.props.edit(this.state.tag_name);
        this.setState({ editTag: false });
    };
    render() {
        let label = <div className="tag-in-outfit">{this.state.tag_name}</div>;
        if (this.state.editMode) {
            //in case where not edit mode then props should be false.
            if (!this.state.editTag) {
                //tag_name is not editable
                label = (
                    <div className="tag-in-outfit">
                        #{this.state.tag_name + " "}
                        <div
                            className="edit-tag"
                            onClick={() => this.setState({ editTag: true })}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </div>
                        <div className="delete-tag" onClick={this.props.delete}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>
                );
            } else {
                //tag_name is editable
                console.log(this.state.editTag);
                label = (
                    <div className="tag-in-outfit">
                        <input
                            className="edit-tag-input"
                            value={this.state.tag_name}
                            onChange={e =>
                                this.setState({ tag_name: e.target.value })
                            }
                        ></input>
                        <div className="edit-tag" onClick={this.onEditTag}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <div className="delete-tag" onClick={this.props.delete}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>
                );
            }
        }
        return <div className="Tag">{label}</div>;
    }
}
export default Tag;