import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const shortid = require('shortid')

const { readFile, writeFile, readdir } = require('fs').promises

const Root = () => ''

/*
newTask.status = 'new'
  newTask['_isDeleted'] = false
  newTask['_createdAt'] = +new Date()
  newTask['_deletedAt'] = null

class Task {
  constructor() {
    this.status = 'new'
  }
  this
}
132:11  error    ["_createdAt"] is better written in dot notation  dot-notation
133:3   error    Unexpected dangling '_' in '_deletedAt'  
*/

const periodOfTime = {
  day: 1000 * 60 * 60 * 24,
  week: 7 * 1000 * 60 * 60 * 24,
  month: 30 * 1000 * 60 * 60 * 24
}

const statusEnableList = ['done', 'new', 'in progress', 'blocked']

const getDirFileName = async () => {
  const filesName = await readdir('../tasks/').then((files) => {
    const fileName = files.map((name) => name.split('.').slice(0, -1).join('.'))
    return fileName
  })
  return filesName
}

const saveFile = async (tasks, category) => {
  const json = await JSON.stringify(tasks)
  const pathFile = `../tasks/${category}.json`
  await writeFile(pathFile, json, { encoding: 'utf8' })
}

const getTaskUndeleted = (tasks) => {
  const tasksUndeleted = tasks.reduce((acc, task) => {
    const newTask = task
    if (!task['_isDeleted']) {
      delete newTask['_createdAt']
      delete newTask['_isDeleted']
      delete newTask['_deletedAt']
      const returnTask = [...acc, newTask]
      return returnTask
    }
    return undefined
  }, [])
  return tasksUndeleted
}

const getTaskTimespan = (tasks, timespanReq) => {
  const timespan = periodOfTime[timespanReq]
  if (typeof timespan === 'undefined') {
    return []
  }
  const tasksTimespan = tasks.filter((task) => {
    if (+new Date() - task['_createdAt'] < timespan) {
      return task
    }
    return undefined
  })
  return tasksTimespan
}

const getTasks = async (category) => {
  return readFile(`../tasks/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      const jsonParseTasks = JSON.parse(text)
      return jsonParseTasks
    })
    .catch((err) => {
      console.log(err)
    })
}

const getNewTaskById = (tasks, id) => {
  const taskID = tasks.filter((task) => {
    if (task.taskId === id) {
      return task
    }
    return undefined
  })
  return taskID[0]
}

const setStatusTask = (tasks, id, status) => {
  const upTasks = tasks.map((task) => {
    const newTask = task
    if (task.taskId === id) {
      newTask.status = status
    }
    return newTask
  })
  return upTasks
}

const setDeleteTask = (tasks, id) => {
  const upTasks = tasks.map((task) => {
    const newTask = task
    if (task.taskId === id) {
      newTask['_isDeleted'] = true
    }
    return newTask
  })
  return upTasks
}

const saveTasks = async (category, task) => {
  // const fullTask = {...task, ['_isDeleted']: false, [status]: 'new', ['_createdAt']: +new Date(), ['_deletedAt']: null}
  const newTask = task
  newTask.status = 'new'
  newTask['_isDeleted'] = false
  newTask['_createdAt'] = +new Date()
  newTask['_deletedAt'] = null

  return readFile(`../tasks/${category}.json`, { encoding: 'utf8' })
    .then(async (text) => {
      // task.status = 'new'
      // task['_isDeleted'] = false
      // task['_createdAt'] = +new Date()
      // task['_deletedAt'] = null
      const textJSON = await JSON.parse(text)
      const tasks = await [...textJSON, newTask]
      await saveFile(tasks, category)
      // return JSON.parse(text)
      return tasks
    })
    .catch(async () => {
      const new_task = {
        taskId: shortid.generate(),
        title: task.title,
        status: 'new',
        _isDeleted: false,
        _createdAt: +new Date(),
        _deletedAt: null
      }
      await saveFile([new_task], category)
      return new_task
    })
}

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

/*
server.get('/api/v1/tasks', (req) => {
  const task = req.body
})
*/

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = await req.params
  const task = await req.body
  await saveTasks(category, task)
  res.json({ status: 'success' })
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category } = await req.params
  const { timespan } = await req.params
  const tasks = await getTasks(category)
  const tasksTimespan = await getTaskTimespan(tasks, timespan)
  const tasksUndeletedTimespan = await getTaskUndeleted(tasksTimespan)
  res.send(tasksUndeletedTimespan)
})

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = await req.params
  const tasks = await getTasks(category)
  const tasksUndeleted = await getTaskUndeleted(tasks)
  res.send(tasksUndeleted)
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const body = await req.body
  const status = await body.status
  if (!statusEnableList.includes(status)) {
    res.status(501)
    res.send({ status: 'error', message: 'incorrect status' })
    return
  }
  const { category, id } = await req.params
  const tasks = await getTasks(category)
  const upTasks = setStatusTask(tasks, id, status)
  const task = await getNewTaskById(upTasks, id)
  if (typeof task === 'undefined') {
    res.status(501)
    res.send({ status: 'error', message: 'incorrect id' })
    return
  }
  await saveFile(upTasks, category)
  res.send(task)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = await req.params
  const tasks = await getTasks(category)
  const upTasks = await setDeleteTask(tasks, id)
  await saveFile(upTasks, category)
  res.status(200)
  res.end()
})

server.get('/api/v1/categories', async (req, res) => {
  const filesName = await getDirFileName()
  res.send(filesName)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

/*
server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})
*/

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
