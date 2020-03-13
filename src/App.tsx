import React from "react";
import "./styles.css";
import Profile from "./component/Profile"
import ProfileList from "./component/ProfileList";
import {BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom';

export interface UserData {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
}

function UserProfile() {
  const { userId } = useParams();
  const userIdParsed = userId !== undefined ? parseInt(userId): -1;
  return (<Profile userId={userIdParsed}/>);
}

function UserProfileList() {
  return (<ProfileList  page={1} perPage={6}/>);
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route path="/users/:userId" children={<UserProfile />} />
            <Route path="/users" children={<UserProfileList />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
