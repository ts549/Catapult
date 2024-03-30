from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.schema import StrOutputParser
import os
from openai import OpenAI

# hardcode api key
# api_key = "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"
# OpenAI.api_key = api_key

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
                - 1. What is the time complexity of a binary search tree?
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
            - Answers:    
                <Answer1>:
                <Answer2>:
            Example:
                Questions:
                - 1. What is a binary search tree?
                - 2. How are binary search trees implemented?
                
                - Answers: 
                    1. A binary search tree is a data structure that is used to store data in a sorted manner.
                    2. Binary search trees are implemented using linked lists.
    """
    prompt = ChatPromptTemplate.from_template(template)
    prompt.format(num_questions_type_1=3, quiz_type_1="multiple-choice", num_questions_type_2=1, quiz_type_2="open-ended", quiz_context="Data Structures in Python Programming")
    
    return prompt

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

def create_quiz_chain(prompt_template,llm):
    """Creates the chain for the quiz app."""
    return prompt_template | llm |  StrOutputParser()

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
    llm = ChatOpenAI(temperature=0.0)
    chain = create_quiz_chain(prompt_template,llm)

    context = "Data Structures in Python Programming"
    num_questions_type_1 = 3
    quiz_type_1 ="multiple-choice"
    num_questions_type_2 = 1
    quiz_type_2 ="open-ended"
    quiz_response = chain.invoke({"quiz_type":quiz_type_1,"num_questions":num_questions_type_1,"quiz_type":quiz_type_2,"num_questions":num_questions_type_2,"quiz_context":context})
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