let outer = true; // outer border hidden applied
let allowHover = false;
let wordCounted_ = 0;
let wordCounterStatus = false;
let timerSet = 0;

const words = {
    "round1": [
        ["Elephant", "Giraffe", "Zebra", "Antelope", "Koala", "Tiger", "Monkey", "Penguin", "Reindeer", "Panda", "Dog", "Rhinoceros", "Peacock", "Cow", "Chameleon", "Meerkat"],
        ["Camel", "Dolphin", "Hippo-<br>potamus", "Flamingo", "Porcupine", "Goat", "Wolf", "Chicken", "Turtle", "Sloth", "Llama", "Tortoise", "Frog", "Fox", "Cheetah", "Owl", "Gorilla", "Bat", "Squirrel", "Orangutan"]
    ],  // quokka cannot be done, there is no word ending with q (resolved)
    "round2": [
        ["Taylor<br>Swift", "Mark<br>Ruffalo", "Cardi B", "Harry<br>Styles", "Zendaya", "Tom<br>Holland", "Dua Lipa", "Ed<br>Sheeran", "Doja Cat", "BTS", "Ariana<br>Grande", "Conan<br>Gray", "Coldplay", "Justin<br>Bieber", "Chris<br>Evans", "Jeremy<br>Renner"],
        ["Camila<br>Cabello", "Lauv", "Angelina<br>Jolie", "Emma<br>Stone", "Will<br>Smith", "Jackie<br>Chan", "Drake", "Ava Max", "Bebe<br>Rexha", "Shawn<br>Medes", "Charlie<br>Puth", "Adele", "Olivia<br>Rodrigo", "Bille<br>Eilish", "Paul<br>Rudd", "The<br>Weeknd", "Rihanna", "Big Bang", "Ryan<br>Reynolds", "Black<br>Pink"]
    ],
    "round3": [
        ["Straw-<br>berry", "Cherry", "Banana", "Apple", "Pineapple", "Orange", "Pear", "Durian", "Peach", "Water-<br>melon", "Jack-<br>fruit", "Grapes", "Soursop", "Apricot", "Rasp-<br>berry", "Pomegr-<br>anate"],
        ["Guava", "Kiwi", "Blue-<br>berry", "Rambu-<br>tan", "Plum", "Dragon-<br>fruit", "Honey-<br>dew", "Coconut", "Fig", "Star-<br>fruit", "Avocado", "Mango", "Lemon", "Longan", "Black-<br>berry", "Grape-<br>fruit", "Mango-<br>steen", "Lychee", "Papaya", "Rock-<br>melon"]
    ],
    "round4": [
        ["Chicken<br>Rice", "Laksa", "Prawn<br>Noodle", "Chili<br>Crab", "BBQ<br>Stingray", "Bak Kut<br>Teh", "Kaya<br>Toast", "Nasi<br>Lemak", "Oyster<br>Omelette", "Teh<br>Tarik", "Roti<br>Prata", "Kway<br>Chap", "Popiah", "Chendol", "Mee Pok", "Mee<br>Rebus"],
        ["Char Kway<br>Teow", "Bandung", "Kopi", "Charsiew<br>Rice", "Satay", "Fish Head<br>Curry", "Nasi<br>Goreng", "Mee Soto", "Mee<br>Goreng", "Milo", "Satay<br>Bee Hoon", "Tutu<br>Kueh", "Rojak", "Lor Mee", "Goreng<br>Pisang", "Mee Siam", "Ice<br>Kachang", "Curry<br>Puff", "Ban Mian", "Otak<br>Otak"]
    ],  // to change rhino
    "round5": [
        ["Data<br>Science", "Tech<br>logy", "Cookies", "Infomation<br>Technology", "Breach", "Domain", "Software", "Cyber<br>Security", "Firewall", "Immersive<br>Media", "VPN", "IP<br>Address", "Big Data", "Deepfake", "Algorithms", "Augmented<br>Reality"],
        ["Virtual<br>Reality", "Predictive<br>Analysis", "Internet", "Extreme<br>Reality", "Coding", "Phishing", "Javascript", "Cloud", "Stitching", "Metadata", "Data<br>Mining", "Ransom-<br>ware", "Virus", "Outlier", "Cache", "Band<br>width", "Database", "Malware", "Python", "Statistics"]
    ]
}

