var trainingDropdownOpen = false;

var activeMetaPrograms = "all";

var mcd;
var dropdown;
var question;


function answerChosen(answer) {
    if (!question.checkAnswer(answer)) {
        console.log(question.wrong);
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

function makeDiv(divName, appendTo) {
    let div = document.createElement("div");
    div.id = divName;
    document.getElementById(appendTo).appendChild(div);
}

function makeH2(innerHTML, appendTo, id = "") {
    let h2 = document.createElement("h2");
    h2.innerHTML = innerHTML;
    h2.id = id;
    document.getElementById(appendTo).appendChild(h2);
}

function makeH3(innerHTML, appendTo, id = "") {
    let h3 = document.createElement("h3");
    h3.innerHTML = innerHTML;
    h3.id = id;
    document.getElementById(appendTo).appendChild(h3);
}

function makeAnswerButton(name, className, appendTo, func) {
    let btn = document.createElement("button");
    btn.id = "answer:" + name;
    btn.innerHTML = name;
    btn.className = "answerButton answer:" + className;
    btn.onclick = func;
    document.getElementById(appendTo).appendChild(btn);
}

function makeDropdownButton(name, func) {
    let btn = document.createElement("button");
    btn.id = "dropdown:" + name.toLowerCase();
    btn.className = "dropdownButton dropdown:" + name.toLowerCase();
    btn.innerHTML = name;
    btn.onclick = func;
    document.getElementById(dropdown.contentId).appendChild(btn);
}

function makeTextArea(id, appendTo, placeholder = "", small = false) {
    let ta = document.createElement("textarea");
    ta.id = id;
    ta.style.margin = "5px";
    ta.placeholder = placeholder;
    if (small) {
        ta.style.minHeight = "0px";
    }
    document.getElementById(appendTo).appendChild(ta);

};

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

function getRandSubmodalities(amount) {
    let randMod = randFromList(Object.keys(modalities1), 1)[0];
    let randSubmod = randFromList(modalities1[randMod], amount);

    document.getElementById("submods").innerHTML = randMod + ":";

    for (let i = 0; i < randSubmod.length; i++) {
        let p = document.createElement("p");
        p.innerHTML = randSubmod[i];
        document.getElementById("submods").appendChild(p);
    }
};

function getRandSentence(listFrom) {
    question.setSentence(listFrom[Math.floor(Math.random() * listFrom.length)]);
}

function getRandFromList(listFrom) {
    return listFrom[Math.floor(Math.random() * listFrom.length)];
}

// chooses a random enriched sentence, and sets question to it
function chooseRandEnrichedSentence() {
    let randMod = randFromList(Object.keys(enrichedLanguageSentences), 1)[0];
    let randES = randFromList(enrichedLanguageSentences[randMod], 1)[0];

    question.setAnswer(randMod);
    question.setSentence(randES);
};

// this function chooses n random metaprograms, and puts them in the right h3
function chooseNextMetaPrograms(amountOfMetaPrograms) {
    let chosenKey;
    if (activeMetaPrograms === "all") {
        chosenKey = randFromList(Object.keys(metaPrograms), 1)[0];
    }
    else {
        chosenKey = activeMetaPrograms;
    }
    let chosenPrograms = randFromList(Object.keys(metaPrograms[chosenKey]), amountOfMetaPrograms);

    for (let i = 0; i < amountOfMetaPrograms; i++) {
        document.getElementById("mp:" + (i + 1)).innerHTML =
            chosenPrograms[i] + ": " + randFromList(metaPrograms[chosenKey][chosenPrograms[i]], 1)[0];
    }
}

class Question {
    constructor() {
        this.id = "sentence";
        this.wrong = 0;
        makeH2("", "topDiv", this.id);
    }

    checkAnswer(answer) {
        return answer === this.answer;
    }

    setAnswer(answer) {
        this.answer = answer;
    }

    setSentence(sentence) {
        this.sentence = sentence;
        document.getElementById(this.id).innerHTML = this.sentence;
    }

    clear() {
        this.setAnswer("");
        this.setSentence("");
    }

    chooseNextQuestion() {
        let example = mcd.randExample();
        this.setSentence(example.example);
        this.setAnswer(example.subCategory);
    }
}

class Dropdown {
    constructor(id, contentId) {
        this.id = id;
        this.contentId = contentId;
        this.isVisible = true;
        this.isOpen = false;
    }

    toggleVisibility(open = null) {
        if (open == true || (open === null && !this.isVisible)) {
            document.getElementById(this.id).style.display = "block";
            this.isVisible = true;
        } else {
            document.getElementById(this.id).style.display = "none";
            this.isVisible = false;
        }
    }

    toggleOpen() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            document.getElementById(this.contentId).style.display = "block";
        } else {
            document.getElementById(this.contentId).style.display = "none";
        }
    }

    clearContent() {
        document.getElementById(this.contentId).innerHTML = "";
    }

}

