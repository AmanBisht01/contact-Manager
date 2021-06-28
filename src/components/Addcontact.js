import React, { Component } from "react";
import axios from "axios";

export class Addcontact extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangecontactno = this.onChangecontactno.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      contactno: "",
      email: "",
      users: [],
    };
  }

  //   componentDidMount() {
  //     axios
  //       .get("http://localhost:3001/")
  //       .then((response) => {
  //         if (response.data.length > 0) {
  //           this.setState({
  //             users: response.data.map((user) => user.username),
  //             username: response.data[0].username,
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

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

    console.log(contact);

    axios
      .post("http://localhost:3001/add", contact)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Add contact</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>UserName: </label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Enter name"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Contact No: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter contact number"
              onChange={this.onChangecontactno}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email id"
              onChange={this.onChangeemail}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add contact"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Addcontact;
