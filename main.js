var trainingDropdownOpen = false;

var activeMetaPrograms = "all";

var mcd;
var dropdown;
var question;


function answerChosen(answer) {
    if (!question.checkAnswer(answer)) {
        switch (question.wrong) {
            case 0: alert("Are you sure??");
                question.wrong += 1;
                break;
            default: alert("Your answer: " + answer + "\nCorrect answer: " + question.answer);
                question.wrong = 0;
                chooseSentence();
                break;
        }
    } else {
        question.wrong = 0;
        chooseSentence();
    };
};

function chooseSentence() {
    let sentence = mcd.randExample();
    question.setSentence(sentence.example);
    question.setAnswer(sentence.subCategory);
};

function selectMappings(choice) {
    mcd.chosenCategory = choice;

    if (dropdown.isOpen) {
        chooseSentence();
    } else {
        question.clear();
    }
    dropdown.toggleOpen();

    // make buttons selected or unselected
    let allDropdownButtons = document.getElementsByClassName("dropdownButton");
    let selectedDropdownButtons = document.getElementsByClassName("dropdown:" + mcd.chosenCategory);
    let allAnswerButtons = document.getElementsByClassName("answerButton");
    let selectedAnswerButtons = document.getElementsByClassName("answer:" + mcd.chosenCategory);

    //make all answer- and dropdown buttons invisible
    for (let i = 0; i < allAnswerButtons.length; i++) {
        allAnswerButtons[i].style.display = "none";
        if (i < allDropdownButtons.length) {
            allDropdownButtons[i].style.color = "#1a1a1a";
            allDropdownButtons[i].style.fontWeight = "normal";
        }
    }
    //make the selected answer- and dropdown buttons visible again
    for (let i = 0; i < selectedAnswerButtons.length; i++) {
        selectedAnswerButtons[i].style.display = "block";
        if (i < selectedDropdownButtons.length) {
            selectedDropdownButtons[i].style.color = "lightgoldenrodyellow";
            selectedDropdownButtons[i].style.fontWeight = "bold";
        }
    }

    // if "all" selected, show all answerButtons.
    if (mcd.chosenCategory === "all") {
        //make all answer- and dropdown buttons visible
        for (let i = 0; i < allAnswerButtons.length; i++) {
            allAnswerButtons[i].style.display = "block";
        }
        document.getElementById("dropdown:all").style.color = "lightgoldenrodyellow";
        document.getElementById("dropdown:all").style.fontWeight = "bold";
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function randFromList(listFrom, amount) {
    const shuffled = shuffle(listFrom);

    while (shuffled.length < amount) {
        shuffled.push("");
    }

    return shuffled.slice(0, amount);
};



// starts Meta Model Trainer 1
function startMultipleChoiceTrainer(dict, title, buttons = true) {
    clearIndex();
    document.getElementById("title").innerHTML = title;
    question = new Question();
    question.clear();


    mcd = new MultipleChoiceDict(dict);

    // Make Answer Buttons
    for (let i = 0; i < mcd.getCategoryKeys().length; i++) {
        let category = mcd.getCategoryKeys()[i];
        makeDiv(category + "Buttons", "bottomDiv", category);

        // generate answer buttons
        for (let j = 0; j < mcd.getSubCategoryKeys(category).length; j++) {
            let subCategory = mcd.getSubCategoryKeys(category)[j];
            makeAnswerButton(subCategory, category, category + "Buttons", function () {
                answerChosen(subCategory);
            });
        }
    }

    selectMappings(mcd.chosenCategory);
    dropdown.toggleOpen();

    chooseSentence();

    // make dropdown
    dropdown.clearContent();
    dropdown.toggleVisibility(true);

    for (let i = 0; i < mcd.getCategoryKeys().length; i++) {
        let category = mcd.getCategoryKeys()[i];
        makeDropdownButton(category, function () { selectMappings(category); });
    }
    // makeDropdownButton("All", function () { selectMappings("all"); });
};

// Clears index.html so another Trainer can be started.
function clearIndex() {
    document.getElementById("topDiv").innerHTML = "";
    document.getElementById("bottomDiv").innerHTML = "";
    document.getElementById("bottomDiv").style.display = "block";
    document.getElementById("bottomDiv").style.margin = "0px";
    document.getElementById("title").innerHTML = "";
    if (dropdown != null) {
        dropdown.toggleVisibility(false);
    }
    if (mcd != null) {
        mcd.chosenCategory = "all";
    }
};

function showTrainings() {
    if (trainingDropdownOpen) {
        document.getElementById("trainingDropdown").style.display = "none";
    } else {
        document.getElementById("trainingDropdown").style.display = "grid";
    }
    trainingDropdownOpen = !trainingDropdownOpen;
};


// start everything up
window.addEventListener("load", function () {

    MultipleChoiceDict.formatDict(metaModelSentences);

    clearIndex();
    dropdown = new Dropdown("dropdown", "selectionDropdown");
    question = new Question()

    startMultipleChoiceTrainer(metaModelSentences, "Meta Model Trainer");
});

