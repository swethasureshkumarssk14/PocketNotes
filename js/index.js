var notes = JSON.parse(localStorage.getItem("notes") || "[]");
var displayNotes;
var note = {};
var selectedNote;
var $cardWrapper = $(".card-wrapper");
var previousSelector = 'pinkSelector';
var color;
var currentPage = 1;

$(function() {
    //the notes for display will be emptied on closing the browser
    var session = sessionStorage.getItem("session");
    if (session == null) {
        localStorage.setItem("displayNotes", "[]");
        localStorage.setItem("currentPage", "1");
        sessionStorage.setItem("session", "1");
    }
    // checks for the display of the notes
    displayNotes = JSON.parse(localStorage.getItem("displayNotes") || "[]");
    if (displayNotes == undefined || displayNotes.length == 0 || notes.length == 0) {
        displayNotes = [];
        pagination(1);
    }
    if (displayNotes.length == notes.length) {
        console.log(displayNotes.length + ":displayNote" + notes.length);
        $("button.load-more").css("display", "none");
    }
    // updating the display of notes to the localStorage
    updateLocalStorage("displayNotes", displayNotes);
    console.log(currentPage);
    verifyDisplay();

});

//displays the image of a cube id the display is empty 
function verifyDisplay() {

    if ($("#previousSelector") != 'undefined' && $("#previousSelector") != null) {
        $("#previousSelector").css("display", "block");
    }
    if (displayNotes == undefined || displayNotes.length == 0) {
        $(".card-wrapper-empty").css("display", "flex");
        $(".card-wrapper").css("display", "none");
        $("#deleteAll").css("display", "none");
    } else {


        $(".card-wrapper").css("display", "flex");
        $(".card-wrapper-empty").css("display", "none");
        displayAllNotes();
    }
}
//selecting a color 
function selectedColor(color) {
    console.log(color);
    $("#" + color).css("display", "block");
    $("#" + previousSelector).css("display", "none");
    this.previousSelector = color;
    switch (color) {
        case "pinkSelector":
            this.color = "#ebcced";
            break;
        case "whiteSelector":
            this.color = "#fcfcfc";
            break;
        case "yellowSelector":
            this.color = "#ffca72";
            break;
        case "greenSelector":
            this.color = "#e5ee90";
            break;
        case "peachSelector":
            this.color = "#ffa78b";
            break;
        default:
            break;
    }
}

//displaying the notes in the home page
function displayAllNotes() {
    for (i of this.displayNotes) {
        console.log(i.noteId);
        var $card = $('<div>', {
            class: "card",
            id: i.noteId,
            value: i.noteId,
            onclick: `{
                localStorage.setItem("noteId", $(this).attr("id"));
                viewNotes();}`
        });
        $card.css("background-color", i.color);
        if (i.title.length > 30) {
            var $noteTitle = $('<h3>', {
                class: "card-note-title"
            }).text(i.title.substring(0, 30) + " . . .").appendTo($card);
        } else {
            var $noteTitle = $('<h3>', {
                class: "card-note-title"
            }).text(i.title).appendTo($card);
        }
        var $date = $('<p>', {
            class: "card-note-date"
        }).text(i.modifiedOn).appendTo($card);
        if (i.image.length != 0) {
            var $noteImage = $('<img>', {
                class: "card-note-image",
                src: i.image
            }).appendTo($card);
        }

        if (i.content.length > 100 && i.image.length != 0) {
            var $noteContent = $('<p>', {
                class: "card-note-content"
            }).text(i.content.substring(0, 150) + ". . .").appendTo($card);
        } else if (i.content.length > 100) {
            var $noteContent = $('<p>', {
                class: "card-note-content"
            }).text(i.content.substring(0, 350) + ". . .").appendTo($card);
        } else {
            var $noteContent = $('<p>', {
                class: "card-note-content"
            }).text(i.content).appendTo($card);
        }
        $(".card-container").append($card);
    }



}
// creating a new Note
function createNewNote() {
    if ($("#overlayNewNote").css("display") == "block") {
        hideContainer("overlayNewNote");
    } else {
        $("#overlayNewNote").css("display", "block");
    }
}
//deleting a new Note
function DeleteAllNotes() {
    if ($("#overlayDeleteAllNote").css("display") == "block") {
        hideContainer("overlayDeleteAllNote");
    } else {
        $("#overlayDeleteAllNote").css("display", "block");
    }
}
//confim the delete
function confirmDeleteAll() {
    localStorage.setItem("notes", JSON.stringify([]));
    hideContainer("overlayDeleteAllNote");
}
//hide the container
function hideContainer(id) {
    $("#" + id).css("display", "none");
    location.reload();
}
//add the new note to the notes array
function addNewNote() {
    var date = assignDate();
    var noteId = notes.length + 1;
    var title = $("#notesTitle").val();
    var image = $("#notesImage").val();
    var content = $("#notesContent").val();
    var color = this.color;
    this.note = new Note(noteId, title, date, date, image, content, color);
    this.notes.push(this.note);
    updateLocalStorage("notes", this.notes);
    updateLocalStorage("displayNotes", []);
}
//upadate the value in local storage
function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
//to navigate to a new note
function viewNotes() {
    location.replace("./note.html");
}
//date format
function assignDate() {
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    switch (month) {
        case 1:
            var month = "Jan";
            break;
        case 2:
            var month = "Feb";
            break;
        case 3:
            var month = "Mar";
            break;
        case 4:
            var month = "Apr";
            break;
        case 5:
            var month = "May";
            break;
        case 6:
            var month = "Jun";
            break;
        case 7:
            var month = "Jul";
            break;
        case 8:
            var month = "Aug";
            break;
        case 9:
            var month = "Sep";
            break;
        case 10:
            var month = "Oct";
            break;
        case 11:
            var month = "Nov";
            break;
        case 12:
            var month = "Dec";
            break;
        default:
            var month = "Month error";
            break;
    }

    var date = currentDate.getDate();
    var year = currentDate.getFullYear();
    return (month + " " + date + ", " + year);
}

//Pagination
var pageLength = 10;

var pagination = (function(pageNo) {
    var startIndex = (this.notes.length) - ((pageNo - 1) * pageLength);

    if ((this.notes.length - startIndex) < pageLength && this.notes.length > 10) {

        endIndex = (startIndex - pageLength);
    } else if (startIndex < 10) {
        endIndex = 0;
    } else {
        var endIndex = startIndex - pageLength;
    }
    for (let i = startIndex - 1; i >= endIndex; i--) {
        this.displayNotes = JSON.parse(localStorage.getItem("displayNotes") || "[]");
        this.displayNotes.push(this.notes[i]);
        console.log("inside:" + this.displayNotes.length);
        console.log(i);
        updateLocalStorage("displayNotes", this.displayNotes);
    }


    return;

});
//to load more of cards in the application
function loadMore() {
    currentPage = (Number(localStorage.getItem("currentPage"))) + 1;
    console.log(currentPage);
    pagination(currentPage);
    updateLocalStorage("currentPage", currentPage);
    location.reload();
    return;
}