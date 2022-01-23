
var activeMetaPrograms = "all";

var mcd;
var question;
var ie;


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

function selectMappings(choice, explanation = false) {
    if (explanation) {
        let allAnswerButtons = document.getElementsByClassName("answerButton");

        //make all answer buttons invisible
        for (let i = 0; i < allAnswerButtons.length; i++) {
            allAnswerButtons[i].style.display = "none";
        }
        document.getElementById("answer:Continue").style.display = "block";
        return;
    }
    mcd.chosenCategory = choice;

    // make buttons selected or unselected
    let allAnswerButtons = document.getElementsByClassName("answerButton");
    let selectedAnswerButtons = document.getElementsByClassName("answer:" + mcd.chosenCategory);

    //make all answer buttons invisible
    for (let i = 0; i < allAnswerButtons.length; i++) {
        allAnswerButtons[i].style.display = "none";
    }
    //make the selected answer buttons visible again
    for (let i = 0; i < selectedAnswerButtons.length; i++) {
        selectedAnswerButtons[i].style.display = "block";
    }

    chooseSentence();
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

function nextExplanationSentence(ieg) {
    ie = ieg.getNext();

    if (ie === null || ie.isFinished) {
        startMultipleChoiceTrainer(ieg.level);
    } else {
        question.setSentence(ie.yes);
    }

    if (document.getElementById("revealedAnswer") !== null) {
        document.getElementById("revealedAnswer").remove();
        toggleVisibility("answer:Reveal", 1);
    }
    if (document.getElementById("answer:Continue") !== null) {
        toggleVisibility("answer:Continue", 0);
    }
}

function revealAnswer() {
    makeH3(ie.q, "topDiv", "revealedAnswer");
    toggleVisibility("answer:Reveal", 0);
    toggleVisibility("answer:Continue", 1);
}

// starts Introduction
function startIntroduction(level = "Level 1") {
    clearIndex();

    toggleVisibility("levels", 1);
    toggleVisibility("homepage", 0);

    clearIndex();
    document.getElementById("title").innerHTML = "Tell Me More: Introduction";
    question = new Question();
    question.clear();

    mcd = new MultipleChoiceDict(metaModelSentences);
    mcd.chosenCategory = level;

    let ieg = new IntroductionExampleGiver(mcd, level);

    nextExplanationSentence(ieg);

    makeNextButton(function () { nextExplanationSentence(ieg) });
    makeRevealAnswerButton(function () { revealAnswer() });
    toggleVisibility("answer:Continue", 0);
    toggleVisibility("answer:Reveal", 1);


};



// starts Meta Model Trainer 1
function startMultipleChoiceTrainer(level = "Level 1") {

    toggleVisibility("levels", 1);
    toggleVisibility("homepage", 0);

    clearIndex();
    document.getElementById("title").innerHTML = "Tell Me More! v9.3";
    question = new Question();
    question.clear();


    mcd = new MultipleChoiceDict(metaModelSentences);
    mcd.chosenCategory = level;

    // // Make Answer Buttons
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

    // let y = 0;
    // makeAnswerButton("Continue", "next", "topDiv", function () { chooseSentence(y); y+=1; })
    selectMappings(mcd.chosenCategory);


};

// Clears index.html so another Trainer can be started.
function clearIndex() {
    document.getElementById("topDiv").innerHTML = "";
    document.getElementById("bottomDiv").innerHTML = "";
    document.getElementById("bottomDiv").style.display = "block";
    document.getElementById("bottomDiv").style.margin = "0px";
    document.getElementById("title").innerHTML = "";
    if (mcd != null) {
        mcd.chosenCategory = "Level 1";
    }
};


function toggleVisibility(id, value = -1) {
    var x = document.getElementById(id);
    console.log(id);

    if (value === 0) {
        x.style.display = "none";
        console.log(0);
    } else if (value === 1) {
        x.style.display = "block";
        console.log(1);
    } else {
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        console.log(-1);   
    }
}



function goToHomepage() {

    toggleVisibility("levels", 0);
    toggleVisibility("homepage", 1);

}


// start everything up
window.addEventListener("load", function () {
    // document.getElementById("homepage").toggleVisibility;

    toggleVisibility("homepage", 1);
    toggleVisibility("levels", 0);


    MultipleChoiceDict.formatDict(metaModelSentences);

    // clearIndex();
    question = new Question()

});

