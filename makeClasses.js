
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