import React from "react";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import UserGrid from "./components/UserGrid";
import { useCookies } from "react-cookie";

const Data = require("./Data/data");

const App = () => {
    //Application Variables
    const [userId, setUserId] = useState();

    const [user, setUser] = useState();
    const [isloginVisible, setIsLoginVisible] = useState();
    const [token, setToken] = useState();
    const registerFormMode = useRef(true);

    const [cookies, setCookie, removeCookie] = useCookies(["DohDoh"]);

    useEffect(() => {
        async function persistLogin() {
            const Ctoken = gCookie("DohDoh");
            const CUsername = gCookie("Username");
            const CUserId = gCookie("UserId");

            // const test = await cookies.get("DohDoh")
            // const test2 = await cookies.get("Username")
            // const test3 = await cookies.get("UserId")

            if (Ctoken) {
                setUser(CUsername);
                setUserId(CUserId);
                setToken(Ctoken);
            }
        }

        persistLogin();
    }, []);

    //Functions
    const submitRegisterHandler = async (formData) => {
        //Register Function
        const data = await Data.register(formData);

        console.log(data);
        if (data.user) {
            setUser(data.user.username);
            setUserId(data.user.id);
            setToken(data.token);

            let date = new Date();
            date.setDate(date.getDate() + 1);

            setCookie("DohDoh", data.token, { path: "/" });
            setCookie("Username", data.user.username, { path: "/" });
            setCookie("UserId", data.user.id, { path: "/" });
            toggleLogin();
        } else alert("invalid login");
    };

    const submitLoginHandler = async (formData) => {
        //Login function
        const data = await Data.login(formData);
        console.log(data);
        if (data.user) {
            setUser(data.user.username);
            setUserId(data.user.id);
            setToken(data.token);
            let date = new Date();
            date.setDate(date.getDate() + 1);

            setCookie("DohDoh", data.token, { path: "/" });
            setCookie("Username", data.user.username, { path: "/" });
            setCookie("UserId", data.user.id, { path: "/" });
            toggleLogin();
        } else alert("invalid login");
    };

    const logout = () => {
        //logout function
        setUser();
        setUserId();
        setToken();

        removeCookie("DohDoh");
        removeCookie("Username");
        removeCookie("UserId");
    };

    const toggleLogin = (logtype) => {
        //toggle the login form function
        if (logtype) {
            registerFormMode.current = true;
        } else {
            registerFormMode.current = false;
        }

        setIsLoginVisible(!isloginVisible);
    };

    //HTML display

    return (
        <div className="app">
            <div className="nav">
                {!user ? (
                    <>
                        <nav-command onClick={() => toggleLogin(true)}>Register</nav-command>
                        <nav-command onClick={() => toggleLogin(false)}>Login</nav-command>
                    </>
                ) : (
                    <></>
                )}
                {user ? (
                    <>
                        <nav-command>{user}</nav-command>
                        <nav-command onClick={logout}>Logout</nav-command>
                    </>
                ) : (
                    <></>
                )}

                {isloginVisible ? (
                    <Login
                        submitRegisterHandler={submitRegisterHandler}
                        registerFormMode={registerFormMode}
                        submitLoginHandler={submitLoginHandler}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className="content">
                {token ? (
                    <UserGrid token={token} />
                ) : (
                    <div>
                        <h1>Login to view users</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

const gCookie = (cookieName) => {
    try {
        const rawCookies = decodeURIComponent(document.cookie);
        let right = rawCookies.substring(rawCookies.indexOf(cookieName));
        if (!right) {
            return false;
        }
        console.log("done");
        return right.slice(right.indexOf("=") + 1, right.indexOf(";") > 0 ? right.indexOf(";") : right.length);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default App;

