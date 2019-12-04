import React from "react";
import { connect } from "react-redux";
import {
    faSearch,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TempSlider, marks } from "./sliderStyles";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

import Outfit from "../../Components/Outfit/Outfit";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import Recommendation from "../Recommendation/Recommendation";
import Tag from "../../Components/Tag/Tag";

import * as actionCreators from "../../store/actions/index";
import "./Browse.scss";

class Browse extends React.Component {
    state = {
        mode: "browse",
        search_query: "",

        searchOptionsVisible: false,
        searchOptions: {
            searchMode: "Outfit",
            searchArray: [],
            tempMax: 50,
            tempMin: -30,
            satisfaction: "0",
        },
    };

    componentDidMount() {
        this.props.getAllOutfits();
    }
    onClickCalendar = () => {
        this.props.history.push("/calendar");
    };
    onClickOutfit = outfit => {
        this.props.history.push("/outfitDetail/" + outfit.id);
    };

    onSearchInput = e => {
        // deprecated?
        this.setState({ search_query: e.target.value });
        if (this.state.searchOptions.searchArray.length >= 1) {
            this.setState({ mode: "search" }); //check whether search query exists
        } else {
            this.setState({ mode: "browse" });
        }
    };

    showSearchOptions = () => {
        if (this.state.searchOptionsVisible) {
            this.setState({
                searchOptionsVisible: false,
            });
        } else {
            this.setState({
                searchOptionsVisible: true,
            });
        }
    };

    onSelectSearchOption = value => {
        this.setState({
            searchOptions: { ...this.state.searchOptions, searchMode: value },
        });
        this.showSearchOptions();
    };

    onTempChange = (event, value) => {
        this.setState({
            searchOptions: {
                ...this.state.searchOptions,
                tempMax: value[0],
                tempMin: value[1],
            },
        });
    };

    handleRadioChange = event => {
        this.setState({
            searchOptions: {
                ...this.state.searchOptions,
                satisfaction: event.target.value, // Saved as string, need to use parseInt() to function as search filter
            },
        });
    };

