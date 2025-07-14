export type ITodo = {
  title: string
  description?: string
  status: 'pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
}

export type ITodoFilters = {
  searchTerm?: string
  status?: string
  priority?: string
}
