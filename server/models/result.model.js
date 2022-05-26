const mongoose = require('mongoose');

const examResultSchema = mongoose.Schema({
    score: Number,
    remark: String,
    timeSpent: String,
    completedDate: String,
    answers: [],
    correctAnswers: [],
    exam: { //* Exam result relationship with exam
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams'
    }
})

module.exports = mongoose.model('Result', examResultSchema)