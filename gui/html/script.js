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

const timeThemeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
timeThemeToggle.checked = false

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    timeThemeToggle.checked = true
}

function changeTheme(data) {
    if(data["darkMode"] == "True"){
        document.documentElement.setAttribute('data-theme', 'dark');
        timeThemeToggle.checked = true
    }
    else if(data["darkMode"] == "False") {
        document.documentElement.setAttribute('data-theme', 'light');
        timeThemeToggle.checked = false
    }
}

function switchTheme(input) {
    if (input.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        putOptions({"darkMode": "True"})
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        putOptions({"darkMode": "False"})
    }    
}

timeThemeToggle.addEventListener('change', switchTheme, false);


function searchFunction() {
    var input, filter, cardHolder, card
    input = document.getElementById('folder-search');
    filter = input.value.toUpperCase();
    cardHolder = document.getElementsByClassName("folder cards")[0];
    card = cardHolder.getElementsByTagName('div');
    
    for (i = 0; i < card.length; i++) {
        texts = card[i].getElementsByTagName("h3");
        dir1 = texts[0].textContent || texts[0].innerText;
        dir2 = texts[1].textContent || texts[1].innerText;
        if (dir1.toUpperCase().indexOf(filter) > -1 || dir2.toUpperCase().indexOf(filter) > -1) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
}

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}