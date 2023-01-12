"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = require("../models/Todo");
const TODOS = [];
//POST Todo
//Route POST /todos/
//access Public
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new Todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Note Added',
        createdTodo: newTodo
    });
};
exports.createTodo = createTodo;
//Get ALL Todos
//Route GET /todos/
//access Public
const getTodos = (req, res, next) => {
    res.json({
        todos: TODOS
    });
};
exports.getTodos = getTodos;
//PATCH Todo
//Route PATCH /todos/:Id
//access Private
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Nothing to update");
    }
    TODOS[todoIndex] = new Todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({
        message: "Updated Note",
        updateTodo: TODOS[todoIndex]
    });
};
exports.updateTodo = updateTodo;
//DELETE Todo
//Route DELETE /todos/:Id
//access Private
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Nothing to delete');
    }
    TODOS.splice(todoIndex, 1);
    res.json({
        message: "Note, Deleted.",
        deletedTodo: {}
    });
};
exports.deleteTodo = deleteTodo;
