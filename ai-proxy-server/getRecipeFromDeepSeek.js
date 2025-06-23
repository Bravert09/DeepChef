import axios from 'axios'
import dotenv from 'dotenv'

// 加载 .env 中的环境变量（如 API 密钥）
dotenv.config()

// 系统提示：告诉 AI 扮演食谱助手角色,并格式化为 markdown
const SYSTEM_PROMPT = `
你是一个助手,接收用户提供的一系列食材,并根据这些食材推荐1个可以制作的食谱。你不需要使用用户提到的每一种食材。食谱中可以包含一些他们没有提到的额外食材,但尽量不要添加太多。请将你的回答**严格使用中文**，并使用 **Markdown 格式** 输出。不要输出英文。请将你的回答以 Markdown 格式编写,以便更方便地在网页上展示。`

// 主函数：根据食材数组返回推荐的食谱
//DeepSeek 模型很可能优先根据 user 内容的语言来判断输出语言,因此它返回了英文。
export async function getRecipeFromDeepSeek(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(', ')

  try {
    // 调用 DeepSeek API 接口
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat", // 使用的模型
        messages: [
          { role: 'system', content: SYSTEM_PROMPT }, // 设置助手角色和提示语
          {
            role: 'user',
            content: `我有这些食材：${ingredientsString}。请推荐1个可以制作的食谱。请将你的回答**严格使用中文**，并使用 **Markdown 格式** 输出。不要输出英文。`,
          },
        ],
        temperature: 0.7, // 控制回答随机性
        max_tokens: 1024, // 限制回答最大长度
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, // 使用你自己的 API Key,已经测试过API KEY没问题
        },
      }
    )

    // 从返回结果中提取回答内容
    const answer = response.data.choices[0].message.content
    return answer
  } catch (error) {
    console.error('调用 DeepSeek API 出错：', error.response?.data || error.message)
    return '出错了,无法生成食谱。'
    
  }
}
