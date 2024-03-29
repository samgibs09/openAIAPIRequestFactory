require('dotenv').config();
console.log(process.env);
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

async function main() {
    const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
});
for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
}
  
console.log(main());