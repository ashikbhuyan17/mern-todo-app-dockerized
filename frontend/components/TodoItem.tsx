"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteTodo } from "@/services/todoService"

type Props = {
  todo: {
    _id: string
    title: string
    description: string
    status: string
    priority: string
  }
}

export default function TodoItem({ todo }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    await deleteTodo(todo._id)
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="p-4 border border-gray-300 dark:border-gray-700 rounded shadow dark:bg-gray-900 flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{todo.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {todo.description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Status: {todo.status} | Priority: {todo.priority}
        </p>
      </div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="ml-4 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}