class Sentence {
    constructor(category, subCategory, example) {
        this.category = category;
        this.subCategory = subCategory;
        this.example = example;
    }
}

class MultipleChoiceDict {
    constructor(dict) {
        this.dict = dict;                       // the dictionary
        this.chosenCategory = this.getCategoryKeys()[0];
    }

    getCategoryKeys() {
        return Object.keys(this.dict);
    }

    getSubCategoryKeys(category) {
        return Object.keys(this.dict[category]);
    }

    getExamplesList(category, subCategory) {
        return this.dict[category][subCategory].examples;
    }

    randCategory() {
        return randFromList(this.getCategoryKeys(), 1)[0];
    }

    randSubCategory(category = null) {
        if (category) {
            return randFromList(this.getSubCategoryKeys(category), 1)[0];
        }
        return this.randSubCategory(this.randCategory());
    }

    randExample(category = null, subCategory = null) {
        if (category) {
            if (subCategory) {
                let example = randFromList(this.dict[category][subCategory].examples, 1)[0];
                return new Sentence(category, subCategory, example);
            }
            return this.randExample(category, this.randSubCategory(category));
        }
        if (this.chosenCategory === "all") {
            return this.randExample(this.randCategory());
        }
        return this.randExample(this.chosenCategory);
    }

    randSubCategories(amount) {
        let randCat = this.randCategory();
        return randFromList(this.getSubCategoryKeys(randCat), amount);
    }

    static formatDict(dict) {
        // Turn sentence strings into arrays
        for (var [k1, v1] of Object.entries(dict)) {
            for (var [key, value] of Object.entries(dict[k1])) {
                dict[k1][key].examples = value.examples.split("\n").slice(1, -1);
                // Trim spaces around sentences
                for (let i = 0; i < dict[k1][key].examples.length; i++) {
                    dict[k1][key].examples[i] = dict[k1][key].examples[i].replace('•', '').trim();
                }
            }
        }
    }
}



// starts Meta Model Trainer 1
function startMultipleChoiceTrainer(dict, title, buttons = true) {
    clearIndex();
    document.getElementById("title").innerHTML = title;
    question = new Question();
    question.clear();


    mcd = new MultipleChoiceDict(dict);
    if (buttons) {
        // make div for each category
        for (let i = 0; i < mcd.getCategoryKeys().length; i++) {
            let category = mcd.getCategoryKeys()[i];
            makeDiv(category + "Buttons", "bottomDiv", category);
            // makeH2(category, category + "Buttons");

            // generate answer buttons
            for (let j = 0; j < mcd.getSubCategoryKeys(category).length; j++) {
                let subCategory = mcd.getSubCategoryKeys(category)[j];
                makeAnswerButton(subCategory, category, category + "Buttons", function () {
                    answerChosen(subCategory);
                });
            }
        }
    } else {
        let subCats = [];
        for (let i = 0; i < mcd.getCategoryKeys().length; i++) {
            let category = mcd.getCategoryKeys()[i];
            for (let j = 0; j < mcd.getSubCategoryKeys(category).length; j++) {
                let subCategory = mcd.getSubCategoryKeys(category)[j];
                subCats.push(subCategory);
            }
        }
        makeTextArea("input", "bottomDiv");
        autocomplete(document.getElementById("input"), subCats, "bottomDiv",
            function (answer) { answerChosen(answer); chooseSentence(); });
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


function startEnrichedLanguageTrainer1() {
    document.getElementById("title").innerHTML = "Enriched Language Trainer 1 (Beginner)";
    document.getElementById("bottomDiv").style.display = "flex";
    document.getElementById("bottomDiv").style.margin = "100px";
    question = new Question()

    mcd = new MultipleChoiceDict(enrichedLanguageSentences);

    question.chooseNextQuestion();

    // make answer buttons
    for (let i = 0; i < mcd.getCategoryKeys().length; i++) {
        let category = mcd.getCategoryKeys()[i];

        for (let j = 0; j < mcd.getSubCategoryKeys(category).length; j++) {
            let subCategory = mcd.getSubCategoryKeys(category)[j];
            makeAnswerButton(subCategory, "answerButton answer:" + subCategory, "bottomDiv",
                function () { answerChosen(subCategory); question.chooseNextQuestion(); })
        }
    }
}

function startEnrichedLanguageTrainer2() {
    document.getElementById("title").innerHTML = "Enriched Language Trainer 2 (Advanced)";
    question = new Question()
    makeH3("", "topDiv", "submods");
    makeTextArea("textarea", "bottomDiv");
    autocomplete(document.getElementById("textarea"), basicNeeds, "bottomDiv");

    getRandSubmodalities(3);
    getRandSentence(modalityNeutralSentences);

    let textarea = document.getElementById("textarea");

    textarea.onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {
            document.getElementById("textarea").value = "";
            getRandSubmodalities(3);
            getRandSentence(modalityNeutralSentences);
        }
    };
};

function startIntentionReframeTrainer1() {
    document.getElementById("title").innerHTML = "Intention Reframe Trainer 1";

    question = new Question()
    getRandSentence(negativeBehaviours);

    for (let i = 0; i < basicNeeds.length; i++) {
        makeTextArea("textarea" + (i + 1), "bottomDiv", placeholder = basicNeeds[i], small = true);
    }

    document.getElementById("textarea6").onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {
            for (let i = 0; i < basicNeeds.length; i++) {
                document.getElementById("textarea" + (i + 1)).value = "";
            }
            getRandSentence(negativeBehaviours);
        }
    };
};

