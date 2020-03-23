import React, { useState, useEffect, Component } from "react";
import { UserData } from "../App";
import axios from "axios";

interface UserList {
  data: Array<UserData>;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface Props {
  page: number;
  perPage: number;
}
interface State extends UserList {}

class ProfileList extends React.Component<Props, State> {
  static defaultProps = {
    page: 1,
    perPage: 5
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      page: props.page,
      per_page: props.perPage,
      data: [] as Array<UserData>,
      total: 0,
      total_pages: 1
    };
  }
  async fetchData(page: number, per_page: number) {
    return await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${per_page}`);
  }

  componentDidMount() {
    this.fetchData(this.state.page, this.state.per_page).then(res =>
      this.setState(res.data as UserList)
    );
  }

  render() {
    if (this.state.data.length < 1) {
      return <h1>Loading...</h1>;
    }
    return (  <>
        <h1>Humanz</h1>
        <h2>
          Page {this.state.page} of {this.state.total_pages}
        </h2>
        Per page:
        <select
          onChange={event =>
            this.fetchData(
              this.state.page,
              parseInt(event.target.value)
            ).then(res => this.setState(res.data as UserList))
          }
        >
          {(new Array<number>(this.state.total)
      .fill(0)
      .map((_, n) => (
        <option key={n} value={n + 1}>
          {n + 1}
        </option>
      )))
}
        </select>
        Current page: {(new Array<number>(this.state.total_pages)
      .fill(0)
      .map((_, n) => (
        <button
          key={n}
          onClick={() =>
            this.fetchData(n + 1, this.state.per_page).then(res =>
              this.setState(res.data as UserList)
            )
          }
        >
          {n + 1}
        </button>
      )))
}
        <ul>
          {this.state.data.map(u => (
            <li key={u.id}>
              <a href={`/users/${u.id}`}>
                {u.first_name}
                <br />
                <img src={u.avatar} />
              </a>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default ProfileList;
