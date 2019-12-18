import React from "react";
//import Header from "../components/Header.jsx";
import ItemList from "../components/ItemsList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import PropTypes from "prop-types";
import Dropdown from "../components/SortDropdown.jsx";

//import {phones, laptops} from "./mydatabase.jsx";


class Homepage extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      sortDirection: -1,
      items: [],
      allCategories: ["phones", "laptops"],
      selectedCategories: ["phones"],
    };
  }

  componentDidMount(){
    this.fetchItems();
  }

  fetchItems = () => {
    fetch("api/v1/products").then(res => {
      console.log("res", res);
      return res.json();
    })
    .then(items => {
      console.log("items", items);
      this.setState({items});
    })
    .catch(err => {
      console.log("error", err);
    });
  };

  handleSortDropdown = (sortDirection) => {
    this.setState({
      sortDirection,
    });
  };

  handleDropdown = (event) => {
      console.log(event.target.value, event.target.name);
      if(this.isSelected(event.target.name)){
        const clone = this.state.selectedCategories.slice();
        const index = this.state.selectedCategories.indexOf(event.target.name);
        clone.splice(index, 1);
        this.setState({
          selectedCategories: clone
        });
      }
      else {
        this.setState( {
          selectedCategories: this.state.selectedCategories.concat([event.target.name])
        });
      }
    };

  getVisibleItems = () => {
    console.log(this.state.items.filter( item => item.category === this.state.selectedCategory));
    return this.state.items
    .filter(item => this.isSelected(item.category))
      .sort( (a, b) => {
        switch (this.state.sortDirection) {
          case -1: return b.price - a.price;
          case 1: return a.price - b.price;
        }
      });
    };

  isSelected = (name) => this.state.selectedCategories.indexOf(name) >=0;

  render() {
    const items = this.getVisibleItems();
    console.log("state", this.state);
    return(
      <>
        <div className={"items-header-wrapper"}>
          <ItemFilters
            allCategories={this.state.allCategories}
            handleDropdown={this.handleDropdown}
            isSelected={this.isSelected}
            />

            <div>
              Items found {items.length} {this.state.selectedCategories.join(", ")}
            </div>
            <Dropdown
              direction={this.state.sortDirection}
              onChange={this.handleSortDropdown}
            />
          </div>
        <ItemList items={items}/>
      </>
  );
  }
}
const ItemFilters = ({allCategories, handleDropdown, isSelected}) => {
  return (
    <div>
      {
        allCategories.map( categoryName => {
          return(
            <Checkbox key={categoryName}
              name={categoryName}
              onChange={handleDropdown}
              checked={isSelected(categoryName)}
              />
          );
        })
      }
    </div>
  );
};
ItemFilters.propTypes = {
  allCategories: PropTypes.array.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};
export default Homepage;