function startLogicalLevelsTrainer1() {
    document.getElementById("title").innerHTML = "Logical Levels Trainer 1";

    question = new Question()
    getRandSentence(negativeBehaviours);

    for (let i = 0; i < logicalLevels.length; i++) {
        makeTextArea("textarea" + (i + 1), "bottomDiv", placeholder = logicalLevels[i], small = true);
    }

    document.getElementById("textarea6").onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {
            for (let i = 0; i < logicalLevels.length; i++) {
                document.getElementById("textarea" + (i + 1)).value = "";
            }
            getRandSentence(negativeBehaviours);
        }
    };
}

function startWritingTrainer1(fromList, title) {
    let score = 0;
    let amount = 4;
    document.getElementById("title").innerHTML = title + score;
    let dv = document.createElement("div");
    dv.id = "innerDiv";
    dv.style.margin = "50px";
    document.getElementById("topDiv").appendChild(dv);

    // question = new Question()
    // makeH3("", "topDiv", "sentence");
    // getRandSentence(fromList);
    let rand = randFromList(fromList, amount);
    for (let i = 0; i < amount; i++) {
        makeH3(rand[i], "innerDiv");
    }
    makeTextArea("textarea", "bottomDiv");


    document.getElementById("textarea").onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {
            document.getElementById("textarea").value = "";
            document.getElementById("innerDiv").innerHTML = "";
            rand = randFromList(fromList, amount);
            for (let i = 0; i < amount; i++) {
                makeH3(rand[i], "innerDiv");
            }
            score += amount;
            document.getElementById("title").innerHTML = title + score;
        }
    };
}


function startDoubleBindTrainer() {
    document.getElementById("title").innerHTML = "Meta Program Trainer 2";

    for (let i = 0; i < 3; i++) {
        let dv = document.createElement("div");
        dv.id = "doubleBindDiv" + i;
        document.getElementById("topDiv").appendChild(dv);
        makeTextArea("t1", "doubleBindDiv" + i);
        makeTextArea("t2", "doubleBindDiv" + i);
    }

    makeTextArea("t3", "topDiv");
}


