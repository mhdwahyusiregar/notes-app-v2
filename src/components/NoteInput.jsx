import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      title: '',
      body: '',
    };

    this.handleLimitTitle = this.handleLimitTitle.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  handleLimitTitle(event) {
    const inputTitle = event.target.value;

    if (inputTitle.length > 50) return;

    this.setState({
      title: inputTitle,
    });
  }

  render() {
    return (
      <div className="note-input">
        <h2>Buat catatan</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">
            Sisa Karacter {this.state.title.length}/50
          </p>
          <input
            type="text"
            className="note-input__title"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.handleLimitTitle}
            required
          />
          <textarea
            type="text"
            className="note-input__body"
            placeholder="Tulisakan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
          />
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
