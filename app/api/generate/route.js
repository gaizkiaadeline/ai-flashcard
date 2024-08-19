import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY);

const systemPrompt = `You are a flashcard creator for an educational platform. Your task is to create a set of unique and creative flashcards that effectively capture the key concepts and terminology from the user's input. Each flashcard should have a clear, thought-provoking question on the front and a detailed, easy-to-understand explanation on the back. The flashcards should be designed to help students better understand and retain the material, making their study sessions more engaging and productive.

Example flashcard:
Front: Which organelle is often referred to as the "powerhouse" of the cell, and why is this an appropriate nickname?
A) Nucleus
B) Mitochondria
C) Endoplasmic reticulum
D) Golgi apparatus

Back: The correct answer is B) Mitochondria. Mitochondria are often called the "powerhouses" of the cell because they are responsible for generating most of the cell's supply of adenosine triphosphate (ATP), the primary energy currency used by cells to power their various functions. Mitochondria use a process called cellular respiration to convert the chemical energy stored in glucose and other organic molecules into ATP, which can then be used by the cell to fuel its activities.
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





