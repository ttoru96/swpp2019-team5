import * as actionTypes from "../actions/actionTypes";

const initialState = {
    outfits: [],
    selectedOutfit: {
        id: "",
        image: "null",
        satisfactionValue: null,
        date: null,
        items: [],
        weather: { tempAvg: "", icon: "" },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_OUTFITS:
            return { ...state, outfits: action.outfits.reverse() };
        case actionTypes.GET_SPECIFIC_OUTFIT:
            return { ...state, selectedOutfit: action.target };
        case actionTypes.CREATE_OUTFIT: {
            const newOutfit = {
                image: action.image,
                satisfactionValue: action.satisfactionValue,
                date: action.date,
                id: action.id,
                items: action.items,
                weather: action.weather,
            };

            const new_outfits = state.outfits.concat(newOutfit);
            return {
                ...state,
                outfits: new_outfits,
                selectedOutfit: newOutfit,
            };
        }
        case actionTypes.DELETE_OUTFIT: {
            const deletedOutfits = state.outfits.filter(outfit => {
                return outfit.id !== parseInt(action.targetID);
            });
            return { ...state, outfits: deletedOutfits };
        }
        case actionTypes.EDIT_OUTFIT: {
            const edittedOutfits = state.outfits.map(oft => {
                return oft.id === parseInt(action.targetID)
                    ? action.new_outfit
                    : oft;
            });
            return {
                ...state,
                outfit: edittedOutfits,
                selectedOutfit: action.new_outfit,
            };
        }
        default:
            break;
    }
    return state;
};
export default reducer;
