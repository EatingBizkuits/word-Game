let outer = true; // outer border hidden applied
let allowHover = true;

const words = {
    "round1": [
        ["Elephant", "Giraffe", "Zebra", "Antelope", "Koala", "Tiger", "Monkey", "Penguin", "Reindeer", "Panda", "Dog", "Rhinoceros", "Peacock", "Cow", "Chameleon", "Quokka"],
        ["Camel", "Dolphin", "Hippo-<br>potamus", "Flamingo", "Porcupine", "Goat", "Wolf", "Chicken", "Turtle", "Sloth", "Llama", "Tortoise", "Frog", "Fox", "Cheetah", "Owl", "Gorilla", "Bat", "Squirrel", "Orangutan"]
    ],
    "round2": [

    ]
}

$(document).ready(function() {
    answerInit();
    // forTesting(); // applies click to all boxes
    // handle click grid
    $(document).on("click", ".gridbox", function(){  // click
        if (!($(this).hasClass("outer"))) {
            $(this).addClass("clicked");
        }
        NumberOfChecked()
    });

    $(document).on("click", ".gridbox.clicked", function(){  // unclick
        $(this).removeClass("clicked");
        NumberOfChecked()
    });
    // handle click grid end

    // handle hover highlight
    $(".options li").mouseover(function() {  // hover
        if (allowHover) {
            let parentwidth = $(this).width();      
            $(".underline").width(parentwidth);  
            $(this).children().removeClass("bar").addClass("in-animate");
        }
    });

    $(".options li").mouseout(function() {  // hover off
        $(this).children().addClass("bar").removeClass("in-animate");
    });  
    // handle hover highlight end
    
    $(document).on("click", ".options li", function() {
        let choice = $(this).attr('id');
        if (choice === "clear") {  // clear outer clicked status
            $(".outer").removeClass("clicked");
            $(".outed").removeClass("clicked");
        } else if (choice === "newGame") {
            $(".scoreboard").addClass("bar");
            location.reload();
        } else if (choice === "scores") {
            let clearedAmt = 0;
            if (outer) {  // if outer is hidden
                clearedAmt = $(".clicked:not('.outer'):not('.outed')").length
            } else {
                clearedAmt = $(".clicked").length
            }
            
            $(".score-clicked").empty().append(clearedAmt);
            $(".scoreboard").removeClass("bar").removeClass("fade-out");
            $(".score-container").addClass("down-anim");
            checkBingos();
        }

    });

    $(document).on("click", ".score.leave", function(){
        $(".scoreboard").addClass("fade-out");
        $(".score-container").removeClass("down-anim");
        window.setTimeout(function(){
            $(".scoreboard").addClass("bar")
        }, 800)
    });

});


function forTesting() { // applies "click to all tiles"
    $(".gridbox").addClass("clicked");
    NumberOfChecked();
}

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
    }
}


function NumberOfChecked() {  // Shows the outer layer when all inner has been answered
    // remove outer tag only when done
    let clickedOBJ = $(".clicked:not('.outed.clicked')")

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
    if (outer) { // to hide outer
        $(".outed").addClass("outer").addClass("animated").removeClass("outed");
        setTimeout(function() {
            $(".borderbox").removeClass("enlarge").addClass("shrink");
        }, 1000)

    } else { // to reveal outer
        $(".borderbox").addClass("enlarge").removeClass("shrink");
        $(".outer").addClass("outed").removeClass("outer").removeClass("animated");

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

function checkBingos(){
    const iOList = [
        [$(".C1"), $(".C2"), $(".C3"), $(".C4"), $(".R1"), 
        $(".R2"), $(".R3"), $(".R4"), $(".D1"), $(".D2")], 
        [$(".OO1"), $(".OO2"), $(".OO3"), $(".OO4"), $(".OC1"), 
        $(".OC2"), $(".OC3"), $(".OC4"), $(".OR1"), $(".OR2"), 
        $(".OR3"), $(".OR4"), $(".OD1"), $(".OD2")]];
    
    let bingoAmt = 0;
    let checkLength = 4;  // increase to 6 when checking on outer
    

    for (let iOSelector = 0; iOSelector < iOList.length; iOSelector++) {  
        for (let p = 0; p < iOList[iOSelector].length; p++) {
            let clickedArray = [];
            for (let i = 0; i < iOList[iOSelector][p].length; i++) {
                if ($(iOList[iOSelector][p][i]).hasClass("clicked")) {
                    clickedArray.push($(iOList[iOSelector][p][i]));
                }
            }
            
            if (clickedArray.length == checkLength) {
                if ((checkLength == 6 && !outer) || (checkLength == 4)) {
                    bingoAmt += 1;
                }    
            }
        }
        checkLength += 2  
    }
    console.log(bingoAmt);
    $("span.score-bingo").empty().html(bingoAmt);
}