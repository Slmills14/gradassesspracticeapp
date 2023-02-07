const db = require('./db.js');

const todoController = {
  async addnew(req, res, next) {
    try {
      const { description } = req.body;
      console.log(req.body);
      const completed = false;
      const values = [description, completed];
      const query =
        'INSERT INTO todos (description, completed) VALUES ($1, $2) RETURNING _id, description, completed';

      const newToDo = await db.query(query, values);
      const all = await db.query('SELECT * FROM todos;');
      console.log(all.rows);
      [res.locals.todo] = newToDo.rows;
      return next();
    } catch (error) {
      return next({
        log: error,
        status: 400,
        message: { error: 'error adding new todo' },
      });
    }
  },

  async update(req, res, next) {
    try {
      const { _id, description, completed } = req.body;
      const values = [description, completed];
      const query = `UPDATE todos (description, completed) VALUES ($1, $2) WHERE _id = ${_id}`;
      const updatedToDo = await db.query(query, values);
      console.log(`updated To-do: ${updatedToDo}`);
      res.locals.updated = updatedToDo;
      return next();
    } catch (error) {
      return next({
        log: error,
        status: 400,
        message: { error: 'error updating todo' },
      });
    }
  },

  async complete(req, res, next) {
    try {
      const { _id, completed } = req.body;
      const values = [completed];
      const query = `UPDATE todos (completed) VALUES ($1) WHERE _id = ${_id}`;
      const completedToDo = await db.query(query, values);
      console.log(`Completed To-do: ${completedToDo}`);
      res.locals.complete = completedToDo;
      return next();
    } catch (error) {
      return next({
        log: error,
        status: 400,
        message: { error: 'error completing todo' },
      });
    }
  },

  async delete(req, res, next) {
    try {
      const { _id } = req.body;
      const values = [_id];
      const query = `DELETE FROM todos WHERE _id = ${_id}`;
      const deleted = await db.query(query, values);
      console.log(`Completed To-do: ${deleted}`);
      res.locals.deleted = deleted;
      return next();
    } catch (error) {
      return next({
        log: error,
        status: 400,
        message: { error: 'error deleting todo' },
      });
    }
  },
};

module.exports = todoController;
