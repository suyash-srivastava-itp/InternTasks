const questionArray = [
  {
    question: "What does CPU stand for?",
    options: [
      "a. Central Processing Unit",
      "b. Computer Personal Unit",
      "c. Central Performance Utility",
      "d. Control Processing User",
    ],
    correctOption: "a. Central Processing Unit",
  },
  {
    question: "Which language is primarily used for web page styling?",
    options: ["a. HTML", "b. JavaScript", "c. CSS", "d. Python"],
    correctOption: "c. CSS",
  },
  {
    question: "What does RAM stand for?",
    options: [
      "a. Read Access Memory",
      "b. Random Access Memory",
      "c. Rapid Action Module",
      "d. Run Access Machine",
    ],
    correctOption: "b. Random Access Memory",
  },
  {
    question: "Which company developed the Android operating system?",
    options: ["a. Apple", "b. Microsoft", "c. Google", "d. IBM"],
    correctOption: "c. Google",
  },
  {
    question: "What does HTTP stand for?",
    options: [
      "a. HyperText Transfer Protocol",
      "b. HighText Transmission Program",
      "c. Hyper Transfer Text Process",
      "d. Host Transfer Protocol",
    ],
    correctOption: "a. HyperText Transfer Protocol",
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: ["a. MySQL", "b. PostgreSQL", "c. MongoDB", "d. Oracle"],
    correctOption: "c. MongoDB",
  },
  {
    question: "What is the main purpose of an operating system?",
    options: [
      "a. Run antivirus",
      "b. Manage hardware and software resources",
      "c. Edit documents",
      "d. Browse the internet",
    ],
    correctOption: "b. Manage hardware and software resources",
  },
  {
    question:
      "Which programming language is known for its use in data science?",
    options: ["a. Python", "b. PHP", "c. C", "d. Assembly"],
    correctOption: "a. Python",
  },
  {
    question: "What does GPU stand for?",
    options: [
      "a. General Processing Unit",
      "b. Graphical Performance Utility",
      "c. Graphics Processing Unit",
      "d. Graphic Power Unit",
    ],
    correctOption: "c. Graphics Processing Unit",
  },
  {
    question: "Which protocol is used to send emails?",
    options: ["a. FTP", "b. SMTP", "c. HTTP", "d. SNMP"],
    correctOption: "b. SMTP",
  },
];

// console.log(questionArray);

// start

// init variables
const MAX_COUNT = 10;
let currentCount = 0;
let quizStarted = false;
let selectedOptionArray = [];

const question = document.querySelector("#question");
const answers = document.querySelector("#answers");

//quiz start button
let startButton = document.createElement("button");
startButton.innerText = "Start Quiz";
startButton.setAttribute("id", "start-button");
startButton.setAttribute(
  "class",
  "text-3xl text-white bg-red-500 font-bold font-mono border-b-4 border-r-2 border-red-700 py-2 px-4 rounded-lg hover:bg-red-400 cursor-pointer",
);
startButton.addEventListener("click", startQuizHandler)


//quiz submit button
let submitButton = document.createElement("button");
submitButton.innerText = "Submit Quiz";
submitButton.setAttribute("id", "submit-button");
submitButton.setAttribute(
  "class",
  "text-3xl text-white bg-red-500 font-bold font-mono border-b-4 border-r-2 border-red-700 mx-2 py-2 px-4 rounded-lg hover:bg-red-400 cursor-pointer",
);
submitButton.addEventListener("click", submitQuizHandler);

document.getElementById("btns").appendChild(submitButton);

// next button onclick event
document.getElementById("next-button").addEventListener("click", () => {
  if (currentCount < MAX_COUNT - 1) {
    currentCount++;
    displayQuestion();
  }
});

document.getElementById("prev-button").addEventListener("click", () => {
  if (currentCount > 0) {
    currentCount--;
    displayQuestion();
  }
});


// start button onclick handler
function startQuizHandler() {
  // console.log("quiz started");
  quizStarted = true;

  document.getElementById("question").classList.remove("hidden");
  document.getElementById("answers").classList.remove("hidden");

  if (currentCount === 0) {
    document.getElementById("prev-button").classList.add("hidden");
  }
  displayQuestion();
  document.getElementById("btns").classList.remove("hidden");
  document.getElementById("start-button").classList.add("hidden");
}

// submit button onclick handler
function submitQuizHandler() {
  console.log("submit");
}

function selectOptionHandler(id) {
  document.getElementById(id).classList.add("bg-yellow-700");
}

function optionSelectionStateSaver() {

}




// display each question
const displayQuestion = () => {
  answers.innerHTML = "";

  if (currentCount < MAX_COUNT) {
    question.innerText = `${questionArray[currentCount].question}`;
    let id = 0;
    questionArray[currentCount].options.forEach((element) => {
      // console.log(element);
      let option = document.createElement("div");
      option.setAttribute("id", `option-${id++}`)
      option.setAttribute(
        "class",
        `border-2 border-blue-500 rounded p-2 bg-yellow-100 hover:bg-yellow-200 font-mono cursor-pointer`,
      );
      option.innerText = element;
      option.addEventListener("click", () => selectOptionHandler(option.getAttribute("id")));
      answers.append(option);
    });
  }
  if (currentCount === 0) {
    document.getElementById("prev-button").classList.add("hidden");
  } else {
    document.getElementById("prev-button").classList.remove("hidden");
  }

  if(currentCount === MAX_COUNT -1) {
    document.getElementById("submit-button").classList.remove("hidden");
    document.getElementById("next-button").classList.add("hidden");
  } else {
    document.getElementById("submit-button").classList.add("hidden");
    document.getElementById("next-button").classList.remove("hidden");
  }
};


//render the start button only
(() => {
  document.getElementById("question").classList.add("hidden");
  document.getElementById("answers").classList.add("hidden");
  document.getElementById("btns").classList.add("hidden");

  document.getElementById("question-box").appendChild(startButton);
})();