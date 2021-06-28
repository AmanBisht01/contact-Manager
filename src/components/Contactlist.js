import React, { Component, usestate } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Contact = (props) => (
  <tr>
    <td>{props.contact.username}</td>
    <td>{props.contact.contactno}</td>
    <td>{props.contact.email}</td>
    <td>
      <Link to={"/edit/" + props.contact._id}>edit</Link> |{" "}
      <Link
        to={"/"}
        onClick={() => {
          props.deleteContact(props.contact._id);
        }}
      >
        delete
      </Link>
    </td>
  </tr>
);

export default class Contactlist extends Component {
  constructor(props) {
    super(props);

    this.deleteContact = this.deleteContact.bind(this);

    this.state = { contacts: [], search: "" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        this.setState({ contacts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteContact(id) {
    axios.delete("http://localhost:3001/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      contacts: this.state.contacts.filter((el) => el._id !== id),
    });
  }

  contactList() {
    return this.state.contacts.map((currentcontact) => {
      return (
        <Contact
          contact={currentcontact}
          deleteContact={this.deleteContact}
          key={currentcontact._id}
        />
      );
    });
  }

  // onSearch = (e) => {
  //   this.setState({ search: e.target.value });
  //   if (
  //     search !== "" &&
  //     country.name.toLowerCase().indexOf(search.toLowerCase()) === -1
  //   )
  //     return null;
  // };
  render() {
    return (
      <div>
        <h3>
          All Contacts
          <Link to="/add">
            <button>Add Contact</button>
          </Link>
        </h3>

        <div className="search">
          <input
            type="text"
            placeholder="search Conatacts"
            className="promt"
            // onChange={onSearch}
          ></input>
          <i className="search icon" alt="src"></i>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Contact No.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.contactList()}</tbody>
        </table>
      </div>
    );
  }
}
