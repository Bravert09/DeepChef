import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getRecipeFromDeepSeek } from './getRecipeFromDeepSeek.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

// POST 接口：前端发送 ingredientsArr，后端调用 DeepSeek 获取回答
app.post('/recipe', async (req, res) => {
  const { ingredients } = req.body

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid input: ingredients must be an array' })
  }

  const recipe = await getRecipeFromDeepSeek(ingredients)
  res.json({ recipe })
})

app.listen(port, () => {
  console.log(`后端服务器已启动:http://localhost:${port}`)
})
app.get("/", (req, res) => {
  res.send("✅ API 服务正在运行");
});


//debug:
//当你将后端端口改为 5000 是 为了解决 Vite（前端开发服务器，默认运行在 5173）占用了 3000 端口的问题。