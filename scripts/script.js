let outer = true; // outer border applied

const words = {
    "round1": [
        ["Elephant", "Giraffe", "Zebra", "Antelope", "Koala", "Tiger", "Monkey", "Penguin", "Reindeer", "Panda", "Dog", "Rhinoceros", "Peacock", "Cow", "Chameleon", "Quokka"],
        ["Camel", "Dolphin", "Hippopotamus", "Flamingo", "Porcupine", "Goat", "Wolf", "Chicken", "Turtle", "Sloth", "Llama", "Tortoise", "Frog", "Fox", "Cheetah", "Owl", "Gorilla", "Bat", "Squirrel", "Orangutan"]
    ],
    "round2": []
}

$(document).ready(function() {
    answerInit()

    $(document).on("click", ".gridbox", function(){
        if (!($(this).hasClass("outer"))) {
            $(this).addClass("clicked");
        }
        NumberOfChecked()
    });

    $(document).on("click", ".gridbox.clicked", function(){
        $(this).removeClass("clicked");
        NumberOfChecked()
    });

});


function answerInit(){
    //determine answers (upon print)
    //words["round1"][0] => inner
    let textchosen = "round1"

    for (let listCounter = 0; listCounter < words[textchosen].length; listCounter++) {
        //runs inner and outer subsequently
        let selectedList = words[textchosen][listCounter];
        const Boxes = [$(".gridbox:not('.outer')"), $(".gridbox.outer")]
        //innner is 0, outer is 1
        for (let wordCounter = 0; selectedList.length > 0; wordCounter++) {
            let chosenText = selectedList[randomizer(selectedList.length)];
            // choses random text

            $(Boxes[listCounter][wordCounter]).html(chosenText);
            // edits the inner html of the selected box

            selectedList = removeItemInArray(selectedList, chosenText);
            //remove word from list and replace current list with new list (prevent dups)
            
        }
        console.log("next")
    }
}


function NumberOfChecked() {  // Shows the outer layer when all inner has been answered
    // remove outer tag only when done
    let clickedOBJ = document.getElementsByClassName("clicked");
    
    if (clickedOBJ.length >= 16) {
        // if all inner are checked
        outer = false;
        outerStatus();    
    } else {
        if (!outer) {
            outer = true;
            outerStatus();
        }
    }
}

function outerStatus() { // Replaces Status
    if (outer) {
        $(".outed").addClass("outer").addClass("animated").removeClass("outed");
    } else {
        $(".outer").addClass("outed").removeClass("outer");
    }
}

function randomizer(maxLength) {
    return Math.floor((Math.random() * maxLength));
}

function removeItemInArray(array, toRemove){
    let newArray = []
    for (let count = 0; count < array.length; count++) {
        if (array[count] === toRemove){
            continue
        } else {
            newArray.push(array[count]);
        }
    }
    return newArray;
}