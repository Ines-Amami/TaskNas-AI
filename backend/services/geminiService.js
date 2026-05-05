import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function ask(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Clean JSON from Gemini (sometimes it wraps in ```json)
function cleanJSON(raw) {
  return raw.replace(/```json|```/g, '').trim();
}

export async function breakGoalIntoTasks(goal) {
  const prompt = `
You are a project management AI called TaskNas AI.
User goal: "${goal}"

Break this into 4-6 specific tasks.
Return ONLY a raw JSON array. No markdown. No explanation.

Each item must have:
- "title": string
- "priority": "High" or "Medium" or "Low"
- "tags": array with 1-2 strings from: ["Backend","Frontend","Research","Setup","AI/ML","Review","Security","Docs","Testing","DevOps"]
- "description": one sentence string
- "subtasks": array of 2-3 short strings
- "dueDate": string like "Dec 30"
`;
  const raw = await ask(prompt);
  return JSON.parse(cleanJSON(raw));
}

export async function analyzeWorkload(tasks) {
  const list = tasks.map(t => `- ${t.title} (${t.status}, ${t.priority})`).join('\n');
  const prompt = `
You are an AI productivity analyst.
Analyze these tasks and return ONLY raw JSON. No markdown.

Tasks:
${list}

Return exactly this structure:
{
  "sentiment": "Calm" or "Busy" or "Overloaded" or "Light",
  "sentimentEmoji": "😌" or "😤" or "🔥" or "😴",
  "productivityTrend": "+X%" or "-X%",
  "tip": "one actionable tip sentence",
  "riskAlert": "one risk sentence",
  "summary": "one overview sentence"
}
`;
  const raw = await ask(prompt);
  return JSON.parse(cleanJSON(raw));
}

export async function chatWithAI(message, tasks, history) {
  const taskList = tasks.map(t => `- ${t.title} [${t.status}/${t.priority}]`).join('\n');
  const conv = history
    .slice(-6)
    .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`)
    .join('\n');

  const prompt = `
You are TaskNas AI, a friendly project management assistant.
Be concise (2-3 sentences max). Be helpful and practical.

Current tasks:
${taskList}

Recent conversation:
${conv}

User: ${message}
Assistant:`;

  return await ask(prompt);
}

export async function generateTaskDescription(title) {
  const prompt = `Write a clear, professional 1-sentence description for this software task: "${title}". Return only the description text. No quotes. No explanation.`;
  return (await ask(prompt)).trim();
}