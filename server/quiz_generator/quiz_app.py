from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.schema import StrOutputParser
import os
import openai
import json
import functools

# hardcode api key
# api_key = "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"
# OpenAI.api_key = api_key

# def llm_model(prompt):
#     key_val = "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"
#     os.environ["OPENAI_API_KEY"] = key_val
#     # os.getenv("OPENAI_API_KEY")

#     client = OpenAI()
#     response = client.chat.completions.create(model="gpt-4", 
#                              messages=
#                              [
#                                  {"role": "system", "content": "You are helpful assistant."},
#                                  {"role": "user", "content": prompt}   
#                              ])
#     print(response.choices[0].message.content)
#     return response.choices[0].message.content

# def get_response(prompt_template, max_tokens=500):
#     # Convert prompt_template to a dictionary
#     prompt_dict = prompt_template.to_dict()

#     # Convert prompt_dict to a JSON string
#     prompt_json = json.dumps(prompt_dict)

#     # Call the OpenAI API to get response
#     response = openai.chat.completions.create(
#         model="gpt-4",  # Or whichever model you prefer
#         messages=[{"role": "system", "content": prompt_json}]
#     )

#     # Extract the response text
#     response_text = response.choices[0].message['content']

#     # Truncate response if necessary
#     truncated_response = response_text[:max_tokens]

#     return truncated_response

# # def get_response(prompt_template):
# #     # Convert prompt_template to a JSON serializable format
# #     prompt_json = json.dumps(prompt_template)
# #     response = openai.chat.completions.create(
# #         model="gpt-4",
# #         messages=
# #         [
# #             {"role": "system", "content": "You are helpful assistant."},
# #             {"role": "user", "content": prompt_json}   
# #         ],
# #         max_tokens=500  # Adjust as needed
# #     )
# #     return response.choices[0].text.strip()

# # Assuming you have initialized your OpenAI client with an API key
# openai = OpenAI(api_key="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")

# class ChatPromptTemplate:
#     def __init__(self, template):
#         self.template = template

#     def to_dict(self):
#         # Convert the object's data to a dictionary
#         return {"template": self.template}
        
#     def format(self, **kwargs):
#         return self.template.format(**kwargs)

# def create_the_quiz_prompt_template():
#     """Create the prompt template for the quiz app."""
    
#     template = """
#         You are an expert quiz maker for technical fields. Let's think step by step and
#         create a quiz with {num_questions_type_1} {quiz_type_1} {num_questions_type_2} {quiz_type_2} questions about the following concept/content: {quiz_context}.

#         The format of the quiz could be one of the following:
#         - Multiple-choice: 
#             - Questions:
#                 <Question1>: <a. Answer 1>, <b. Answer 2>, <c. Answer 3>, <d. Answer 4>
#                 <Question2>: <a. Answer 1>, <b. Answer 2>, <c. Answer 3>, <d. Answer 4>
#                 ....
#             - Answers:
#                 <Answer1>: <a|b|c|d>
#                 <Answer2>: <a|b|c|d>
#                 ....
#                 Example:
#                 - Questions:
#                     1. What is the time complexity of a binary search tree?
#                         a. O(n)
#                         b. O(log n)
#                         c. O(n^2)
#                         d. O(1)
#                 - Answers: 
#                     1. b
#         - Open-ended:
#             - Questions:
#                 <Question1>: 
#                 <Question2>:
#                 ....
#             - Answers:    
#                 <Answer1>:
#                 <Answer2>:
#                 ....
#             Example:
#                 - Questions:
#                     1. What is a binary search tree?
#                     2. How are binary search trees implemented?
                
#                 - Answers: 
#                     1. A binary search tree is a data structure that is used to store data in a sorted manner.
#                     2. Binary search trees are implemented using linked lists.
#     """
#     prompt = ChatPromptTemplate(template)
#     prompt.format(num_questions_type_1=3, quiz_type_1="multiple-choice", num_questions_type_2=1, quiz_type_2="open-ended", quiz_context="Data Structures in Python Programming")
    
#     return prompt

# def get_response(prompt_template, max_tokens=500):
#     try:
#         # Convert prompt_template to a dictionary
#         prompt_dict = prompt_template.to_dict()

#         # Convert prompt_dict to a JSON string
#         prompt_json = json.dumps(prompt_dict)

#         # Call the OpenAI API to get response
#         response = openai.chat.completions.create(
#             model="gpt-4",  # Or whichever model you prefer
#             messages=[{"role": "system", "content": prompt_json}]
#         )

#         # Check if response.choices is not empty
#         if response.choices:
#             # Extract the response text
#             response_text = response.choices[0].message
#             if 'content' in response_text:
#                 response_text = response_text['content']

#             # Truncate response if necessary
#             truncated_response = response_text[:max_tokens]

#             return truncated_response
#         else:
#             return "No response received"
#     except Exception as e:
#         return f"Error occurred: {str(e)}"

# def create_quiz_chain(prompt_template,llm):
#     """Creates the chain for the quiz app."""
#     return prompt_template | llm |  StrOutputParser()