$(document).ready(function() {
    onceReady();
    
    $(document).on("click", ".choices p", function() { 
        // main menu
        allowHover = true;
        
        let ChoiceText = $(this).html()[$(this).html().length - 1]
        
        answerInit(ChoiceText);
        wordCounterStatus = true;
    });
    
    // handle click grid
    $(document).on("click", ".gridbox", function(){  
        // click gridbox
        if (!($(this).hasClass("outer"))) {
            $(this).addClass("clicked");
        }
        NumberOfChecked();
        checkBingos();
    }).on("click", ".gridbox.clicked", function(){  
        // unclick gridbox
            $(this).removeClass("clicked");
            NumberOfChecked();
            checkBingos();
        });
    // handle click grid end

    // handle navbar hover highlight
    $(".options li").mouseover(function() {  // hover
        if (allowHover) {
            let parentwidth = $(this).width();      
            $(".underline").width(parentwidth);  
            $(this).children().removeClass("bar").addClass("in-animate");
        }
    }).mouseout(function() {  // hover off
        $(this).children().addClass("bar").removeClass("in-animate");
    });  
    // handle navbar hover highlight end
    
    // handle navbar
    $(document).on("click", ".options li", function() { 
        //nav options
        wordCounterStatus = false;
        let choice = $(this).attr('id');
        if (choice === "clear") {  
            // clear outer clicked status
            $(".outer").removeClass("clicked");
            $(".outed").removeClass("clicked");
            wordCounterStatus = true;
        } else if (choice === "newGame") { 
            // new game session
            location.reload();
        } else if (choice === "scores") {  
            // show scores
            let clearedAmt = 0;
            if (outer) {  
                // if outer is hidden
                clearedAmt = $(".clicked:not('.outer'):not('.outed')").length
            } else {
                clearedAmt = $(".clicked").length
            }
            
            $(".score-clicked").empty().append(clearedAmt);
            $(".scoreboard").removeClass("bar").removeClass("fade-out");
            $(".score-container").addClass("down-anim");
            checkBingos();
        }
    }).on("click", ".score.leave", function(){ 
        //leave scoreboard
        $(".scoreboard").addClass("fade-out");
        $(".score-container").removeClass("down-anim");
        wordCounterStatus = true;
        window.setTimeout(function(){
            $(".scoreboard").addClass("bar")
            wordCounterStatus = true;
        }, 800)
    })
    // handle navbar end
    
    //handles word counter
    $(document).on("click", ".counter", function() {
        //handles word counter by click
        if (wordCounterStatus) {
            let className = $(this).attr("class");
            if (className == "add counter") { 
                //handles word add
                wordCounted_ += 1;
                wordCounter();
            } else if (className == "remove counter" && wordCounted_ > 0){ 
                //handles word remove (if zero)
                wordCounted_ -= 1;
                wordCounter();
            } else { 
                //handles word remove
                wordCounted_ = 0;
                wordCounter();
            }
        }

        //handles word counter by keys
    }).on("keyup", function(e){
        if (wordCounterStatus) {
            if(e.keyCode == 32){ 
                // released space (add)
                wordCounted_ += 1;
                wordCounter();
            } else if (e.keyCode == 8 && wordCounted_ > 0) { 
                // released backspace (remove)
                wordCounted_ -= 1;
                wordCounter();
            }
            $(".score-points").css("background-color", "");
        }
    }).on("keydown", function(e){
        if (wordCounterStatus) {
            // just looks nice, keypress interactions
            if(e.keyCode == 32) {
                $(".score-points").css("background-color", "lightgreen");
            } else if (e.keyCode == 8) {
                $(".score-points").css("background-color", "lightcoral");
            }
        }
    });

    // handles reset
    $(".score-points").on('mousedown', function() {
        timerSet = setTimeout(function(){
            $(".score-points").css("background-color", "lightcoral");
            wordCounted_ = 0;
            setTimeout(function(){
                $(".score-points").css("background-color", "");
            }, 100);
            wordCounter();
        }, 800);
    }).on('mouseup mouseleave', function() {
        clearTimeout(timerSet);
    });

    //handles word counter end
});


function forTesting() { 
    // applies "click to all tiles"
    $(".gridbox").addClass("clicked");
    NumberOfChecked();
}

function onceReady() {
    $(".choices").width($(".start-text").width()); 
    // gives option choices a width
    $(".short").width($(".gridbox").width() * 4 + (1.5 * 3))
    wordCounter(); 
}

function answerInit(choiceText){
    //determine answers (upon print)
    //words["round1"][0] => inner
    let textchosen = "round" + String(choiceText)

    for (let listCounter = 0; listCounter < words[textchosen].length; listCounter++) {
        //runs inner and outer subsequently
        let selectedList = words[textchosen][listCounter];
        console.log(selectedList);
        const Boxes = [$(".gridbox:not('.outer')"), $(".gridbox.outer")]
        //innner is 0, outer is 1
        for (let wordCounter = 0; selectedList.length > 0; wordCounter++) {
            let chosenText = selectedList[randomizer(selectedList.length)];
            // choses random text

            $(Boxes[listCounter][wordCounter]).html(chosenText);
            // edits the inner html of the selected box
            console.log(chosenText);

            selectedList = removeItemInArray(selectedList, chosenText);
            //remove word from list and replace current list with new list (prevent dups)
        }
    }
    $(".start-container").addClass("fade-out");
    $(".start-menu").removeClass("down-anim");
    window.setTimeout(function() {
        $(".start-container").addClass("bar");
    }, 800);
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
    let selectedType = [];

    for (let iOSelector = 0; iOSelector < iOList.length; iOSelector++) {  
        for (let p = 0; p < iOList[iOSelector].length; p++) {
            selectedType = [iOSelector, p];
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
    $("span.score-bingo").empty().html(bingoAmt);
}


 function wordCounter(){
    $(".score-points").empty().html(String(wordCounted_));
    $(".score-words").empty().html(String(wordCounted_));
}