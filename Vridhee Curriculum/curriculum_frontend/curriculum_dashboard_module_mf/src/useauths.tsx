import React, { useEffect } from "react";
let sid :string
export const useAuth = () => {
    //getting token from local storage
    // const user = localStorage.getItem('token')
    sid = ''
    var prmstr = window.location.search.split("?");
    sid = prmstr[2];
    localStorage.setItem('sid',sid)
    const user = sid
    console.log(user,"user")
    //checking whether token is preset or not
    if (user) {
        return true;
    } else {
        return false
    }
};