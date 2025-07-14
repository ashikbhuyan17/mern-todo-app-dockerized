import { RequestHandler } from 'express'
import { TodoService } from './todo.service'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { ITodo } from './todo.interface'
import pick from '../../../shared/pick'
import { todoFilterableFields } from './todo.constants'

export const createTodo: RequestHandler = catchAsync(async (req, res) => {
  const result = await TodoService.createTodo(req.body)
  sendResponse<ITodo>(res, {
    statusCode: 200,
    success: true,
    message: 'Todo created successfully',
    data: result,
  })
})

export const getTodos: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, todoFilterableFields)
  const result = await TodoService.getTodos(filters)
  sendResponse<ITodo[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Todos fetched successfully',
    data: result,
  })
})

export const getTodoById: RequestHandler = catchAsync(async (req, res) => {
  const result = await TodoService.getTodoById(req.params.id)
  sendResponse<ITodo>(res, {
    statusCode: 200,
    success: true,
    message: 'Todo fetched successfully',
    data: result,
  })
})

export const updateTodo: RequestHandler = catchAsync(async (req, res) => {
  const result = await TodoService.updateTodo(req.params.id, req.body)
  sendResponse<ITodo>(res, {
    statusCode: 200,
    success: true,
    message: 'Todo updated successfully',
    data: result,
  })
})

export const deleteTodo: RequestHandler = catchAsync(async (req, res) => {
  const result = await TodoService.deleteTodo(req.params.id)
  sendResponse<ITodo>(res, {
    statusCode: 200,
    success: true,
    message: 'Todo deleted successfully',
    data: result,
  })
})
