import { Schema, model } from 'mongoose'
import { ITodo } from './todo.interface'

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

export const Todo = model<ITodo>('Todo', todoSchema)
