const register = async (formData) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(`${process.env.REACT_APP_API}users`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(data);

        if (data.user) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

const login = async (formData) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(`${process.env.REACT_APP_API}auth`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(data);

        if (data.user) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getAllUsers = async (token) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getCookie("DohDoh")}`);

        const response = await fetch(`${process.env.REACT_APP_API}users`, {
            method: "GET",
            headers: myHeaders,
        });

        const data = await response.json();

        console.log(data);

        if (data.users) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

const deleteUser = async (id) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getCookie("DohDoh")}`);

        const response = await fetch(`${process.env.REACT_APP_API}users/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });

        const data = await response.json();

        console.log(data);

        if (data) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

const updateUser = async (user) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getCookie("DohDoh")}`);

        const response = await fetch(`${process.env.REACT_APP_API}users/${user.id}`, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(user),
        });

        const data = await response.json();

        console.log(data);

        if (data) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getAllFood = async (token) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getCookie("DohDoh")}`);

        const response = await fetch(`${process.env.REACT_APP_API}foods`, {
            method: "GET",
            headers: myHeaders,
        });

        const data = await response.json();

        console.log(data);

        if (data.food) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

const addFoodToUser = async (userId, foodId, foodName) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getCookie("DohDoh")}`);

        //check if food exists
        if (!foodId) {
            //store food and retain foodId
            const fResponse = await fetch(`${process.env.REACT_APP_API}foods`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({ name: foodName }),
            });
            const data = await fResponse.json();
            foodId = data.food.id;
        }

        const response = await fetch(`${process.env.REACT_APP_API}users/${userId}/foods/${foodId}`, {
            method: "POST",
            headers: myHeaders,
        });

        const data = await response.json();

        console.log(data);

        if (data.user) {
            return data;
        }
        return false;
        // else(alert(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
        return false;
    }
};

function getCookie(str) {
    let name = str + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { register, login, deleteUser, getAllUsers, updateUser, getAllFood, addFoodToUser };
