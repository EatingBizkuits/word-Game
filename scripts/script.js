let outer = true; // outer border applied

// const words = {

// }

$(document).ready(function() {
    console.log('ready');

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

// remove outer tag only when done

function NumberOfChecked() {
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

function outerStatus() {
    if (outer) {
        $(".outed").addClass("outer").removeClass("outed");
    } else {
        $(".outer").addClass("outed").removeClass("outer");
    }
}