const mongoose = require('mongoose');

const quizzAttemptSchema = new mongoose.Schema({
    quizzid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quizz',
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    response: [
        {
            question: {}
        }
    ]
    
})