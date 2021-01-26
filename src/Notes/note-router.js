const path = require('path');
const express = require('express');
const xss = require('xss');
const NoteService = require('./note-service');
const noteRouter = express.Router();
const jsonBodyParser = express.json();

const serializeNote = (note) => ({
  id: note.id,
  note_name: xss(note.note_name),
  content: xss(note.content),
  assigned_folder: note.assigned_folder,
  date_modified: note.date_modified,
});

noteRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    NoteService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeNote));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { note_name, content, assigned_folder, date_modified } = req.body;
    const newNote = { note_name, content, assigned_folder };

    for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    newNote.assigned_folder = Number(assigned_folder);

    if (date_modified) {
      newNote.date_modified = date_modified;
    }

    NoteService.insertNote(knexInstance, newNote)
      .then((note) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(serializeNote(note));
      })
      .catch(next);
  });

noteRouter
  .route('/:note_id')
  .all((req, res, next) => {
    NoteService.getById(req.app.get('db'), req.params.note_id)
      .then((note) => {
        if (!note) {
          return res.status(404).json({
            error: { message: 'Note does not exist' },
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeNote(res.note));
  })
  .delete((req, res, next) => {
    NoteService.deleteNote(req.app.get('db'), req.params.note_id)
      .then((numRowsAffected) => {
        return res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { note_name, content, date_modified } = req.body;
    const newNoteFields = { note_name, content, date_modified };

    const numOfValues = Object.values(newNoteFields).filter(Boolean).length;
    if (numOfValues === 0) {
      return res.status(400).json({
        error: {
          message:
            'Your response must include one of the following fields: name, content',
        },
      });
    }

    NoteService.updateNote(req.app.get('db'), req.params.note_id, newNoteFields)
      .then((numRowsAffected) => {
        return res.status(204).end();
      })
      .catch(next);
  });

module.exports = noteRouter;
