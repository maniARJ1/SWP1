"use strict";

const ul = document.getElementById("meineUL");

function addElement() {
    const li = document.createElement("li");
    li.innerHTML = "Neues Element";
    ul.appendChild(li);
}


function ausgabe() {
        
    var eingabeWert = document.getElementById("textfeld").value;
    var liste = document.getElementById("meineUL");
            var listItem = document.createElement("li");
            listItem.textContent = eingabeWert;
            liste.appendChild(listItem);

        textfeld.value = "";
    
    }
