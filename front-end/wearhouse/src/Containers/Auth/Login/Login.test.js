import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";

import axios from "axios";
import Login from "./Login";
import { ConnectedRouter } from "connected-react-router";

var stubInitialState = { isLoggedIn: false, loginErr: "Error" };

var stubErrorState = { isLoggedIn: false, loginErr: "Error" };

var mockStore = getMockStore(stubInitialState);
var mockStore_error = getMockStore(stubErrorState);

describe("<Login />", () => {
    let login, spyHistoryPush, spyAxios_post;

    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Login history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(login);
        let wrapper = component.find("#login");
        expect(wrapper.length).toBe(1);
    });

    it("should not call 'onLogin' when input is not valid", () => {
        const component = mount(login);
        let wrapper = component.find("#login-container #login-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should call 'onLogin' when clicked", () => {
        const component = mount(login);
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } });
        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } });

        let wrapper = component.find("#login-container #login-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(1);
    });

    it("should call 'onLogin' when enter key is pressed on email", () => {
        const component = mount(login);

        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } });
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } })
            .simulate("keyDown", { keyCode: 13 });

        expect(spyAxios_post).toHaveBeenCalledTimes(1);
    });

    it("should call 'onLogin' when enter key is pressed on password", () => {
        const component = mount(login);
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } });
        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } })
            .simulate("keyDown", { keyCode: 13 });

        expect(spyAxios_post).toHaveBeenCalledTimes(1);
    });

    it("should not call 'onLogin' when non-enter key is pressed", () => {
        const component = mount(login);

        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } })
            .simulate("keyDown", { keyCode: 12 });
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } })
            .simulate("keyDown", { keyCode: 12 });

        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should redirect to /signup", () => {
        const component = mount(login);
        let wrapper = component.find("#login-container #signup-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect to /browse", () => {
        mockStore = getMockStore({ isLoggedIn: true });
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Login history={history} />
                </ConnectedRouter>
            </Provider>
        );
        mount(login);
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should display <AuthError>", () => {
        login = (
            <Provider store={mockStore_error}>
                <ConnectedRouter history={history}>
                    <Login history={history} />
                </ConnectedRouter>
            </Provider>
        );
        const container = mount(login);
        let wrapper = container.find("#auth-error");
        expect(wrapper.length).toBe(1);

        let button = wrapper.find("#error-close");
        button.simulate("click");
    });
});
