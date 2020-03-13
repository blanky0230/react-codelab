import React, { useState, useEffect, useImperativeHandle } from "react";
import axios from "axios";
import { UserData } from "../App";
import { render } from "react-dom";

interface Props {
  userId: number;
}

interface State extends UserData { isLoaded: boolean }

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.userId,
      first_name: '',
      last_name:'',
      email: '',
      avatar: '',
      isLoaded: false,
    }
  }

  componentDidMount() {
    async function loadData(userId: number) {
      return await axios
          .get(`https://reqres.in/api/users/${userId}`)
    }
    loadData(this.state.id).then(response => this.setState( {... response.data.data as UserData, isLoaded: true }))
          .catch(() => this.setState({...this.state, isLoaded: false}))
  }

    render() { 
    if (!this.state.isLoaded) {
      return (<h1>Loading...</h1>);
    }

    return (
      <>
        <div>
          <h1>{this.state.first_name}</h1>
          <h2>{this.state.last_name}</h2>
          <img src={this.state.avatar}></img>
          <a href={"mailto:" + this.state.email}>{this.state.email}</a>
        </div>
      </>
    );
    }
}

export default Profile;