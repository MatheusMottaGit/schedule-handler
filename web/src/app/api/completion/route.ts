import { StreamData, StreamingTextResponse, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import 'dotenv/config'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo-16k'),
    prompt,
  });

  const data = new StreamData()

  const stream = result.toAIStream({
    onFinal() {
      data.close()
    },
  })

  return new StreamingTextResponse(stream, {}, data)
}