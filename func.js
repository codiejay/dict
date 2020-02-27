window.onload = () => { 
  const inputSection = $('.usersWord');
  const searchButton = document.getElementById('searchButton');
  const meaningContainer = document.getElementById('meaning');
  const APIURL = 'https://api.dictionaryapi.dev/api/v1/entries/en/';

  $('.meanings').hide();

  const emptyElements = () => { 
    // $('#wordPicked').text('');
    // $('#orginQuote').text('');
    // $('#originText').text('');
    // $('#phoneticQuote').text('');
  }
  // Modifying users input; 
  const modifyWord = () => { 
    let word = inputSection.val().trim();
    return word;
  }
  
  //add Metas
  const addMeta = (item) => { 
    $('#wordPicked').text(item.word);
    $('#orginQuote').text('ORIGIN:');
    $('#originText').text(item.origin);
    $('#phoneticQuote').text('PHONETIC:');
    $('#phoneticText').text(item.phonetic);
  }

  //Add Meaning 
  const addMeaning = (meaningCount, qualities, definition) => { 
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
  }

  //Make request to URL 
  const apiRequest = async (userInput) => { 
      const requestData = await fetch(`${APIURL}${userInput}`);
      const rawData = await requestData.json()
      .then((data => { 
        $('.main').animate({height: '25vh'});
        $('.meanings').show();
        let meaningCount = 0;
        data.forEach(item => {
          const definition = Object.values(item.meaning);
          const qualities = Object.keys(item.meaning);
          addMeta(item);
          addMeaning(meaningCount++, qualities, definition);
        });
      }))
      .catch(e => { 
        if(e.name === 'TypeError' || e.name === 'SyntaxError') { 
          $('#usrErrorNotification').fadeIn(800);
          emptyElements();
          setInterval(() => {
            $('#usrErrorNotification').fadeOut(900)
          }, 1900);
          $('.main').animate({height: '100vh'}, 900);
          $('.meanings').hide();
        }
      })
  }

  searchButton.addEventListener('click', async function() { 
    let userInput = modifyWord();
    
    if(userInput.length > 0) { 
      $('.motherElements').empty();
      apiRequest(userInput);
    }
    else { 
      $('#usrErrorNotification').fadeIn(800);
      setInterval(() => {
        $('#usrErrorNotification').fadeOut(800)
      }, 1600);
    }
  });

  $('body').on('keyup', (event) => { 
    if(event.code === 'Enter') { 
      let userInput = modifyWord();
    
      if(userInput.length > 0) { 
        $('.motherElements').empty();
        apiRequest(userInput);
      }
      else { 
        $('#usrErrorNotification').fadeIn(800);
        setInterval(() => {
          $('#usrErrorNotification').fadeOut(800)
        }, 1600);
      }
    }
  })

  $('#closeMeaningButton').on('click', () => { 
    $('.main').animate({height: '100vh'}, 900);
    $('.meanings').hide();
  })
}