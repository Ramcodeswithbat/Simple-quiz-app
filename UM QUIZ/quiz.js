// const quizData = [
//     {
//         question: "What is the capital of France?",
//         answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
//         correct: 2
//     },
//     {
//         question: "Who wrote 'Hamlet'?",
//         answers: ["Shakespeare", "Dickens", "Tolstoy", "Hemingway"],
//         correct: 0
//     },
//     {
//         question: "What is the chemical symbol for water?",
//         answers: ["O2", "CO2", "H2O", "He"],
//         correct: 2
//     },
//     {
//         question: "Which planet is known as the Red Planet?",
//         answers: ["Earth", "Mars", "Jupiter", "Saturn"],
//         correct: 1
//     },
//     {
//         question: "What is the largest ocean?",
//         answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
//         correct: 3
//     }
// ];

// const quizForm = document.getElementById('quiz-form');
// const scoreDisplay = document.getElementById('score');
// const nextBtn = document.getElementById('next-btn');
// const prevBtn = document.getElementById('prev-btn');
// const submitBtn = document.getElementById('submit-btn');
// let currentQuestionIndex = 0;
// let score = 0;
// const userAnswers = [];

// // Load a specific question by index
// function loadQuestion(index) {
//     quizForm.innerHTML = ''; // Clear the form before loading the new question
//     const item = quizData[index];

//     // Create the question block
//     const questionDiv = document.createElement('div');
//     questionDiv.classList.add('question');
//     questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
//     quizForm.appendChild(questionDiv);

//     // Create the answer options block
//     const answersDiv = document.createElement('div');
//     answersDiv.classList.add('answer-options');
//     item.answers.forEach((answer, answerIndex) => {
//         answersDiv.innerHTML += `
//             <label>
//                 <input type="radio" name="question${index}" value="${answerIndex}" ${userAnswers[index] === answerIndex ? 'checked' : ''}>
//                 ${answer}
//             </label>
//         `;
//     });
//     quizForm.appendChild(answersDiv);

//     // Show or hide navigation buttons
//     prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
//     nextBtn.style.display = index === quizData.length - 1 ? 'none' : 'inline-block';
//     submitBtn.style.display = index === quizData.length - 1 ? 'inline-block' : 'none';
// }

// // Save user's answer for the current question
// function saveAnswer(index) {
//     const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
//     if (userAnswer) {
//         userAnswers[index] = parseInt(userAnswer.value);
//     }
// }

// // Calculate the total score
// function calculateScore() {
//     score = 0;
//     quizData.forEach((item, index) => {
//         if (userAnswers[index] === item.correct) {
//             score++;
//         }
//     });
//     scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}`;
// }

// // Event listeners for navigation buttons
// nextBtn.addEventListener('click', () => {
//     saveAnswer(currentQuestionIndex);
//     if (currentQuestionIndex < quizData.length - 1) {
//         currentQuestionIndex++;
//         loadQuestion(currentQuestionIndex);
//     }
// });

// prevBtn.addEventListener('click', () => {
//     saveAnswer(currentQuestionIndex);
//     if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         loadQuestion(currentQuestionIndex);
//     }
// });

// submitBtn.addEventListener('click', () => {
//     saveAnswer(currentQuestionIndex);
//     calculateScore();
// });

// // Initial question load
// loadQuestion(currentQuestionIndex);


document.addEventListener('DOMContentLoaded', function() {
    const quizData = JSON.parse(localStorage.getItem('quizData')) || [];
    const quizForm = document.getElementById('quiz-form');
    const scoreDisplay = document.getElementById('score');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    let currentQuestionIndex = 0;
    let score = 0;
    const userAnswers = [];

    // Check if quizData is available
    if (quizData.length === 0) {
        quizForm.innerHTML = '<p>No quiz data available. Please create a quiz first.</p>';
        return;
    }

    // Load a specific question by index
    function loadQuestion(index) {
        quizForm.innerHTML = ''; // Clear the form before loading the new question
        const item = quizData[index];

        // Create the question block
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
        quizForm.appendChild(questionDiv);

        // Create the answer options block
        const answersDiv = document.createElement('div');
        answersDiv.classList.add('answer-options');
        item.answers.forEach((answer, answerIndex) => {
            answersDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${answerIndex}" ${userAnswers[index] === answerIndex ? 'checked' : ''}>
                    ${answer}
                </label>
            `;
        });
        quizForm.appendChild(answersDiv);

        // Show or hide navigation buttons
        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === quizData.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = index === quizData.length - 1 ? 'inline-block' : 'none';
    }

    // Save user's answer for the current question
    function saveAnswer(index) {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (userAnswer) {
            userAnswers[index] = parseInt(userAnswer.value);
        }
    }

    // Calculate the total score
    function calculateScore() {
        score = 0;
        quizData.forEach((item, index) => {
            if (userAnswers[index] === item.correct) {
                score++;
            }
        });
        scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}`;
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        saveAnswer(currentQuestionIndex);
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        saveAnswer(currentQuestionIndex);
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener('click', () => {
        saveAnswer(currentQuestionIndex);
        calculateScore();
    });

    // Initial question load
    loadQuestion(currentQuestionIndex);
});
