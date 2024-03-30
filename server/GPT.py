from openai import OpenAI
import base64
import json
import requests
import os

class GPT:

    # Goals:
    # Find a dataset to train this on or make your own dataset
    # Change the outputs, for now I just wrote some light examples like "give me the most important parts"
    # but you should change it to something more specific for our project like "give me x questions" or something
    # Change other parts that you think would help the model

    def train(self, messages, iterations, train_data, train_results):
        for i in range(iterations):

            with open(train_data[i], 'r') as file:
                train_text = file.read()

            # Do this to get the data and store it in variable train_text
            # Same thing for train_results and store in train_result

            train_result = None

            # Look into "system", "user", "assistant" roles for GPT api
            # Use this to make the model better and see if you can add more specifications

            # This is only a very basic interaction that I added, you should change it and make it better
            messages.append({
                "role": "user",
                "content": [{
                    "type": "text",
                    "text": "Here is a long piece of text."
                },
                {
                    "type": "text",
                    "text": {
                        train_text
                    }
                },
                {
                    "type": "text",
                    "text": "Please give me the most important parts of this text."
                }]
            })

            messages.append({
                "role": "assistant",
                "content": [{
                    "type": "text",
                    "text": train_result
                }]
            })

    def test(self, test_data, test_results):

        api_key=""

        messages = []

        # Get the train data and results
        train_data = None
        train_results = None

        self.train(messages, iterations=5, train_data=train_data, train_results=train_results)

        messages.append({
            "role": "user",
            "content": [{
                "type": "text",
                "text": "Here is a large piece of text."
            },
            {
                "type": "text",
                "text": test_data
            },
            {
                "type": "text",
                "text": "Please give me the most important parts of the text."
            }]
        })

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        payload = {
            "model": "gpt-4-vision-preview",
            "messages": messages,
            "max_tokens": 1500
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        print(response.json()['choices'][0]['message']['content'])