function startMetaProgramTrainer2() {
    document.getElementById("title").innerHTML = "Meta Program Trainer 2";
    let amountOfMetaPrograms = 5;

    dropdown.clearContent();
    dropdown.toggleVisibility(true);
    question = new Question();

    makeDropdownButton("Motivation", function () { activeMetaPrograms = "motivation"; dropdown.toggleOpen(); });
    makeDropdownButton("Productivity", function () { activeMetaPrograms = "productivity"; dropdown.toggleOpen(); });
    makeDropdownButton("All", function () { activeMetaPrograms = "all"; dropdown.toggleOpen(); });


    // create div inside topDiv
    var dv = document.createElement("div");
    dv.id = "metaProgramsDiv";
    document.getElementById("topDiv").appendChild(dv);

    // create h3s in topDiv
    for (let i = 0; i < amountOfMetaPrograms; i++) {
        makeH3("a", "metaProgramsDiv", "mp:" + (i + 1));
    }

    // create textareas in bottomDiv
    for (let i = 0; i < contexts.length; i++) {
        makeTextArea("textarea" + (i + 1), "bottomDiv", placeholder = contexts[i], small = true);
    }

    // fill h3's with random meta programs
    chooseNextMetaPrograms(amountOfMetaPrograms);


    // on enter key: set new random meta programs and clear text areas
    document.getElementById("textarea4").onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {

            for (let i = 0; i < contexts.length; i++) {
                document.getElementById("textarea" + (i + 1)).value = "";
            }
            chooseNextMetaPrograms(amountOfMetaPrograms);
        }
    };
}

function startMetaProgramTrainer4() {
    mcd = new MultipleChoiceDict(metaPrograms);
    console.log(mcd);
    let subCat = [];
    for (let i = 0; i < mcd.getCategoryKeys().length; i++) {
        let cat = mcd.getCategoryKeys()[i];
        subCat.push(mcd.getSubCategoryKeys(cat));
    }
    subCat = subCat.flat();
    console.log(subCat);

    makeTextArea("", "topDiv", "Context:", true);

    for (let i = 0; i < subCat.length; i++) {
        makeTextArea("", "topDiv", subCat[i], true);
    }

    makeTextArea("", "topDiv", "Plan / Language:");

}

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

function startSelfAdviceWriter1() {
    makeH2("Suggestion Model", "topDiv");
    // makeH2("Macho Test", "topDiv");
    makeH2("Sell to Internals", "topDiv");
    // makeH2("3-2-1 Away From Sandwich", "topDiv");
    makeH2("Bad News Formula", "topDiv");
    // makeH2("4Mat Opener", "topDiv");
    makeTextArea("", "bottomDiv");

}

function showTrainings() {
    if (trainingDropdownOpen) {
        document.getElementById("trainingDropdown").style.display = "none";
    } else {
        document.getElementById("trainingDropdown").style.display = "grid";
    }
    trainingDropdownOpen = !trainingDropdownOpen;
};

function selectTraining(trainingCode) {
    showTrainings();
    clearIndex();
    switch (trainingCode) {
        case "MMT1": startMultipleChoiceTrainer(metaModelSentences, "Meta Model Trainer");
            break;
        case "ELT1": startEnrichedLanguageTrainer1();
            break;
        case "ELT2": startEnrichedLanguageTrainer2();
            break;
        case "IRT1": startIntentionReframeTrainer1();
            break;
        case "LLT1": startLogicalLevelsTrainer1();
            break;
        case "MPT1": startMultipleChoiceTrainer(metaProgramsMC, "Meta Program Trainer 1");
            break;
        case "MPT2": startMetaProgramTrainer2();
            break;
        case "MPT4": startMetaProgramTrainer4();
            break;
        case "RET1": startWritingTrainer1(sleightOfMouth, "Reframing Trainer: ");
            break;
        case "MIL1": startWritingTrainer1(miltonPatterns1, "Milton Patterns: ");
            break;
        case "PRE1": startWritingTrainer1(mainPresuppositions, "Presuppositions: ");
            break;
        case "SUB1": startWritingTrainer1(importantSubModalities, "Submodalities: ");
            break;
        case "SAW1": startSelfAdviceWriter1();
            break;
        case "DBT1": startDoubleBindTrainer();
            break;
    }
}

window.addEventListener("load", function () {

    MultipleChoiceDict.formatDict(enrichedLanguageSentences);
    MultipleChoiceDict.formatDict(metaModelSentences);
    MultipleChoiceDict.formatDict(metaProgramsMC);


    clearIndex();
    dropdown = new Dropdown("dropdown", "selectionDropdown");
    question = new Question()

    // startMetaModelTrainer1();
    // startEnrichedLanguageTrainer1();
    // startEnrichedLanguageTrainer2();
    // startIntentionReframeTrainer1();
    // startLogicalLevelsTrainer1();
    // startMetaProgramTrainer2();
    // startReframingTrainer1();

    selectTraining("MMT1");
    showTrainings();
});

