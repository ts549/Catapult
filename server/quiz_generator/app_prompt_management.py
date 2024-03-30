from openai import OpenAI
import os

# need to fit with react model
def llm_model(prompt):
    os.getenv["OPENAI_KEY"]
    client = OpenAI()
    response = client.chat.completions.create(model="gpt-4", 
                             messages=
                             [
                                 {"role": "system", "content": "You are helpful assistant."},
                                 {"role": "user", "content": prompt}   
                             ])
    print(response.choices[0].message.content)
    return response.choices[0].message.content

# llm_model("Generate a quiz for biology",os.getenv("OPENAI_KEY"))

