//global variables
var notes = JSON.parse(localStorage.getItem("notes") || "[]");
var previousSelector = 'pinkSelector';
var selectedNote;
var color;

//onload function
$(function() {


    for (i of notes) {
        var selectedNoteId = localStorage.getItem("noteId");
        if (i.noteId == selectedNoteId) {
            localStorage.setItem("selectedNote", JSON.stringify(i));
            localStorage.setItem("selectedNoteIndex", notes.indexOf(i));
            var $card = $('<div>', {
                class: "note-wrapper"
            });
            var $noteHeading = $('<div>', {
                class: "note-heading"
            });
            var $noteColor = $('<div>', {
                class: "color",
            }).appendTo($noteHeading);
            $noteColor.css("background-color", i.color);
            var $noteHeadingSection = $('<section>', {
                class: "note-heading-section"
            });
            var $noteTitle = $('<h3>', {
                class: "note-title"
            }).text(i.title).appendTo($noteHeadingSection);
            var $date = $('<p>', {
                class: "note-date"
            }).text(i.modifiedOn).appendTo($noteHeadingSection);
            $noteHeadingSection.appendTo($noteHeading)
            $noteHeading.appendTo($card);
            var $imageWrapper = $("<div>", {
                class: "image-wrapper"
            }).appendTo($card);
            var $noteImage = $('<img>', {
                class: "note-image",
                src: i.image
            }).appendTo($imageWrapper);
            var $noteContent = $('<pre>', {
                class: "note-content"
            }).text(i.content).appendTo($card);
            $("main").prepend($card);
        }

    }
});

//to navigate to homePage 
function navigateBack() {
    localStorage.setItem("displayNotes", []);
    localStorage.setItem("currentPage", 1);
    location.replace("./home.html");
}
//to confirm deleteNote
function confirmDeleteNote() {
    if ($("#overlayDeleteNote").css("display") == "block") {
        $("#overlayDeleteNote").css("display", "none");
    } else {
        $("#overlayDeleteNote").css("display", "block");
    }
}

//to confirm delete 
function confirmDelete() {
    for (i of this.notes) {
        console.log(i.noteId + "*****" + localStorage.getItem("noteId"));
        if (i.noteId == Number(localStorage.getItem("noteId"))) {
            var filteredNotes = this.notes.filter(data => data.noteId != Number(localStorage.getItem("noteId")));
            localStorage.setItem("notes", JSON.stringify(filteredNotes));
            navigateBack();
        }
    }
    return;
}

//to open edit note container
function editNote() {
    if ($("#overlayEditNote").css("display") == "block") {
        hideContainer("overlayEditNote");
    } else {
        $("#overlayEditNote").css("display", "block");
    }
    updateEditNote();
}



//hide the container
function hideContainer(id) {
    $("#" + id).css("display", "none");
    location.reload();
}

//to select the color
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

//update the edit note with values
function updateEditNote() {
    for (i of notes) {
        if (i.noteId == localStorage.noteId) {
            $("#editTitle").val(i.title);
            if (i.image.length != 0) {
                $("#editImage").val(i.image);
            }
            $("#editContent").val(i.content);
            switch (i.color) {
                case "#ebcced":
                    selectedColor("pinkSelector");
                    break;
                case "#fcfcfc":
                    selectedColor("whiteSelector");
                    break;
                case "#ffca72":
                    selectedColor("yellowSelector");
                    break;
                case "#e5ee90":
                    selectedColor("greenSelector");
                    break;
                case "#ffa78b":
                    selectedColor("peachSelector");
                    break;
                default:
                    break;
            }
        }
    }
}

//to save the changes in the note
function saveNote() {
    var date = assignDate();
    var noteId = Number(localStorage.noteId);
    var title = $("#editTitle").val();
    var image = $("#editImage").val();
    var content = $("#editContent").val();
    console.log(this.color);
    var color = this.color;
    var createdOn = (JSON.parse(localStorage.getItem("selectedNote"))).createdOn;

    var editedNote = new Note(noteId, title, createdOn, date, image, content, color);
    var selectedNoteIndex = Number(localStorage.getItem("selectedNoteIndex"));
    for (i in notes) {
        if (i == selectedNoteIndex) {
            notes.splice(i, 1);
            console.log(`${notes}\n*****************************************************************************`);
            notes.push(editedNote);
            console.log(notes);
        }
    }
    updateLocalStorage();
    navigateBack();
}


function updateLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
    return;

}


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