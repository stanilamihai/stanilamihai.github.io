// ========= Firebase stuff ===========
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyD89nbMLdzYcey1CwOy3SJYFTSPeI8_xmc",
	authDomain: "carnaval-de-vara-csng.firebaseapp.com",
	databaseURL: "https://carnaval-de-vara-csng-default-rtdb.europe-west1.firebasedatabase.app/",
	projectId: "carnaval-de-vara-csng",
	storageBucket: "carnaval-de-vara-csng.appspot.com",
	messagingSenderId: "1028322686186",
	appId: "1:1028322686186:web:19387cf3419ac69cd3d393",
	measurementId: "G-RNV1EF5QCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase();





// ============ Score variables ==============

var score = [0, 0, 0, 0];

// ============= General functions ================

var scoreToAdd = 1;
var clasa = "fara clasa";
var name = "";

function AddScore(proba, add)
{
	score[proba - 1] += +add;
	document.getElementById("proba-" + proba).innerHTML = "Proba " + proba + " : " + score[proba - 1];
	WriteUserData();
}

function ChangeAddScore()
{
	scoreToAdd = document.getElementById("score-add").value;
}


function GetClasa()
{
	var radio = document.getElementsByName('clasa');

	for (var i = 0, length = radio.length; i < length; i++)
	{
		if (radio[i].checked)
		{
			clasa = radio[i].value;
			break;
		}
	}
}

function GetName()
{
	name = document.getElementById("nume-elev").value;
}

function UpdateScore()
{
	for (let i = 0; i < score.length; i++)
	{
		onValue(ref(database, "/" + clasa + "/" + name + "/score/" + i), (snapshot) =>
		{
			score[i] = snapshot.val();
			document.getElementById("proba-" + (i + 1)).innerHTML = "Proba " + (i + 1) + " : " + (score[i] == null ? 0 : score[i]);
		});
	}
}


function WriteUserData()
{
	set(ref(database, "/" + clasa + "/" + name), {
		"score": score
	});
}






// ======================================== INITIALIZATION ============================================

ChangeAddScore();


// ========== Setup events =================
document.getElementById("clasa-8").addEventListener("click", GetClasa);
document.getElementById("clasa-9").addEventListener("click", GetClasa);

document.getElementById("nume-elev").addEventListener("change", GetName);

document.getElementById("validate-button").addEventListener("click", UpdateScore);

document.getElementById("score-add").addEventListener("change", ChangeAddScore);

document.getElementById("button-proba1-add").addEventListener("click", () => { AddScore(1, scoreToAdd) });
document.getElementById("button-proba2-add").addEventListener("click", () => { AddScore(2, scoreToAdd) });
document.getElementById("button-proba3-add").addEventListener("click", () => { AddScore(3, scoreToAdd) });
document.getElementById("button-proba4-add").addEventListener("click", () => { AddScore(4, scoreToAdd) });
document.getElementById("button-proba1-subtract").addEventListener("click", () => { AddScore(1, -scoreToAdd) });
document.getElementById("button-proba2-subtract").addEventListener("click", () => { AddScore(2, -scoreToAdd) });
document.getElementById("button-proba3-subtract").addEventListener("click", () => { AddScore(3, -scoreToAdd) });
document.getElementById("button-proba4-subtract").addEventListener("click", () => { AddScore(4, -scoreToAdd) });