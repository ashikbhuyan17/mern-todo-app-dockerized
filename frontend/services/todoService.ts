import axiosInstance from "@/lib/axios"

export const getAllTodos = async () => {
  const res = await axiosInstance.get("/todo/list")
  return res.data?.data
}

export const createTodo = async (todo: {
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
}) => {
  const res = await axiosInstance.post("/todo", todo)
  return res.data?.data
}
export const updateTodo = async (
  id: string,
  todo: {
    title?: string
    description?: string
    priority?: "low" | "medium" | "high"
  }
) => {
  const res = await axiosInstance.put(`/todo/${id}`, todo)
  return res.data?.data
}
export const deleteTodo = async (id: string) => {
  const res = await axiosInstance.delete(`/todo/${id}`)
  return res.data?.data
}
export const toggleTodoCompletion = async (id: string) => {
  const res = await axiosInstance.patch(`/todo/${id}/toggle`)
  return res.data?.data
}
export const getTodoById = async (id: string) => {
  const res = await axiosInstance.get(`/todo/${id}`)
  return res.data?.data
}
