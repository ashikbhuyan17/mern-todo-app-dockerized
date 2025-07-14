import TodoForm from "@/components/TodoForm"
import TodoItem from "@/components/TodoItem"

export default async function IndexPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/list`, {
    cache: "no-store",
  })
  const data = await res.json()
  const todos = data?.data || []

  return (
    <section className="container pt-6 md:py-10 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-bold mb-6">Todo List</h1>

        <TodoForm />

        <div className="space-y-4 mt-8">
          {todos.map((todo: any) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
    </section>
  )
}
