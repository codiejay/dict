let body  = $("body");


// The loader elements

let headingLoading = $(".headingLoading");
let meaningLoading = $(".meaningLoading");



let main = $(".main")
let inputBox = main.children(".inputs");

let searchButton = $("#searchButton")

let meaning = $(".meaning")

let usersWord = $(".usersWord")

meaning.hide()

let backToMeaning = $(meaning.children("h1"))


  

searchButton.on("click", ()=> {

  
if(usersWord.val() !== ""){

main.animate({height: "20vh"}, 'slow');
// Opaque the input area
inputBox.animate({opacity: "0.88"}, 400);

// Show the meaning section
meaning.show(300)
let userWordtolowercase = usersWord.val().toLowerCase()

// A reference of the usersword.
let getUserWord = ref.collection("dictionary").where("names" , "==" ,  userWordtolowercase).get()

// Get the snapshot of that document.
getUserWord.then(snapshot => {


  // If it;s empty then return something like so
  if(snapshot.empty){
    console.log("No data")

    meaning.children("h3").text("Word not Found");
    meaning.children("#word").html(`Oh we couldn't find your word! ${`<a style="color: #211F97; font-weight: 900" href=" https://www.google.com/search?client=firefox-b-d&q=${usersWord.val()} "> Click Here</a>` } to find it on GOOGLE, Goolge has all the answers after all. `)


  }

  // But if not empty then loop through the doc and it 
  // returns a data which you can access at every looop. 

  else{


  snapshot.forEach( 

    doc =>{ 

      // that's an object.
      let returnedWord = doc.data()

      meaningLoading.hide();
      headingLoading.hide()

       // Edit texts
      meaning.children("h3").text(usersWord.val().toUpperCase())
      meaning.children("#word").text(Object.values(returnedWord)[0])
    }
  )

  }
})



  // let newWord = usersWord.val().toLowerCase();

  // if( words[newWord].toLowerCase()){


  //     main.animate({height: "20vh"}, 'slow');

  //     // Hide the input area
  //     inputBox.animate({opacity: "0.00003"}, 400)

  //     // Show the meaning section
  //     meaning.show(300)

  //     // Edit texts
  //     meaning.children("h3").text(usersWord.val().toUpperCase())
  //     meaning.children("#word").text(words[usersWord.val().toLowerCase()])
  // }

 

 

  // else{

    
      
     

  // }

  
 

}
  
})



backToMeaning.on("click", ()=> {
  inputBox.animate({opacity: "1"})
  meaning.children("h3").text("");
  meaning.children("#word").text("")
  meaning.hide(300)
  

  main.animate({height: "100vh"}, 'slow');
  meaningLoading.show();
  headingLoading.show()

})




// Function for when user on desktop/pc/laptop or using a keyboard hits the ENTER key

body.on("keyup", (e)=>{

  let newWord = usersWord.val().toLowerCase()

  if(words[newWord]){

  if(e.code === "Enter"){
      main.animate({height: "20vh"}, 'slow');
      inputBox.animate({opacity: "0.00003"}, 400)


  
      meaning.show(300)

      meaning.children("h3").text(usersWord.val().toUpperCase())

      meaning.children("p").text(words[usersWord.val().toLowerCase()])
  }



}
})








// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAIyR3YFeLcMF_1j9y7XMPoJVl_c4xR3r4",
  authDomain: "dictionary01-fe872.firebaseapp.com",
  databaseURL: "https://dictionary01-fe872.firebaseio.com",
  projectId: "dictionary01-fe872",
  storageBucket: "dictionary01-fe872.appspot.com",
  messagingSenderId: "974905770546",
  appId: "1:974905770546:web:1a56beca1e08b653"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let ref = firebase.firestore();
