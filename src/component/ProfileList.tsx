import React, { useState, useEffect } from 'react';
import { UserData } from "../App";
import axios from 'axios';

interface UserList {
    data: Array<UserData>,
    page: number,
    per_page: number,
    total: number,
    total_pages: number
}


export function ProfileList({page = 1, perPage = 4}: {page:number, perPage:number}) {
    const [userList, setUserList] = useState(null as UserList | null);
    const [currPerPage, setPerPage] = useState(perPage);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect( () => {
        axios.get(`https://reqres.in/api/users?page=${currentPage}&per_page=${currPerPage}`)
        .then((response) => setUserList(response.data as UserList))
        .catch( () => setUserList(null));
    }, [currentPage, currPerPage]);

    if (userList === null) { 
        return (<h1>Loading...</h1>);
    }
    const perPageOptions = (new Array<number>(userList.total).fill(0).map( (_, n) => (<option key={n} value={n+1}>{n+1}</option>)));
    const pageButtons = (new Array<number>(userList.total_pages).fill(0).map( (_, n) => (<button key={n} onClick={() => setCurrentPage(n+1)}>{n+1}</button>)));

    return (<>
        <h1>Humanz</h1>
        <h2>Page {userList.page} of {userList.total_pages}</h2>
        Per page: <select onChange={ (event) => setPerPage(parseInt(event.target.value)) }>{perPageOptions}</select>
        Current page: {pageButtons}
        <ul>
        {userList.data.map(u => (<li key={u.id}><a href={`/users/${u.id}`}>{u.first_name}<br/><img src={u.avatar}/></a></li>))}
        </ul>
        </>
    );
}