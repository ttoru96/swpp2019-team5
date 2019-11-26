import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import { ConnectedRouter } from "connected-react-router";

import Item from "./Item";

let stubInitialState_item = {
    items: [],
    selectedOutfitItems: [],
    selectedItem: null,
    option_list: [
        {
            id: 1,
            category: "UpperBody",
            tags: ["T-shirt", "2019"],
        },
        {
            id: 2,
            category: "UpperBody",
            tags: ["fall", "stripe", "blue"],
        },
        {
            id: 3,
            category: "UpperBody",
            tags: ["coat", "wool", "pink"],
        },
        {
            id: 4,
            category: "UpperBody",
            tags: ["mom", "hand-made", "check-shirt"],
        },
    ],
};
let mockStore = getMockStore(
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
    stubInitialState_item,
);

describe("<Item/>", () => {
    let item;
    beforeEach(() => {
        item = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Item
                        editMode={true}
                        item={{ tags: ["black", "T-shirt"] }}
                        applyEdit={jest.fn()}
                        delete={jest.fn()}
                    />
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render properly", () => {
        const component = mount(item);

        expect(component.find(".Item").length).toBe(1);
    });

    it("should edit item values", () => {
        const component = mount(item);

        let wrapper = component.find(".tag-input");
        wrapper.simulate("change", { target: { value: "Test" } });
        wrapper.simulate("keyup", {
            keyCode: 13,
        });
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(2);
        expect(wrapper.value).toBe(undefined);
    });

    it("should add tag", () => {
        const component = mount(item);
        let wrapper = component.find(".tag-input");
        wrapper.instance().value = "new_tag";
        wrapper.simulate("keyup", {
            keyCode: 13,
        });
        expect(component.find(".tag-in-outfit").length).toBe(3);
    });

    it("should delete tags", () => {
        const component = mount(item);

        let wrapper = component.find(".delete-tag").at(0);
        wrapper.simulate("click");
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(1);

        wrapper = component.find(".tag-input");
        wrapper.simulate("click");
        wrapper.simulate("keyup", {
            keyCode: 8,
        });
        count = component.find(".tag-in-outfit");
        expect(count.length).toBe(0);
    });

    // it("should delete item", () => {
    //     const component = mount(item);

    //     let wrapper = component.find(".item-deleter").at(0);
    //     wrapper.simulate("click");
    //     expect(component.find(".Item").length).toBe(3);
    // });

    it("should change state", () => {
        const component = mount(item);
        let count = component.find(".tag-in-outfit");
        expect(count.length).toBe(2);
    });
});
