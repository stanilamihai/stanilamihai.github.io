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

var scoreRebus = 0;
var scoreTimeRebus = 0;

// ============= General functions ================

var scoreToAdd = 1;
var clasa = "fara clasa";
var name = "";

function AddScoreRebus(add)
{
	if (!CheckValid())
		return;

	scoreRebus += +add;
	document.getElementById("proba-1").innerHTML = "Punctaj : " + scoreRebus;
	WriteUserData();
}

function AddTimeRebus(add)
{
	if (!CheckValid())
		return;

	scoreTimeRebus += +add;
	document.getElementById("proba-2").innerHTML = "Ora : " + scoreTimeRebus;
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
	onValue(ref(database, "/" + clasa + "/" + name + "/rebus/punctaj"), (snapshot) =>
	{
		scoreRebus = snapshot.val();
		document.getElementById("proba-1").innerHTML = "Punctaj : " + ReplaceNull(scoreRebus);
	});

	onValue(ref(database, "/" + clasa + "/" + name + "/rebus/ora"), (snapshot) =>
	{
		scoreTimeRebus = snapshot.val();
		document.getElementById("proba-2").innerHTML = "Ora : " + ReplaceNull(scoreTimeRebus);
	});
}


function WriteUserData()
{
	set(ref(database, "/" + clasa + "/" + name + "/rebus"), {
		"punctaj": scoreRebus,
		"ora": scoreTimeRebus
	});
}



function ReplaceNull(val)
{
	return val == null ? 0 : val;
}

function CheckValid()
{
	return !(name == "" || clasa == "fara clasa");
}






// ======================================== INITIALIZATION ============================================

ChangeAddScore();


// ========== Setup events =================
document.getElementById("clasa-8").addEventListener("click", GetClasa);
document.getElementById("clasa-9").addEventListener("click", GetClasa);

document.getElementById("nume-elev").addEventListener("change", GetName);

document.getElementById("validate-button").addEventListener("click", UpdateScore);

document.getElementById("score-add").addEventListener("change", ChangeAddScore);

document.getElementById("button-proba1-add").addEventListener("click", () => { AddScoreRebus(scoreToAdd) });
document.getElementById("button-proba1-subtract").addEventListener("click", () => { AddScoreRebus(-scoreToAdd) });
document.getElementById("button-proba2-add").addEventListener("click", () => { AddTimeRebus(scoreToAdd) });
document.getElementById("button-proba2-subtract").addEventListener("click", () => { AddTimeRebus(-scoreToAdd) });