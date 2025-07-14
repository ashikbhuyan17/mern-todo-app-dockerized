import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TodoValidation } from './todo.validation'
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from './todo.controller'

const router = express.Router()

router.post(
  '/create',
  validateRequest(TodoValidation.createTodoZodSchema),
  createTodo
)

router.get('/list', getTodos)
router.get('/:id', getTodoById)
router.patch(
  '/:id',
  validateRequest(TodoValidation.updateTodoZodSchema),
  updateTodo
)
router.delete('/:id', deleteTodo)

export const TodoRoutes = router
