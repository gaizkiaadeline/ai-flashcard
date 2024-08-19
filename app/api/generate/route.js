import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY);

const systemPrompt = `You are a flashcard creator. Your task is to create a list of flashcards from the given user input. Each flashcard consists of one question and one answer. Ensure that each flashcard is unique and relevant. 
Return the flashcards in the following JSON format:`
{
  "flashcards":[
    {
      "front": "Question text",
      "back": "Answer text"
    }
  ]
}

User Input: `;

export async function POST(req) {
  const data = await req.text();
  try {
    const completion = await hf.textGeneration({
      model: "EleutherAI/gpt-neo-2.7B",
      inputs: `${systemPrompt}${data}`,
      parameters: {
        max_new_tokens: 500,  
        temperature: 0.7,   
        return_full_text: false
      }
    });

    console.log("API Response:", completion);
    const flashcards = parseFlashcards(completion.generated_text);

    console.log("Final Flashcards:", flashcards);

    return NextResponse.json(flashcards);

  } catch (error) {
    console.error('Error generating flashcards:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Error generating flashcards' }, { status: 500 });
  }
}

function parseFlashcards(text) {
  const flashcards = [];
  const sections = text.trim().split('\n\n'); 

  let currentQuestion = '';
  let currentAnswer = '';

  sections.forEach(section => {
    const lines = section.trim().split('\n').filter(line => line.trim() !== '');

    lines.forEach(line => {
      if (line.startsWith('Question: ')) {
        if (currentQuestion && currentAnswer) {
          flashcards.push({ front: currentQuestion, back: currentAnswer });
          currentQuestion = '';
          currentAnswer = '';
        }
        currentQuestion = line.replace('Question: ', '').trim();
      } else if (line.startsWith('Answer: ')) {
        currentAnswer = line.replace('Answer: ', '').trim();
      }
    });
  });

  if (currentQuestion && currentAnswer) {
    flashcards.push({ front: currentQuestion, back: currentAnswer });
  }

  console.log("Parsed Flashcards:", flashcards);
  return { flashcards };
}





