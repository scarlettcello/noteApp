const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Removing a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note created");
    notes.printContent(note);
  } else {
    console.log("Note title already exists");
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.printContent(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title, argv.body);
  if (note) {
    console.log("Note found");
    notes.printContent(note);
  } else {
    console.log("Note doesn't exist");
  }
} else if (command === 'remove') {
  var isRemoved = notes.removeNote(argv.title);
  var message = isRemoved ? 'Note has been removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
