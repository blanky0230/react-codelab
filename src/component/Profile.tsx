import React, { useState, useEffect, useImperativeHandle } from "react";
import axios from "axios";
import { UserData } from "../App";


export function Profile({userId}: {userId: number}) {
    const [userdata, setUserData] = useState(null as UserData | null);

    useEffect(() => {
        axios
          .get(`https://reqres.in/api/users/${userId}`)
          .then(response => setUserData(response.data.data as UserData))
          .catch(() => null)
    }, [userId]);

    if (userdata === null) {
      return (<h1>Loading...</h1>);
    }
    return (
      <>
        <div>
          <h1>{userdata.first_name}</h1>
          <h2>{userdata.last_name}</h2>
          <img src={userdata.avatar}></img>
          <a href={"mailto:" + userdata.email}>{userdata.email}</a>
        </div>
      </>
    );
}