
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const GetQuizz = () => {
    const [quizz, setquizz]= useState(null);
    const { quizzId } = useParams();

    useEffect(()=>{
        const fetchdata = async ()=>{
            try {
                const authToken = sessionStorage.getItem('authToken')
                const getUri = 'http://localhost:3000/quizz/getquizz/' + quizzId;
                const res = await axios.get(getUri, {
                    headers:{
                      'auth-token': authToken,
                      'Content-Type': 'application/json',
                    }
                  });

                  
                if (res.data && res.data.questions) {
                    // console.log('Fetched Quizz:', res.data); // Log fetched data
                    setquizz(res.data); // Update quizz state with fetched data
                } else {
                    // console.log('No questions found for quiz'); // Log no questions found
                    setquizz(null); // Set quizz state to null if no questions found
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [quizzId]);
    


  return ( 
    <div>
    {quizz ? (
        <div>
            <h2>Quiz: {quizz.title}</h2>
            {}
            {quizz.questions && quizz.questions.length > 0 ? (
                <div>
                    <h3>Questions:</h3>
                    <ul>
                        {quizz.questions.map((question, index) => (
                            <li key={question._id}>
                                <p>Question {index + 1}: {question.question}</p>
                                {/* <button onClick={() => editQuestion(question._id)}>Edit</button> */}
                                <ul>
                                    {question.options.map((option, optionIndex) => (
                                        <li key={option._id}>
                                            <p>Option {optionIndex + 1}</p>{option.option}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No questions found for this quiz.</p>
            )}
        </div>
    ) : (
        <p>Loading quiz...</p>
    )}
</div>
);
}

export default GetQuizz
