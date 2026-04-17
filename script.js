const flashcards = [
  {
    id: 1,
    question: "What is a recommender system in the context of online business?",
    answer:
      "It is a system that analyzes user behavior and item data to suggest products or content that each user is likely to find relevant, such as 'you may also like' lists on shopping or streaming sites.",
    topic: "Basics",
  },
  {
    id: 2,
    question: "Why do businesses invest heavily in recommender systems?",
    answer:
      "Because good recommendations help users find items faster, increase engagement and sales, and improve user satisfaction compared with showing the same items to everyone.",
    topic: "Basics",
  },
  {
    id: 3,
    question: "What is the main idea behind collaborative filtering?",
    answer:
      "Collaborative filtering uses patterns from many users' behaviors to recommend items, assuming that users with similar past actions will like similar items in the future.",
    topic: "Techniques",
  },
  {
    id: 4,
    question: "What is content-based filtering?",
    answer:
      "Content-based filtering recommends items that are similar in features to what a user already liked, based on item attributes such as genre, keywords, or product category.",
    topic: "Techniques",
  },
  {
    id: 5,
    question: "What is a hybrid recommender system?",
    answer:
      "A hybrid system combines collaborative and content-based methods to benefit from both, for example using user-item behavior data when available and falling back to item features when data is sparse.",
    topic: "Techniques",
  },
  {
    id: 6,
    question: "In a large-scale recommender system, what is the purpose of the candidate generation stage?",
    answer:
      "Candidate generation quickly narrows down the full catalog to a manageable set of potentially relevant items for each user, which will then be scored more carefully by downstream models.",
    topic: "Architecture",
  },
  {
    id: 7,
    question: "What happens in the scoring and re-ranking stages of a recommender system?",
    answer:
      "Scoring assigns a relevance score to each candidate item using a model, and re-ranking adjusts the final order to satisfy additional goals like diversity, freshness, or business rules.",
    topic: "Architecture",
  },
  {
    id: 8,
    question: "How can large language models (LLMs) be used in recommender systems?",
    answer:
      "LLMs can summarize reviews, extract features from text, generate explanations, and in some designs act as part of the ranking or reranking process by reasoning over user and item descriptions.",
    topic: "LLMs",
  },
  {
    id: 9,
    question: "What is a key privacy risk when using LLMs with user data in recommendation?",
    answer:
      "Because LLMs are trained on large datasets and interact with users via prompts, they can inadvertently memorize or reveal sensitive information, and adversaries may exploit this to infer private user attributes or data.",
    topic: "Ethics",
  },
  {
    id: 10,
    question: "Name one high-level strategy to reduce privacy risks in recommender systems.",
    answer:
      "One strategy is to minimize and anonymize stored personal data and use privacy-preserving techniques such as differential privacy or federated learning, which limit direct access to raw user information.",
    topic: "Ethics",
  },
];

const questionElement = document.getElementById("flashcard-question");
const answerElement = document.getElementById("flashcard-answer");
const topicElement = document.getElementById("flashcard-topic");
const progressCountElement = document.getElementById("flashcard-progress-count");
const progressElement = document.getElementById("flashcard-progress");
const showAnswerButton = document.getElementById("show-answer-btn");
const correctButton = document.getElementById("correct-btn");
const wrongButton = document.getElementById("wrong-btn");
const restartButton = document.getElementById("restart-btn");

