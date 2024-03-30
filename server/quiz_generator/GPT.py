from openai import OpenAI
import base64
import json
import requests
import os
import re
from langchain import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.schema import BaseOutputParser
    # Goals:
    # given a page of a pdf, a concept, etc
    # develop a simple interface
    # generate flexible quizzes with many types of questions
    # T/F, test-based, multiple choice)
    # potential feedback on answers

    # Requirements:
    # specific
    # specify types of question created
    # specify number qusetions
    # take in video and text information


def get_response(prompt_question,):
    response = OpenAI.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are a helful research\
                and programming assistant"},
                    {"role": "user", "content": prompt_question}]
                    
    )
    
    return response["choices"][0]["message"]["content"]

prompt = "Create a quiz about the basics of Python"
quiz_python = get_response(prompt)

def create_the_quiz_prompt_emplate():
    template = """ 
    You are an expert quiz maker for technical fields.
    Create a quiz with {num_questions} {quiz_type} about the following concept/content: {quiz_context}:
    Let's think step by step. The format of each quiz should be as such:
    - Multiple-choice:
        - Questions:
            <Question1>: <a. Answer 1>, <b. Answer 2>, <c. Answer 3>, <d. Answer 4>
            <Question2>: <a. Answer 1>, <b. Answer 2>, <c. Answer 3>, <d. Answer 4>
            ....
        - Answers:
            <Answer1>: <a|b|c|d>
            <Answer2>: <a|b|c|d>
            ....
            Example:
            - Questions:
                1. What is the time complexity of a binary search tree?
                    a. O(n)
                    b. O(log n)
                    c. O(n^2)
                    d. O(1)
            - Answers: 
                1. b
    - True-false:
        - Questions:
            <Question1>: <True|False>
            <Question2>: <True|False>
            .....
        - Answers:
            <Answer1>: <True|False>
            <Answer2>: <True|False>
            .....
        Example:
        - Questions:
            - 1. What is a binary search tree?
            - 2. How are binary search trees implemented?
        - Answers:
            1. True
            2. False
    - Open-ended:
        - Questions:
            <Question1>:
            <Question2>:
        - Answers:
            <Answer1>:
            <Answer2>:
        Example:
        - Questions:
            1. What is a binary search tree?
            2. How are binary search trees implemented?
        - Answers:
            1. A binary search tree is a data structure that is used to store data in a sorted manner.
            2. Binary search trees are implemented using linked lists. 
            
        YOU HAVE TO MAKE SURE ALL THE DATA IS IN A JSON FORMAT WHICH MUST BE JSON PARSABLE FOR
    """

    prompt = PromptTemplate.from_template(template)
    prompt.format(num_questions=1, type="multiple choice", quiz_context="Data Structures")
    return prompt

def create_quiz_chain(prompt_template, llm): 
    return LLMChain(llm=llm, prompt=prompt_template)

# class AnswersParser(BaseOutputParser):
#     # Parse the output of an LLM call to a comma-separated list.
#     def parse(self, text: str):
#         """ Parse the output of an LLM call. """
#         # use regex to extract content after "Answers:"
#         answers_section = re.search(r"Answers:(.*", text, re.DOTALL)
        
#         if answers_section:
#             answers_text = answers_section.group().strip()

#             # Extract individual answer susing regex
#             answers = re.findall(r"[a-d]\) .+", answers_text)

#         return answers

class QuestionsAnswersParser(BaseOutputParser):
    """Parse the output of an LLM call to a comma-separated list."""
    def parse(self, text: str):
        # Step 1: Separate Questions and Answers sections
        questions_match = re.search(r"Questions:(.+?)Answers:", text, re.DOTALL)
        if questions_match:
            questions_text = questions_match.group(1).strip()
            questions = re.findall(r"^\d+: (.+)", questions_text, re.MULTILINE)
        else:
            questions = []

        # Step 2: Parse Answers
        answers_text = re.search(r"Answers:(.+)", text, re.DOTALL).group(1).strip()
        answers = re.findall(r"[a-d]\) .+", answers_text)
        
        # Step 3: Combine Questions and Answers
        return [questions,answers]

chain = LLMChain(llm=ChatOpenAI(model="gpt-4"),
                    prompt=prompt,
                    output_parser=QuestionsAnswersParser())
[questions,answers] = chain.run(num_questions=3, quiz_type="multiple_choice", quiz_context="Data Structures")

# class GPT:
    # # Goals:
    # # Find a dataset to train this on or make your own dataset
    # # Change the outputs, for now I just wrote some light examples like "give me the most important parts"
    # # but you should change it to something more specific for our project like "give me x questions" or something
    # # Change other parts that you think would help the model

    # def train(self, messages, iterations, train_data, train_results):
    #     for i in range(iterations):

    #         with open(train_data[i], 'r') as file:
    #             train_text = file.read()

    #         # Do this to get the data and store it in variable train_text
    #         # Same thing for train_results and store in train_result

    #         train_result = None

    #         # Look into "system", "user", "assistant" roles for GPT api
    #         # Use this to make the model better and see if you can add more specifications

    #         # This is only a very basic interaction that I added, you should change it and make it better
    #         messages.append({
    #             "role": "user",
    #             "content": [{
    #                 "type": "text",
    #                 "text": "Here is a long piece of text."
    #             },
    #             {
    #                 "type": "text",
    #                 "text": {
    #                     train_text
    #                 }
    #             },
    #             {
    #                 "type": "text",
    #                 "text": "Please give me the most important parts of this text."
    #             }]
    #         })

    #         messages.append({
    #             "role": "assistant",
    #             "content": [{
    #                 "type": "text",
    #                 "text": train_result
    #             }]
    #         })

    # def test(self, test_data, test_results):

    #     api_key=""

    #     messages = []

    #     # Get the train data and results
    #     train_data = None
    #     train_results = None

    #     self.train(messages, iterations=5, train_data=train_data, train_results=train_results)

    #     messages.append({
    #         "role": "user",
    #         "content": [{
    #             "type": "text",
    #             "text": "Here is a large piece of text."
    #         },
    #         {
    #             "type": "text",
    #             "text": test_data
    #         },
    #         {
    #             "type": "text",
    #             "text": "Please give me the most important parts of the text."
    #         }]
    #     })

    #     headers = {
    #         "Content-Type": "application/json",
    #         "Authorization": f"Bearer {api_key}"
    #     }

    #     payload = {
    #         "model": "gpt-4-vision-preview",
    #         "messages": messages,
    #         "max_tokens": 1500
    #     }

    #     response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    #     print(response.json()['choices'][0]['message']['content'])