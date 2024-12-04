import React, { Component } from "react";
import "./Todo.css";

export class Todo extends Component {
  state = {
    input: "",
    items: [],
    editingIndex: null, // State to keep track of the item being edited
    editingInput: "", // State to keep track of the input value for editing
  };

  onhandlechange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeitems = (event) => {
    event.preventDefault();
    const { input } = this.state;
    if (input.trim() === "") return; // Prevent adding empty items
    this.setState({
      items: [...this.state.items, input],
      input: "",
    });
  };

  deleteitem = (key) => {
    const allitems = [...this.state.items];
    allitems.splice(key, 1);
    this.setState({
      items: allitems,
    });
  };

  // Function to start editing an item
  startEditing = (index) => {
    this.setState({
      editingIndex: index,
      editingInput: this.state.items[index],
    });
  };

  // Function to handle changes to the editing input box
  onEditingChange = (event) => {
    this.setState({
      editingInput: event.target.value,
    });
  };

  // Function to save the edited item
  saveEdit = (event) => {
    event.preventDefault();
    const { editingIndex, editingInput, items } = this.state;
    const updatedItems = items.map((item, i) =>
      i === editingIndex ? editingInput : item
    );
    this.setState({
      items: updatedItems,
      editingIndex: null,
      editingInput: "",
    });
  };

  render() {
    const { input, items, editingIndex, editingInput } = this.state;
    const inputClass = items.length > 0 ? "inputsection moved" : "inputsection";

    return (
      <div className="maincontainer">
        <form className={inputClass} onSubmit={this.storeitems}>
          <h1>Todo List</h1>
          <input
            type="text"
            value={input}
            onChange={this.onhandlechange}
            placeholder="enter items"
          />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editingIndex === index ? (
                // Show input box if the item is being edited
                <form className="formedit" onSubmit={this.saveEdit}>
                  <input
                    className="editinput"
                    type="text"
                    value={editingInput}
                    onChange={this.onEditingChange}
                  />
                  <button className="editbutton" type="submit">
                    Save
                  </button>
                </form>
              ) : (
                // Show item label if the item is not being edited
                <>
                  {data}
                  <div className="icondiv">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => this.startEditing(index)}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => this.deleteitem(index)}
                    ></i>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
