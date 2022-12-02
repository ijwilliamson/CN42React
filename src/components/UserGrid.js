import { useEffect, useState, useRef } from "react";
import UserRow from "./UserRow";
import AddFood from "./AddFood/AddFood";
const Data = require("../Data/data");

const UserGrid = (token) => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState([]);
    const [selectedRow, setSelectedRow] = useState(1);
    const [addFoodVisible, setAddFoodVisible] = useState(false);

    useEffect(() => {
        async function getData() {
            const response = await Data.getAllUsers(token);
            if (response.users) {
                setData(response.users);
                setRefresh(false);
            }
        }

        getData();
    }, [refresh]);

    const deleteRow = async (id) => {
        const result = await Data.deleteUser(id);
        console.log(result);
        console.log(`deleteing ${id}`);
        setRefresh(true);
    };

    const updateRow = async (user) => {
        const result = await Data.updateUser(user);
        console.log(result);
        setRefresh(true);
    };

    const addFoodToUser = async (foodId, foodName) => {
        await Data.addFoodToUser(selectedRow, foodId, foodName);
        setRefresh(true);
    };

    return (
        <>
            {addFoodVisible ? <AddFood addFoodToUser={addFoodToUser} toggle={setAddFoodVisible} /> : <></>}
            <command-bar>
                <command-section>
                    <section-header>Users</section-header>
                    <section-commands>
                        <user-command>Edit</user-command>
                        <user-command onClick={() => deleteRow(selectedRow)}>Delete</user-command>
                        <user-command onClick={() => setAddFoodVisible(!addFoodVisible)}>Add Food</user-command>
                    </section-commands>
                </command-section>
                <command-section>
                    <section-header>Food</section-header>
                    <section-commands>
                        <user-command>Add</user-command>
                        <user-command>Delete</user-command>
                        <user-command>Edit</user-command>
                    </section-commands>
                </command-section>
            </command-bar>
            <table>
                <tbody>
                    <tr className="heading">
                        <td width="20px"></td>
                        <td>id</td>
                        <td width="200px">username</td>
                        <td width="200px">email</td>
                        <td width="100px"></td>
                    </tr>
                    {data.map((u) => {
                        return (
                            <UserRow
                                row={u}
                                isSelected={u.id === selectedRow ? true : false}
                                selectRow={setSelectedRow}
                                deleteRow={deleteRow}
                                updateRow={updateRow}
                                key={u.id}
                            />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default UserGrid;
