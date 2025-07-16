import httpStatus from 'http-status'
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'
import { errorlogger } from './shared/logger'
import { LogsRoutes } from './app/modules/Logs/logs.routes'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
console.log(app.get('env'))
app.use('/api/v1', router)
app.use('/logs', LogsRoutes)
// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes)

//Testing
app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`
   <html>
      <head>
        <title>Docker Logs Viewer</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Welcome to the Docker Logs</h1>
        <p>Go to <a href="/logs/errors">Error Logs</a> or <a href="/logs/successes">Success Logs</a>.</p>
      </body>
    </html>
  `)
})
app.get('/todos', async (req: Request, res: Response) => {
  // const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const response = await fetch(
    'http://host.docker.internal:5000/api/v1/todo/list'
  )
  const todos = await response.json()
  return res.status(200).json(todos)
})
//global error handler
// app.use(globalErrorHandler)

app.get('/error', (req: Request, res: Response) => {
  throw new Error('This is a forced error!')
})
// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err)
  errorlogger.error(err)

  res.status(500).send(`
    <html>
      <head>
        <title>Error</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>${err.message}</p>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `)
})

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
export default app
