// import  words from "./dict"

let body  = $("body");



let main = $(".main")
let inputBox = main.children(".inputs");

let searchButton = $("#searchButton")

let meaning = $(".meaning")

let usersWord = $(".usersWord")

meaning.hide()

let backToMeaning = $(meaning.children("h1"))




searchButton.on("click", ()=> {

    let newWord = usersWord.val().toUpperCase()

    if( words[newWord]){


        main.animate({height: "20vh"}, 'slow');

        // Hide the input area
        inputBox.animate({opacity: "0.00003"}, 400)

        // Show the meaning section
        meaning.show(300)

        // Edit texts
        meaning.children("h3").text(usersWord.val().toUpperCase())
        meaning.children("#word").text(words[usersWord.val().toUpperCase()])
    }

   

   

    else{

        main.animate({height: "20vh"}, 'slow');
        inputBox.animate({opacity: "0.00003"}, 400)
        meaning.show(300)

        meaning.children("h3").text("Word not Found");
        meaning.children("#word").html(`Oh we couldn't find your word! ${`<a style="color: #211F97; font-weight: 900" href=" https://www.google.com/search?client=firefox-b-d&q=${usersWord.val()} "> Click Here</a>` } to find it on GOOGLE, Goolge has all the answers after all. `)


        
       

    }

    
   

   

    
})

backToMeaning.on("click", ()=> {
    inputBox.animate({opacity: "1"})

    meaning.hide(300)

    main.animate({height: "100vh"}, 'slow');


})




// Function for when user on desktop/pc/laptop or using a keyboard hits the ENTER key

body.on("keyup", (e)=>{

    let newWord = usersWord.val().toUpperCase()

    if(words[newWord]){

    if(e.code === "Enter"){
        main.animate({height: "20vh"}, 'slow');
        inputBox.animate({opacity: "0.00003"}, 400)


    
        meaning.show(300)

        meaning.children("h3").text(usersWord.val().toUpperCase())

        meaning.children("p").text(words[usersWord.val().toUpperCase()])
    }



}
})

