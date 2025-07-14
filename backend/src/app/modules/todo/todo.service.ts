import { ITodo, ITodoFilters } from './todo.interface'
import { Todo } from './todo.model'
import { todoSearchableFields } from './todo.constants'

const createTodo = async (data: ITodo): Promise<ITodo> => {
  return Todo.create(data)
}

const getTodos = async (filters: ITodoFilters): Promise<ITodo[]> => {
  const { searchTerm, ...filterData } = filters
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: todoSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([key, value]) => ({ [key]: value })),
    })
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {}

  return Todo.find(whereConditions)
}

const getTodoById = async (id: string): Promise<ITodo | null> => {
  return Todo.findById(id)
}

const updateTodo = async (
  id: string,
  payload: Partial<ITodo>
): Promise<ITodo | null> => {
  return Todo.findByIdAndUpdate(id, payload, { new: true })
}

const deleteTodo = async (id: string): Promise<ITodo | null> => {
  return Todo.findByIdAndDelete(id)
}

export const TodoService = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
}
