const topicsData = [
    { 
        topic: "Math", color:"#4CAF50", lessons:[
            { level:"Grade 11", link:"https://www.scribd.com/document/527209710/Q1-General-Mathematics-11-Module-1",
              text:"General Mathematics introduces real-life math concepts such as functions, statistics, and probability." },
            { level:"Grade 12", link:"https://www.siyavula.com/read/za/mathematics/grade-12/sequences-and-series/01-sequences-and-series-01",
              text:"Arithmetic sequences help identify patterns that increase or decrease at a constant rate." }
        ]
    },
    { 
        topic: "Science", color:"#2196F3", lessons:[
            { level:"Grade 11", link:"https://www.siyavula.com/read/za/physical-sciences/grade-11/vectors-in-two-dimensions/01-vectors-in-two-dimensions-01",
              text:"Vectors describe quantities with both magnitude and direction." },
            { level:"Grade 12", link:"https://www.siyavula.com/read/za/physical-sciences/grade-12/skills-for-science/01-skills-for-science-01",
              text:"Scientific theories develop through observation, testing, and evidence." }
        ]
    },
    { 
        topic: "English", color:"#FF9800", lessons:[
            { level:"Grade 11", link:"https://www.scribd.com/document/481398598/READING-AND-WRITING-Q1-W1-Mod1",
              text:"Reading and Writing focus on understanding texts and expressing ideas clearly." },
            { level:"Grade 12", link:"https://www.scribd.com/document/526674122/1-EDITED-FINAL-Oral-Communication-Module-1-Nature-and-Process-of-Communication-Final-Copy",
              text:"Oral Communication develops speaking confidence and interaction skills." }
        ]
    }
];

let completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");

document.querySelectorAll("#topics .card").forEach(card => {
    card.addEventListener("click", () => {
        const topicName = card.dataset.topic;
        const topic = topicsData.find(t => t.topic.toLowerCase().includes(topicName));
        const container = document.getElementById("lessons-container");
        container.innerHTML = "";

        topic.lessons.forEach(l => {
            const lessonCard = document.createElement("div");
            lessonCard.className = "card";
            lessonCard.style.borderTop = `6px solid ${topic.color}`;

            const lessonKey = `${topic.topic}-${l.level}`;
            const finished = completedLessons.includes(lessonKey);

            lessonCard.style.opacity = finished ? 0.6 : 1;

            lessonCard.innerHTML = `
                <h3>${l.level}</h3>
                <p style="font-size:14px; color:#555;">${l.text}</p>
                <a class="lesson-link" href="${l.link}" target="_blank">Go to Lesson</a>
                <button class="btn-complete">${finished ? "Completed" : "Mark Completed"}</button>
            `;

            container.appendChild(lessonCard);

            lessonCard.querySelector(".btn-complete").addEventListener("click", () => {
                if (!completedLessons.includes(lessonKey)) {
                    completedLessons.push(lessonKey);
                    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
                    lessonCard.style.opacity = 0.6;
                    lessonCard.querySelector(".btn-complete").innerText = "Completed";
                    updateProgress();
                }
            });
        });

        updateProgress();
    });
});

function updateProgress() {
    const progressDiv = document.getElementById("progress-bars");
    progressDiv.innerHTML = "";

    topicsData.forEach(topic => {
        const total = topic.lessons.length;
        const completed = topic.lessons.filter(l =>
            completedLessons.includes(`${topic.topic}-${l.level}`)
        ).length;

        const percent = Math.round((completed / total) * 100);

        const bar = document.createElement("div");
        bar.className = "progress-bar";

        const fill = document.createElement("div");
        fill.className = "progress-bar-fill";
        fill.style.width = percent + "%";
        fill.innerText = `${topic.topic}: ${percent}%`;

        bar.appendChild(fill);
        progressDiv.appendChild(bar);
    });

    const totalLessons = topicsData.reduce((s, t) => s + t.lessons.length, 0);
    document.getElementById("total-completed").innerText =
        `Total lessons completed: ${completedLessons.length}/${totalLessons}`;
}

document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all progress?")) {
        completedLessons = [];
        localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
        updateProgress();
    }
});

updateProgress();

let comments = JSON.parse(localStorage.getItem("comments") || "[]");

const commentInput = document.getElementById("comment-input");
const postBtn = document.getElementById("post-comment");
const commentsList = document.getElementById("comments-list");

function displayComments() {
    commentsList.innerHTML = "";
    comments.forEach(comment => {
        const div = document.createElement("div");
        div.className = "comment";
        div.innerText = comment;
        commentsList.appendChild(div);
    });
}

postBtn.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (text !== "") {
        comments.push(text);
        localStorage.setItem("comments", JSON.stringify(comments));
        commentInput.value = "";
        displayComments();
    }
});

displayComments();

function generatePerformanceTestComments() {
    comments = [];

    const testComments = ["good", "okey", "better"];

    for (let i = 1; i <= 55; i++) {
        // Cycle through the test comments
        comments.push(testComments[(i - 1) % testComments.length]);
    }

    localStorage.setItem("comments", JSON.stringify(comments));
    displayComments();
}

generatePerformanceTestComments();
