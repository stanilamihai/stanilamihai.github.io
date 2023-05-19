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

var scoreTraseuStiinte = 0;
var scoreTraseuArte = 0;
var scoreTraseuSport = 0;

// ============= General functions ================

var scoreToAdd = 1;
var clasa = "fara clasa";
var name = "";

function AddScoreStiinte(add)
{
	if (!CheckValid())
		return;

	scoreTraseuStiinte += +add;
	document.getElementById("proba-1").innerHTML = "Știință : " + scoreTraseuStiinte;
	WriteUserData();
}

function AddScoreArte(add)
{
	if (!CheckValid())
		return;

	scoreTraseuArte += +add;
	document.getElementById("proba-2").innerHTML = "Arte : " + scoreTraseuArte;
	WriteUserData();
}

function AddScoreSport(add)
{
	if (!CheckValid())
		return;

	scoreTraseuSport += +add;
	document.getElementById("proba-3").innerHTML = "Sport : " + scoreTraseuSport;
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
	onValue(ref(database, "/" + clasa + "/" + name + "/labirint/traseu 1/stiinta"), (snapshot) =>
	{
		scoreTraseuStiinte = snapshot.val();
		document.getElementById("proba-1").innerHTML = "Știință : " + ReplaceNull(scoreTraseuStiinte);
	});
	onValue(ref(database, "/" + clasa + "/" + name + "/labirint/traseu 1/arte"), (snapshot) =>
	{
		scoreTraseuArte = snapshot.val();
		document.getElementById("proba-2").innerHTML = "Arte : " + ReplaceNull(scoreTraseuArte);
	});
	onValue(ref(database, "/" + clasa + "/" + name + "/labirint/traseu 1/sport"), (snapshot) =>
	{
		scoreTraseuSport = snapshot.val();
		document.getElementById("proba-3").innerHTML = "Sport : " + ReplaceNull(scoreTraseuSport);
	});
}


function WriteUserData()
{
	set(ref(database, "/" + clasa + "/" + name + "/labirint/traseu 1"), {
		"stiinta": scoreTraseuStiinte,
		"arte": scoreTraseuArte,
		"sport": scoreTraseuSport
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

document.getElementById("button-proba1-add").addEventListener("click", () => { AddScoreStiinte(scoreToAdd) });
document.getElementById("button-proba1-subtract").addEventListener("click", () => { AddScoreStiinte(-scoreToAdd) });
document.getElementById("button-proba2-add").addEventListener("click", () => { AddScoreArte(scoreToAdd) });
document.getElementById("button-proba2-subtract").addEventListener("click", () => { AddScoreArte(-scoreToAdd) });
document.getElementById("button-proba3-add").addEventListener("click", () => { AddScoreSport(scoreToAdd) });
document.getElementById("button-proba3-subtract").addEventListener("click", () => { AddScoreSport(-scoreToAdd) });