class ChatPromptTemplate:
    def __init__(self, template):
        self.template = template

    def to_dict(self):
        # Convert the object's data to a dictionary
        return {"template": self.template}
        
    def format(self, **kwargs):
        return self.template.format(**kwargs)

def create_the_quiz_prompt_template():
    """Create the prompt template for the quiz app."""
    
    template = """
        You are an expert quiz maker for technical fields. Let's think step by step and
        create a quiz with {num_questions_type_1} {quiz_type_1} {num_questions_type_2} {quiz_type_2} questions about the following concept/content: {quiz_context}.

        The format of the quiz could be one of the following:
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
        - Open-ended:
            - Questions:
                <Question1>: 
                <Question2>:
                ....
            - Answers:    
                <Answer1>:
                <Answer2>:
                ....
            Example:
                - Questions:
                    1. What is a binary search tree?
                    2. How are binary search trees implemented?
                
                - Answers: 
                    1. A binary search tree is a data structure that is used to store data in a sorted manner.
                    2. Binary search trees are implemented using linked lists.
    """
    prompt = ChatPromptTemplate(template)
    prompt.format(num_questions_type_1=3, quiz_type_1="multiple-choice", num_questions_type_2=1, quiz_type_2="open-ended", quiz_context="Data Structures in Python Programming")
    
    return prompt

def get_response(prompt_template, max_tokens=500):
    try:
        # Convert prompt_template to a dictionary
        prompt_dict = prompt_template.to_dict()

        # Convert prompt_dict to a JSON string
        prompt_json = json.dumps(prompt_dict)

        # Call the OpenAI API to get response
        response = openai.chat.completions.create(
            model="gpt-4",  # Or whichever model you prefer
            messages=[{"role": "system", "content": prompt_json}]
        )

        # Check if response.choices is not empty
        if response.choices:
            # Extract the response text
            response_text = response.choices[0].message
            if 'content' in response_text:
                response_text = response_text['content']

            # Truncate response if necessary
            truncated_response = response_text[:max_tokens]

            return truncated_response
        else:
            return "No response received"
    except Exception as e:
        return f"Error occurred: {str(e)}"

def compose(*functions):
    """Compose functions."""
    def composed(*args, **kwargs):
        result = args[0]
        for func in functions[1:]:
            if callable(func):
                result = func(result)
            else:
                raise TypeError(f"Function {func} is not callable.")
        return result
    return composed

# def create_quiz_chain(prompt_template, llm):
#     """Creates the chain for the quiz app."""
#     composed_function = compose(prompt_template.format, llm)
#     return composed_function
def create_quiz_chain(prompt_template):
    """Creates the chain for the quiz app."""
    def composed_function(input_data):
        formatted_prompt = prompt_template.format(**input_data)
        # Extract relevant information from llm if needed
        # Example: response_text = llm.choices[0].message['content']
        # Then continue with the chain
        return formatted_prompt
    return composed_function

def split_questions_answers(quiz_response):
    """Function that splits the questions and answers from the quiz response."""
    questions = quiz_response.split("Answers:")[0]
    answers = quiz_response.split("Answers:")[1]
    return questions, answers

def main():
    prompt_template = create_the_quiz_prompt_template()
    # llm = llm_model("Generate a quiz for biology")
    key_val = "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"
    os.environ["OPENAI_API_KEY"] = key_val
    # llm = ChatOpenAI(temperature=0.0)
    llm = get_response(prompt_template)
    chain = create_quiz_chain(prompt_template, l)

    context = "Data Structures in Python Programming"
    num_questions_type_1 = 3
    quiz_type_1 ="multiple-choice"
    num_questions_type_2 = 1
    quiz_type_2 ="open-ended"
    
    # quiz_response = chain.invoke({"quiz_type_1":quiz_type_1,"num_questions_type_1":num_questions_type_1,"quiz_type_2":quiz_type_2,"num_questions_type_2":num_questions_type_2,"quiz_context":context})
    quiz_response = chain({"quiz_type_1": quiz_type_1, "num_questions_type_1": num_questions_type_1, "quiz_type_2": quiz_type_2, "num_questions_type_2": num_questions_type_2, "quiz_context": context})

    questions,answers = split_questions_answers(quiz_response)
    print(questions)
    print(answers)

    # front-end
    #-----------------------------------
    # context = st.text_area("Enter the concept/context for the quiz")
    # num_questions = st.number_input("Enter the number of questions",min_value=1,max_value=10,value=3)
    # quiz_type = st.selectbox("Select the quiz type",["multiple-choice","true-false", "open-ended"])
    # if st.button("Generate Quiz"):
    #     quiz_response = chain.invoke({"quiz_type":quiz_type,"num_questions":num_questions,"quiz_context":context})
    #     st.write("Quiz Generated!")        
    #     questions,answers = split_questions_answers(quiz_response)
    #     st.session_state.answers = answers
    #     st.session_state.questions = questions
    #     st.write(questions)
    # if st.button("Show Answers"):
    #     st.markdown(st.session_state.questions)
    #     st.write("----")
    #     st.markdown(st.session_state.answers)
        
if __name__=="__main__":
    main()