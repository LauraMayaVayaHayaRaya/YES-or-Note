import React, { Component } from 'react';
//import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase';
import { DB_CONFIG } from './config/config';
import 'firebase/database';

import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';

//function App() {
class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [
        //{noteId: 1, noteContent: 'note 1'},
        //{noteId: 2, noteContent: 'note 2'}
      ]
    };

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');

    this.addNote = this.addNote.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes});
    });
  }

  removeNote() {

  }

  addNote(note) {
    let { notes } = this.state;
    notes.push({
      noteId: notes.length + 1,
      noteContent: note
    });
    this.setState({ notes });

  }

  render() {
    return (
      <div className="notesContainer">

        <div className="notesHeader">
          <h1>YES or Note</h1>
        </div>
        <div className="notesBody">
          <ul>
            {
              this.state.notes.map(note => {
                return (
                  <Note
                    noteContent={note.noteContent}
                    noteId={note.noteId}
                    key={note.noteId}
                  />
                )
              })
            }
          </ul>
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );

  }
}

export default App;
