from openai import OpenAI
import os
from dotenv import load_dotenv
from flask import jsonify
import pickle
load_dotenv()

client = OpenAI()

SYSTEM_STRING = "You are a quiz generator that generates quiz questions and answers for users. It is very important that the format you answer with is valid JSON."

FORMAT_STRING="""
The format of your response should be a valid JSON that looks like this:
interface Question {
  question: string;
  choices?: string[];
  answer?: string;
  question_type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
}[]
"""

def openai_call(prompt, variations):
    response = client.chat.completions.create(model="gpt-3.5-turbo-0125",
                                              n=variations,
                                              response_format={ "type": "json_object" },
                                              messages=[
                                                  {"role": "system", "content": SYSTEM_STRING + FORMAT_STRING},
                                                  {"role": "user", "content": prompt}
                                              ])
    return [choice.message.content for choice in response.choices]

def create_quiz(prompt, multiple_choice, true_false, short_answer, variations):
    string = f"Create a quiz that has {multiple_choice} multiple choice questions, {true_false} true and false questions, and {short_answer} short_answer questions based on this following text"
    string += prompt
    return openai_call(string, int(variations))