if (questionElement && answerElement && showAnswerButton && correctButton && wrongButton && restartButton) {
  let deck = [];
  let currentIndex = 0;
  let correctCount = 0;
  let totalCount = 0;
  let answerRevealed = false;

  function shuffleCards(cards) {
    const shuffled = [...cards];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  }

  function updateProgress() {
    progressCountElement.textContent = `${Math.min(currentIndex + 1, deck.length)} / ${deck.length}`;
    progressElement.textContent = deck.length === 0 ? "No cards available." : `Correct: ${correctCount} of ${totalCount}`;
  }

  function setActionState(revealed) {
    answerRevealed = revealed;
    answerElement.hidden = !revealed;
    correctButton.hidden = !revealed;
    wrongButton.hidden = !revealed;
    showAnswerButton.hidden = revealed;
  }

  function showCard(index) {
    if (deck.length === 0) {
      questionElement.textContent = "No flashcards were loaded.";
      answerElement.textContent = "";
      topicElement.textContent = "Topic";
      progressCountElement.textContent = "0 / 0";
      progressElement.textContent = "Add cards to start the deck.";
      setActionState(false);
      return;
    }

    const card = deck[index];
    questionElement.textContent = card.question;
    answerElement.textContent = card.answer;
    topicElement.textContent = card.topic;
    setActionState(false);
    updateProgress();
  }

  function finishDeck() {
    questionElement.textContent = "Deck complete";
    answerElement.textContent = `You answered ${correctCount} out of ${totalCount} cards correctly.`;
    topicElement.textContent = "Done";
    setActionState(true);
    correctButton.hidden = true;
    wrongButton.hidden = true;
    showAnswerButton.hidden = true;
    progressElement.textContent = `Final score: ${correctCount}/${totalCount}. Use Restart Deck to try again.`;
  }

  function advanceCard(isCorrect) {
    totalCount += 1;
    if (isCorrect) {
      correctCount += 1;
    }

    currentIndex += 1;
    if (currentIndex >= deck.length) {
      finishDeck();
      return;
    }

    showCard(currentIndex);
  }

  function revealAnswer() {
    if (deck.length === 0) {
      return;
    }
    setActionState(true);
  }

  function restartDeck() {
    deck = shuffleCards(flashcards);
    currentIndex = 0;
    correctCount = 0;
    totalCount = 0;
    showCard(currentIndex);
  }

  showAnswerButton.addEventListener("click", revealAnswer);
  correctButton.addEventListener("click", () => advanceCard(true));
  wrongButton.addEventListener("click", () => advanceCard(false));
  restartButton.addEventListener("click", restartDeck);

  restartDeck();
}

const quizQuestionElement = document.getElementById("quiz-question");
const quizOptionsElement = document.getElementById("quiz-options");
const quizTopicElement = document.getElementById("quiz-topic");
const quizProgressCountElement = document.getElementById("quiz-progress-count");
const quizProgressElement = document.getElementById("quiz-progress");
const quizNextButton = document.getElementById("quiz-next-btn");
const quizRestartButton = document.getElementById("quiz-restart-btn");

