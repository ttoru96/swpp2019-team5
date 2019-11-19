import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

export const postImage_ = outfit_metadata => {
    return {
        type: actionTypes.POST_IMAGE,
        image: outfit_metadata.image,
        items: outfit_metadata.items,
    };
};

export const postImage = image => {
    return dispatch => {
        return axios
            .post("/api/image/", image)
            .then(res => {
                dispatch(postImage_(res.data));
            })
            .then(() => dispatch(push("/createOutfit")))
            .catch(err => {
                dispatch(push("/createOutfit"));
            });
    };
};