import React from 'react';
import NoteList from './NoteList';
import { getInitialData } from '../utils/index';
import NoteInput from './NoteInput';
import NoteSearch from './NoteSearch';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: getInitialData(),
      notes: getInitialData(),
      search: '', // Tambahkan state untuk nilai pencarian
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onArchiveHandler(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note,
      );

      return { notes: updatedNotes };
    });
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date(),
            archived: false,
          },
        ],
      };
    });
  }

  onSearchChange(keyword) {
    this.setState({ search: keyword }); // Perbarui state pencarian
  }

  render() {
    const { notes, search } = this.state; // Ambil nilai pencarian dari state

    // Filtrasi catatan berdasarkan pencarian catatan
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()),
    );

    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <>
        <div className="note-app__header">
          <h1>Notes</h1>
          <NoteSearch search={search} onSearchChange={this.onSearchChange} />
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          <NoteList
            notes={activeNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
          <h2>Arsip</h2>
          <NoteList
            notes={archivedNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </div>
      </>
    );
  }
}

export default NoteApp;