    addTag = e => {
        let tags = this.state.searchOptions.searchArray;
        if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 9) {
            if (
                tags.indexOf(this.state.search_query) === -1 &&
                this.state.search_query !== ""
            ) {
                tags.push(this.state.search_query);
                this.setState({
                    searchOptions: {
                        ...this.state.searchOptions,
                        searchArray: tags,
                    },
                });
                this.setState({ mode: "search" });
            }
            e.target.value = "";
            this.setState({ search_query: "" });
        } else if (this.state.search_query === "" && e.keyCode === 8) {
            tags.pop();
            this.setState({
                searchOptions: {
                    ...this.state.searchOptions,
                    searchArray: tags,
                },
            });
            if (tags.length === 0) {
                this.setState({ mode: "browse" });
            }
        }
    };

    isMatchSearchArray = (array1, array2) => {
        return array2.every(function(value) {
            return array1.indexOf(value) >= 0;
        });
    };

    render() {
        let container = null;

        const outfits = this.props.outfits.map(outfit => {
            return (
                <Outfit
                    key={outfit.id}
                    image={outfit.imageUrl}
                    satisfactionValue={outfit.satisfactionValue}
                    date={outfit.date}
                    clicked={() => this.onClickOutfit(outfit)}
                />
            );
        });

        let searchQuery = this.state.searchOptions.searchArray.map(
            (tag, index) => {
                return <Tag className="tag" tag={tag} key={index} />;
            },
        );

        const searchedResultbyOutfit = this.props.outfits.map(outfit => {
            let tagList = [];
            outfit.items.map(item => {
                tagList.push(...item.tags);
            });
            if (
                this.isMatchSearchArray(
                    tagList,
                    this.state.searchOptions.searchArray,
                )
            ) {
                return (
                    <Outfit
                        key={outfit.id}
                        image={outfit.imageUrl}
                        satisfactionValue={outfit.satisfactionValue}
                        date={outfit.date}
                        clicked={() => this.onClickOutfit(outfit)}
                    />
                );
            }
        });

        const searchedResultbyItem = this.props.outfits.map(outfit => {
            let searched = false;
            outfit.items.map(item => {
                if (
                    this.isMatchSearchArray(
                        item.tags,
                        this.state.searchOptions.searchArray,
                    )
                ) {
                    searched = true;
                }
            });
            if (searched) {
                return (
                    <Outfit
                        key={outfit.id}
                        image={outfit.imageUrl}
                        satisfactionValue={outfit.satisfactionValue}
                        date={outfit.date}
                        clicked={() => this.onClickOutfit(outfit)}
                    />
                );
            }
        });
        switch (this.state.mode) {
            case "browse":
                container = (
                    <div id="outfit-list">
                        <Recommendation />
                        {outfits}
                    </div>
                );
                break;
            case "search":
                container = (
                    <div id="outfit-list">
                        <div id="search-filters">
                            <div id="slider-container">
                                <div className="filter-label">
                                    Temperature Range:
                                </div>
                                <TempSlider
                                    id="slider"
                                    valueLabelDisplay="auto"
                                    orientation="vertical"
                                    max={50}
                                    min={-30}
                                    defaultValue={[-30, 50]}
                                    marks={marks}
                                    onChangeCommitted={this.onTempChange}
                                    valueLabelFormat={x => {
                                        return x + "°C";
                                    }}
                                />
                            </div>
                            <div id="satisfaction-container">
                                <div className="filter-label">
                                    Satisfaction:
                                </div>
                                <RadioGroup
                                    className="radio-group"
                                    aria-label="satisfcation"
                                    name="Satisfaction"
                                    defaultValue="0"
                                    value={
                                        this.state.searchOptions.satisfaction
                                    }
                                    onChange={this.handleRadioChange}
                                >
                                    <FormControlLabel
                                        value="0"
                                        control={<Radio disableRipple />}
                                        label="All Values"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio disableRipple />}
                                        label="1"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio disableRipple />}
                                        label="2"
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio disableRipple />}
                                        label="3"
                                    />
                                    <FormControlLabel
                                        value="4"
                                        control={<Radio disableRipple />}
                                        label="4"
                                    />
                                    <FormControlLabel
                                        value="5"
                                        control={<Radio disableRipple />}
                                        label="5"
                                    />
                                </RadioGroup>
                            </div>
                        </div>
                        <div id="search-result">
                            {this.state.searchOptions.searchMode === "Outfit"
                                ? searchedResultbyOutfit
                                : searchedResultbyItem}
                        </div>
                    </div>
                );
                /*show the search result : container = ~~~*/
                ///get outfit list and render them
                break;
            default:
                break;
        }
        return (
            <div id="browse">
                <div id="search-container">
                    <div id="select-searchmode">
                        <div id="selected-option">
                            <div id="selected-text">
                                {this.state.searchOptions.searchMode}
                            </div>
                            <div
                                id="selectButton"
                                onClick={() => this.showSearchOptions()}
                            >
                                {!this.state.searchOptionsVisible ? (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                )}
                            </div>
                        </div>
                        <div
                            id="dropdown-selection"
                            className={this.state.searchOptionsVisible.toString()}
                        >
                            <div
                                className="option"
                                onClick={() =>
                                    this.onSelectSearchOption("Outfit")
                                }
                            >
                                Outfit
                            </div>
                            <div
                                className="option"
                                onClick={() =>
                                    this.onSelectSearchOption("Item")
                                }
                            >
                                Item
                            </div>
                        </div>
                    </div>
                    <div id="search-input">
                        <div id="search-input-queries">{searchQuery}</div>
                        <input
                            id="search-input-text"
                            value={this.state.search_query}
                            onKeyDown={e => this.addTag(e)}
                            onChange={e => this.onSearchInput(e)}
                            placeholder="Search by tag..."
                        />
                    </div>
                    <button id="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <button id="calendar-button" onClick={this.onClickCalendar}>
                    Calendar
                </button>
                {container}
                <AddOutfit />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        outfits: state.outfit.outfits,
        selectedOutfit: state.outfit.selectedOutfit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllOutfits: () => dispatch(actionCreators.getOutfits()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Browse);
