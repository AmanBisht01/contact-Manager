import React, { Component } from "react";
import axios from "axios";
import Contactlist from "./Contactlist";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangecontactno = this.onChangecontactno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          contactno: response.data.contactno,
          email: response.data.email,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3001/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            contacts: response.data.map((contact) => contact.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeemail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangecontactno(e) {
    this.setState({
      contactno: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const contact = {
      username: this.state.username,
      contactno: this.state.contactno,
      email: this.state.email,
    };

    console.log(Contactlist);

    axios
      .post(
        "http://localhost:3001/update/" + this.props.match.params.id,
        contact
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Contact Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Contact : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.contactno}
              onChange={this.onChangecontactno}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeemail}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
