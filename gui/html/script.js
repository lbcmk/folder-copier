abovepx = true
inputtext = ""

if (window.matchMedia("(min-width: 600px)").matches) {
    abovepx = true
    document.querySelector("input#folder-search").style.display = ""
    document.querySelector("button#search-button").style.display = "none"
} else {
    abovepx = false
    document.querySelector("input#folder-search").style.display = "none"
    document.querySelector("button#search-button").style.display = ""
}

window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 600px)").matches) {
        if(abovepx == false) {
            abovepx = true
            searchDiv = this.document.querySelector("div#folder-search-div")

            document.querySelector("input#folder-search").style.display = ""
            document.querySelector("button#search-button").style.display = "none"
            
            inputtext = document.querySelector("input#small-folder-search").value
            document.querySelector("input#folder-search").value = inputtext
        }
    } else {
        if(abovepx == true) {
            abovepx = false
            searchDiv = this.document.querySelector("div#folder-search-div")
            
            document.querySelector("input#folder-search").style.display = "none"
            document.querySelector("button#search-button").style.display = ""
            
            inputtext = document.querySelector("input#folder-search").value
            document.querySelector("input#small-folder-search").value = inputtext
        }
    }
})

function searchButtonFunction() {
    displayTextInputDiv = document.querySelector("div#smallsearchbox").style.display
    displayTextInput = document.querySelector("input#small-folder-search").style.display

    if(displayTextInputDiv == "") {
        document.querySelector("div#smallsearchbox").style.display = "none"
    } else if (displayTextInputDiv == "none") {
        document.querySelector("div#smallsearchbox").style.display = ""
    }

    if(displayTextInput == "") {
        document.querySelector("input#small-folder-search").style.display = "none"
        inputtext = document.querySelector("input#small-folder-search").value
    } else if (displayTextInput == "none") {
        document.querySelector("input#small-folder-search").style.display = ""
        document.querySelector("input#small-folder-search").value = inputtext
    }
}

function settingsButtonFunction() {
    console.log("add")
}