if (quizQuestionElement && quizOptionsElement && quizTopicElement && quizProgressCountElement && quizProgressElement && quizNextButton && quizRestartButton) {
  const quizCards = [
    {
      id: 1,
      question: "Which stage first narrows the full catalog down to a smaller set of candidate items?",
      options: ["Scoring", "Candidate generation", "Re-ranking", "Final selection"],
      correctIndex: 1,
      topic: "Architecture",
    },
    {
      id: 2,
      question: "Which method recommends items based on similar item features such as genre or keywords?",
      options: ["Collaborative filtering", "Content-based filtering", "Random ranking", "Popularity-only ranking"],
      correctIndex: 1,
      topic: "Techniques",
    },
    {
      id: 3,
      question: "What is one reason businesses use recommender systems?",
      options: ["To remove all user choice", "To help users find relevant items faster", "To avoid using any data", "To make every list identical"],
      correctIndex: 1,
      topic: "Basics",
    },
    {
      id: 4,
      question: "Which option best describes collaborative filtering?",
      options: ["Using only item labels", "Using patterns from many users' behavior", "Using random prompts", "Using no user data at all"],
      correctIndex: 1,
      topic: "Techniques",
    },
    {
      id: 5,
      question: "Why can re-ranking be important in a large-scale recommender system?",
      options: ["It always removes the need for scoring", "It adds diversity, freshness, or business rules", "It deletes the catalog", "It only sorts by item price"],
      correctIndex: 1,
      topic: "Architecture",
    },
    {
      id: 6,
      question: "How can LLMs help in recommender systems?",
      options: ["Only by hiding all content", "By summarizing text and generating explanations", "By removing all ranking logic", "By making user data unusable"],
      correctIndex: 1,
      topic: "LLMs",
    },
    {
      id: 7,
      question: "What is a privacy risk when LLMs are combined with user data?",
      options: ["They always make data smaller", "They may reveal or memorize sensitive information", "They guarantee total anonymity", "They eliminate all bias"],
      correctIndex: 1,
      topic: "Ethics",
    },
    {
      id: 8,
      question: "Which strategy can help reduce privacy risks in recommender systems?",
      options: ["Keep all raw data forever", "Use data minimization and anonymization", "Ignore user consent", "Remove all ranking"],
      correctIndex: 1,
      topic: "Ethics",
    },
  ];

  let quizDeck = [];
  let quizCurrentIndex = 0;
  let quizSelectedAnswers = [];
  let quizAnswered = false;

  function shuffleItems(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  }

  function updateQuizProgress() {
    quizProgressCountElement.textContent = `${Math.min(quizCurrentIndex + 1, quizDeck.length)} / ${quizDeck.length}`;
    quizProgressElement.textContent = `Answer all ${quizDeck.length} questions to see your results.`;
  }

  function renderQuizQuestion() {
    const card = quizDeck[quizCurrentIndex];
    quizQuestionElement.textContent = card.question;
    quizTopicElement.textContent = card.topic;
    quizOptionsElement.innerHTML = "";

    card.options.forEach((option, optionIndex) => {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = "quiz-option";
      optionButton.textContent = option;
      optionButton.setAttribute("aria-pressed", "false");
      optionButton.addEventListener("click", () => {
        const currentButtons = quizOptionsElement.querySelectorAll(".quiz-option");
        currentButtons.forEach((button) => {
          button.classList.remove("quiz-option-selected");
          button.setAttribute("aria-pressed", "false");
        });
        optionButton.classList.add("quiz-option-selected");
        optionButton.setAttribute("aria-pressed", "true");
        quizSelectedAnswers[quizCurrentIndex] = optionIndex;
        quizAnswered = quizSelectedAnswers.filter((value) => value !== undefined).length > 0;
      });

      quizOptionsElement.appendChild(optionButton);
    });

    updateQuizProgress();
  }

  function showQuizResults() {
    const scoredResults = quizDeck.map((card, index) => {
      const selectedIndex = quizSelectedAnswers[index];
      const isCorrect = selectedIndex === card.correctIndex;
      return {
        question: card.question,
        selectedAnswer: selectedIndex === undefined ? "No answer selected" : card.options[selectedIndex],
        correctAnswer: card.options[card.correctIndex],
        isCorrect,
      };
    });

    const correctCount = scoredResults.filter((result) => result.isCorrect).length;
    const incorrectCount = scoredResults.length - correctCount;

    quizQuestionElement.textContent = "Quiz complete";
    quizTopicElement.textContent = "Results";
    quizOptionsElement.innerHTML = "";
    quizProgressCountElement.textContent = `${quizDeck.length} / ${quizDeck.length}`;

    const resultsMarkup = [
      `<p><strong>Score:</strong> ${correctCount}/${quizDeck.length} correct, ${incorrectCount} wrong.</p>`,
      ...scoredResults.map((result, index) => {
        const status = result.isCorrect ? "Correct" : "Wrong";
        return `<article class="quiz-result-item"><h3>Question ${index + 1}: ${status}</h3><p><strong>Question:</strong> ${result.question}</p><p><strong>Your answer:</strong> ${result.selectedAnswer}</p><p><strong>Correct answer:</strong> ${result.correctAnswer}</p></article>`;
      }),
    ].join("");

    quizProgressElement.innerHTML = resultsMarkup;
  }

  function startQuiz() {
    quizDeck = shuffleItems(quizCards);
    quizCurrentIndex = 0;
    quizSelectedAnswers = new Array(quizDeck.length);
    quizAnswered = false;
    renderQuizQuestion();
  }

  quizNextButton.addEventListener("click", () => {
    if (quizSelectedAnswers[quizCurrentIndex] === undefined) {
      quizProgressElement.textContent = "Select an answer before moving on.";
      return;
    }

    if (quizCurrentIndex < quizDeck.length - 1) {
      quizCurrentIndex += 1;
      renderQuizQuestion();
      return;
    }

    showQuizResults();
  });

  quizRestartButton.addEventListener("click", startQuiz);

  startQuiz();
}