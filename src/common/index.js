export const writeCookie = (key, value, days) => {
    let date = new Date();
    days = days || 365;

    date.setDate(date.getDate() + days);

    let cookie = (document.cookie = `${key}=${value}; expires=${date.toGMTString()}; path=/`);

    return cookie;
};

export const gCookie = (cookieName) => {
    try {
        const rawCookies = decodeURIComponent(document.cookie);
        let right = rawCookies.substring(rawCookies.indexOf(cookieName));
        if (!right) {
            return false;
        }
        return right.slice(right.indexOf("=") + 1, right.indexOf(";") - 1);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getCookie = (cookieName) => {
    let name = cookieName + "=";

    let decodedCookies = decodeURIComponent(document.cookie);

    let splitCookies = decodedCookies.split(";");

    for (let i = 0; i < splitCookies.length; i++) {
        let cookie = splitCookies[i];

        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.subscring(name.length, cookie.length);
        }
    }
    return false;
};

export const getCookie2 = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
