import React, { useState } from "react";
//const Data = require("../Data/data");

const UserRow = ({ row, deleteRow, updateRow, isSelected, selectRow }) => {
    //props
    //row = data
    //deleteRow = fn delete the row
    //updateRow = fn update the row
    //isSelected = bool
    //selectRow = int

    const [editMode, setmode] = useState(false);
    const [email, setEmail] = useState(row.email);
    const [username, setUsername] = useState(row.username);
    const [showFood, setShowFood] = useState(false);

    const switchMode = () => {
        if (editMode) {
            setEmail(row.email);
            setUsername(row.username);
        }

        setmode(!editMode);
    };

    const toggleFood = () => {
        setShowFood(!showFood);
    };

    const updateUser = () => {
        let user = row;
        user.email = email;
        user.username = username;
        updateRow(user);
        switchMode();
    };

    const handleClick = (event) => {
        if (event.detail === 1) {
            selectRow(row.id);
        } else if (event.detail === 2) {
            switchMode();
        }
    };

    return !editMode || !isSelected ? (
        <>
            <tr key={row.id} onClick={(event) => handleClick(event)} className={isSelected ? "selectedRow" : ""}>
                <td className="foodTd">
                    {row.Food.length > 0 ? (
                        <div className="foodTog" onClick={toggleFood}>
                            {showFood ? <>-</> : <>+</>}
                        </div>
                    ) : (
                        <></>
                    )}
                </td>
                <td> {row.id} </td>
                <td>{row.username}</td>
                <td> {row.email} </td>
                <td></td>
            </tr>
            {row.Food.length > 0 && showFood ? (
                <tr>
                    <td className="foodLabel" colSpan={2}>
                        Food:
                    </td>
                    <td colSpan={3}>
                        <table className="foodTable">
                            <tbody>
                                {row.Food.map((food) => {
                                    return (
                                        <tr key={food.id}>
                                            <td> {food.name} </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>
            ) : (
                <></>
            )}
        </>
    ) : (
        <>
            <tr key={row.id}>
                <td className="foodTd">
                    {row.Food.length > 0 ? (
                        <div className="foodTog" onClick={toggleFood}>
                            +
                        </div>
                    ) : (
                        <></>
                    )}
                </td>
                <td> {row.id} </td>
                <td>
                    <input value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </td>
                <td>
                    <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </td>
                <td>
                    <button onClick={updateUser}> Save </button>
                    <button onClick={switchMode}>Cancel</button>
                </td>
            </tr>
            {row.Food.length > 0 && showFood ? (
                <tr>
                    <td className="foodLabel" colSpan={2}>
                        Food:
                    </td>
                    <td colSpan={3}>
                        <table>
                            <tbody>
                                {row.Food.map((food) => {
                                    return (
                                        <tr key={food.id}>
                                            <td> {food.name} </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserRow;
