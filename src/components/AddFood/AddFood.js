import { useEffect, useState } from "react";
import "./AddFood.css";
const Data = require("../../Data/data");

const AddFood = ({ toggle, addFoodToUser }) => {
    const [foods, setFoods] = useState([]);
    const [filterFoods, setFilterFood] = useState([]);
    const [userInput, setUserInput] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await Data.getAllFood();
            if (response.food) {
                setFoods(response.food);
            }
        }

        getData();
        filter();
    }, []);

    const filter = (str) => {
        let currentUserInput = "";
        if (str) {
            currentUserInput = str;
        }

        if (currentUserInput) {
            setFilterFood(foods.filter((f) => f.name.startsWith(currentUserInput)));
        } else {
            setFilterFood([]);
        }

        setUserInput(currentUserInput);
    };

    const overlayToggle = (event) => {
        if (event.target.localName === "addfood-component") {
            toggle(false);
        }
    };

    const saveFood = () => {
        let foodId = null;
        const food = foods.find((food) => food.name === userInput);

        if (food) {
            foodId = food.id;
        }

        addFoodToUser(foodId, userInput);
        toggle(false);
    };

    return (
        <addFood-component onClick={(event) => overlayToggle(event)}>
            <div className="model">
                <div className="selection">
                    <input value={userInput} onChange={(event) => filter(event.target.value)} />
                    <button onClick={saveFood}>Save</button>
                </div>
                <div>
                    {filterFoods.length > 0 ? (
                        <select name="food" multiple onChange={(event) => setUserInput(event.target.value)}>
                            {filterFoods.map((food) => {
                                return (
                                    <option className="" key={food.id}>
                                        {food.name}
                                    </option>
                                );
                            })}
                        </select>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </addFood-component>
    );
};

export default AddFood;
