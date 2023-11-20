import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filter, setFilter] = useState("All")
  const [filteredFoods, setFilteredFoods] = useState({})

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();

    setFoods([...foods, newFood])
    // console.log("NEW FOOD: ", newFood);
    // console.log("UPDATED FOODS: ", foods);
  }

  function handleDeleteFood(id){
    const newSet = foods.filter(food => food.id !== id)
    setFoods(newSet)
    console.log(newSet)
  }

  function handleUpdateFood(id){
    const updatedSet = foods.map(food => {
      if (food.id === id){
        return {...food, heatLevel: food.heatLevel + 1,}
      } else {
        return food
      }
    })
    setFoods(updatedSet)
    console.log(updatedSet)
  }

  function handleFilterFood(cuisine){
    /**
     * 1. The filter state will first be updated 
     * 2. A conditional expression will be used in const filtering if filter !== 'All' 
     * 3. foodList will generate the appropriate 
     */

    setFilter(cuisine)
    const filterFoods = foods.filter(food => food.cuisine === cuisine); 
    setFilteredFoods(filterFoods)
    console.log("Filtering Foods", filterFoods)
  }

  console.log("Filter in component: ", filter)
  console.log("Filtering Foods", filteredFoods)
    
  const filtering = filter === 'All' ? foods : filteredFoods

  const foodList = filtering.map((food) => (
     <li 
      key={food.id}
      onClick={() => handleUpdateFood(food.id)}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      </li>
  ));


  /**
   * Array Cheat Sheet
      Here's a quick reference of some common techniques for manipulating arrays in state. Keep this in mind, because working with arrays will be important as a React developer!
      
      Add: use the spread operator ([...])
      Remove: use .filter
      Update: use .map
   */
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={(e) => handleFilterFood(e.target.value)}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
