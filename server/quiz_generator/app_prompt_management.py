from openai import OpenAI
import os

# need to fit with react model
def llm_model(prompt,openai_api_key):
    if openai_api_key != "":
        os.environ["OPENAI_API_KEY"] = openai_api_key
    # else:
    #     st.error("Please enter your OpenAI API key")
    #     return
    client = OpenAI()
    response = client.chat.completions.create(model="gpt-4", 
                             messages=
                             [
                                 {"role": "system", "content": "You are helpful assistant."},
                                 {"role": "user", "content": prompt}   
                             ])
    print(response.choices[0].message.content)
    return response.choices[0].message.content

