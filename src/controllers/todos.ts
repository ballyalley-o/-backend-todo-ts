import { RequestHandler } from 'express'
import { Todo } from '../models/Todo'

const TODOS: Todo[] = []


//POST Todo
//Route POST /todos/
//access Public
export const createTodo: RequestHandler = (
    req, res, next
    ) => {
        const text = (req.body as {text: string}).text
        const newTodo = new Todo(Math.random().toString(), text)

        TODOS.push(newTodo)

        res.status(201).json({
            message: 'Note Added',
            createdTodo: newTodo
        })
    }
//Get ALL Todos
//Route GET /todos/
//access Public
export const getTodos: RequestHandler = (
    req, res, next
    ) => {
        res.json({
            todos: TODOS
        })
    }

//PATCH Todo
//Route PATCH /todos/:Id
//access Private
export const updateTodo: RequestHandler<{id: string}> = (
    req, res, next
    ) => {
        const todoId = req.params.id
        const updatedText = (req.body as { text: string }).text;
        const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

        if(todoIndex < 0) {
            throw new Error("Nothing to update")
        }

        TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

        res.json({
            message: "Updated Note",
            updateTodo: TODOS[todoIndex]
        })

    }

//DELETE Todo
//Route DELETE /todos/:Id
//access Private
export const deleteTodo: RequestHandler<{id: string}> = (
    req, res, next
    ) => {
        const todoId = req.params.id;
        const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

        if (todoIndex < 0) {
            throw new Error('Nothing to delete');
        }

        TODOS.splice(todoIndex, 1)

        res.json({
            message: "Note, Deleted.",
            deletedTodo: {}
        })

    }
