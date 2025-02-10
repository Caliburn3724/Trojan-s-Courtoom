// Variables
const godApiKey = 'YOUR_API_KEY';  // Replace with your Mythology API key
const pixabayApiKey = 'YOUR_PIXABAY_API_KEY';  // Replace with your Pixabay API key
const randomUserApiUrl = 'https://randomuser.me/api/?results=3';  // For generating random witnesses

// Fetch a random Greek God for trial
async function getGodOnTrial() {
    let response = await fetch(`https://api.api-ninjas.com/v1/mythology?name=zeus`, {
        headers: { 'X-Api-Key': godApiKey }
    });
    let data = await response.json();
    const god = data[0];  // Assuming the API returns an array
    document.getElementById('godName').innerText = god.name;
    document.getElementById('godDescription').innerText = god.description;
}

// Random Court Case
const cases = [
    "Hades sues Orpheus for breaking a deal",
    "Athena sues Medusa for defamation",
    "Zeus is on trial for excessive lightning strikes"
];
document.getElementById("courtCase").innerText = cases[Math.floor(Math.random() * cases.length)];

// Fetch a random Courtroom Image
async function getCourtroomImage() {
    let response = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=courtroom&image_type=photo`);
    let data = await response.json();
    document.getElementById('courtroomImg').src = data.hits[0].webformatURL;
}

// Fetch random witnesses from Random User API
async function getWitnesses() {
    let response = await fetch(randomUserApiUrl);
    let data = await response.json();
    const witnessList = data.results;
    const witnessListElement = document.getElementById('witnessList');

    witnessList.forEach(witness => {
        const witnessElement = document.createElement('li');
        witnessElement.innerText = `${witness.name.first} ${witness.name.last}`;
        witnessListElement.appendChild(witnessElement);
    });
}

// Button Actions
document.getElementById('defendBtn').addEventListener('click', function() {
    document.getElementById('verdictText').innerText = "You defend the god successfully!";
});

document.getElementById('prosecuteBtn').addEventListener('click', function() {
    document.getElementById('verdictText').innerText = "The god is guilty!";
});

document.getElementById('bribeBtn').addEventListener('click', function() {
    document.getElementById('verdictText').innerText = "Zeus accepts your bribe, case dismissed!";
});

// Text-to-Speech for Verdict
document.getElementById('speakVerdictBtn').addEventListener('click', function() {
    let verdict = document.getElementById('verdictText').innerText;
    speakVerdict(verdict);
});

function speakVerdict(verdict) {
    let utterance = new SpeechSynthesisUtterance(verdict);
    speechSynthesis.speak(utterance);
}

// Initialize Game
getGodOnTrial();
getCourtroomImage();
getWitnesses();
