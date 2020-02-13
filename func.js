window.onload = () => { 
  const inputSection = $('.usersWord');
  const searchButton = document.getElementById('searchButton');
  const meaningContainer = document.getElementById('meaning');

  $('.meanings').hide();
  
  searchButton.addEventListener('click', async function() { 
    // Modifying users input; 
    let userInput = inputSection.val().trim();
    if(userInput.length > 0) { 
      $('.motherElements').empty();
      const requestData = await fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${userInput}`);
      const workPicked = document.getElementById('wordPicked');
      const rawData = await requestData.json()
      .then((data => { 
        $('.main').animate({height: '25vh'});
        $('.meanings').show();

        const meaningData = data[0].meaning;
        let meaningCount = 0;
        data.forEach(item => {
          const definition = Object.values(item.meaning);
          const qualities = Object.keys(item.meaning);
          $('#wordPicked').text(item.word);
          $('#orginQuote').text('ORIGIN:');
          $('#originText').text(item.origin);
          $('#phoneticQuote').text('PHONETIC:');
          $('#phoneticText').text(item.phonetic);
          // $('.definition').hide();
          // $('.meaningProperty').hide();
          // $('.counter').hide();
          $('.meanings').append(`
          <div id='individualMeaning'>
            <div class='motherElements'>
            <h3 class='counter'>0${meaningCount += 1}</h3>
            <p id='fullMeaning'>
            <h4 id='emptyquality' class='meaningProperty'>As a ${qualities[0]}</h4>
            <span  class='definition'>${Object.values(definition[0][0])[0]}</span>
          </p> 
            </div>
          </div>`);
          // console.log(Object.values(definition[0][0])[0]);
        });
      })
      )
      .catch(e => { 
        if(e.name === 'TypeErro' || e.name === 'SyntaxError') { 
          $('#usrErrorNotification').fadeIn(800);
          setInterval(() => {
            $('#usrErrorNotification').fadeOut(800)
          }, 1900);
          console.log(e.name);
          $('#wordPicked').text('');
          $('#orginQuote').text('');
          $('#originText').text('');
          $('#phoneticQuote').text('');
          $('.main').animate({height: '100vh'}, 900);
          $('.meanings').hide();
        }
      })
    }

    else { 
      $('#usrErrorNotification').fadeIn(800);
      setInterval(() => {
        $('#usrErrorNotification').fadeOut(800)
      }, 1600);
    }
  });

  $('#closeMeaningButton').on('click', () => { 
    $('.main').animate({height: '100vh'}, 900);
    $('.meanings').hide();
  })
}