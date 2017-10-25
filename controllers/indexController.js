let fs = require('fs')

function initializeGame(req, res, next) {
    console.log("***** ***** ***** ***** *****")
    console.log("***** game initialized *****")
    console.log("***** ***** ***** ***** *****")
    console.log("")

    let words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")
    let numberOfWords = words.length
    let selectedWordIndex = Math.floor((Math.random() * numberOfWords) + 1)

    req.session.wordToGuess = words[selectedWordIndex]
    req.session.lettersGuessed = []
    req.session.correctLetters = []
    req.session.incorrectLetters = []
    req.session.gameInitialized = true
    req.session.incorrectGuesses = 0
    req.session.correctGuesses = 0
    req.session.continueGame = true

    req.session.wordDisplay = []

    let wordArr = req.session.wordToGuess.split("")

    wordArr.forEach((letter) =>{
        req.session.wordDisplay.push("_")
    })



    console.log(req.session)
    console.log("")
    console.log("<<<<< <<<<< redirect")
    res.redirect("/")

}


function startGame(req, res, next) {
    console.log("")
    console.log("*start game*")

    let gameData = {}
    gameData.wordToGuess = req.session.wordToGuess
    gameData.lettersGuessed = req.session.lettersGuessed

    gameData.incorrectGuesses = req.session.incorrectGuesses
    gameData.correctGuesses = req.session.correctGuesses

    gameData.correctLetters = req.session.correctLetters
    gameData.incorrectLetters = req.session.incorrectLetters

    gameData.wordDisplay = req.session.wordDisplay

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let alphabetDisplay = []
    alphabet.forEach((character) => {
        if(gameData.correctLetters.indexOf(character.toLowerCase()) != -1) {
            alphabetDisplay.push({"letter": character, "color": "lime"})
        } else if(gameData.incorrectLetters.indexOf(character.toLowerCase()) != -1) {
            alphabetDisplay.push({"letter": character, "color": "red"})
        } else {
            alphabetDisplay.push({"letter": character, "color": "#CCCCCC"})
        }
        
    })

    gameData.alphabetDisplay = alphabetDisplay

    if(gameData.incorrectGuesses >= 8) {
        res.render("lose")

    } else {
        console.log("gameData-- " + gameData)
        console.log("")
        console.log("<<<<< <<<<< rending index")
        res.render("index", gameData)

    }

}

function checkIfLetterIsCorrect(req, res, next) {
    console.log("")
    console.log("///// ///// ----checkIfLetterIsCorrect()----")

    // create an array with each of the letters
    // from the word trying to be guessed
    let correctLetters = req.session.wordToGuess.split("")
    let guessedCorrectly = false

    // check if the letter guessed matches any of the letters
    // in the word
    correctLetters.forEach((correctLetter, idx) => {
        if(correctLetter === req.body.letterGuessed.toLowerCase()) {
            guessedCorrectly = true
            req.session.wordDisplay[idx] = req.body.letterGuessed.toUpperCase()

        }

    })
    console.log(`##### ##### guessed correctly ${guessedCorrectly} ##### guessed correctly ${guessedCorrectly} ##### #####`)
    console.log("")
    // console.log("--wordDisplay--")
    // console.log(req.session.wordDisplay)

    // if the letter matched then check for win condition
    // or render index with updated information

    // win
    if(guessedCorrectly) {
        console.log(`updating letters guessed corretly: ${req.session.correctLetters}`)
        req.session.correctLetters.push(req.body.letterGuessed)
        console.log(`updated: ${req.session.correctLetters}`)

        console.log(`updating correctGuesses: ${req.session.correctGuesses}`)
        req.session.correctGuesses += 1
        console.log(`updated: ${req.session.correctGuesses}`)
        console.log("")

        let numberOfBlankCharacters = 0

        req.session.wordDisplay.forEach((character) => {
            if(character === "_") {numberOfBlankCharacters++}
        })

        console.log("? checking if win condition met ?")
        console.log(`numberOfBlankCharacters: ${numberOfBlankCharacters}`)
        console.log("")

        if(numberOfBlankCharacters === 0) {
            console.log("win condition met")
            console.log(`updating continueGame: ${req.session.continueGame}`)
            req.session.continueGame = false
            console.log(`updated: ${req.session.continueGame}`)
            console.log("")
            console.log("--session data--")
            console.log(req.session)
            console.log("")

            let gameData = {}
            gameData.wordToGuess = req.session.wordToGuess
            gameData.lettersGuessed = req.session.lettersGuessed

            gameData.incorrectGuesses = req.session.incorrectGuesses
            gameData.correctGuesses = req.session.correctGuesses

            gameData.correctLetters = req.session.correctLetters
            gameData.incorrectLetters = req.session.incorrectLetters

            gameData.wordDisplay = req.session.wordDisplay

            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            let alphabetDisplay = []
            alphabet.forEach((character) => {
                if(gameData.correctLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "lime"})
                } else if(gameData.incorrectLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "red"})
                } else {
                    alphabetDisplay.push({"letter": character, "color": "#CCCCCC"})
                }
                
            })

            gameData.alphabetDisplay = alphabetDisplay

            console.log("<<<<< <<<<< rendering win")
            res.render("win", gameData)

          // correct letter but not a win
        } else {
            console.log("correct letter but not a win")
            let gameData = {}
            gameData.wordToGuess = req.session.wordToGuess
            gameData.lettersGuessed = req.session.lettersGuessed

            gameData.incorrectGuesses = req.session.incorrectGuesses
            gameData.correctGuesses = req.session.correctGuesses

            gameData.correctLetters = req.session.correctLetters
            gameData.incorrectLetters = req.session.incorrectLetters

            gameData.wordDisplay = req.session.wordDisplay

            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            let alphabetDisplay = []
            alphabet.forEach((character) => {
                if(gameData.correctLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "lime"})
                } else if(gameData.incorrectLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "red"})
                } else {
                    alphabetDisplay.push({"letter": character, "color": "#CCCCCC"})
                }
                
            })

            gameData.alphabetDisplay = alphabetDisplay

            console.log("")
            console.log("--session data--")
            console.log(req.session)
            console.log("")
            console.log("<<<<< <<<<< rendering index")
            res.render("index", gameData)

        }
      // if letter was incorrect then check for losing condition
      // or render index with updated information

      // incorrect guess
    } else {
        console.log(`updating letters guessed incorretly: ${req.session.incorrectLetters}`)
        req.session.incorrectLetters.push(req.body.letterGuessed)
        console.log(`updated: ${req.session.incorrectLetters}`)

        console.log(`updating incorrectGuesses: ${req.session.incorrectGuesses}`)
        req.session.incorrectGuesses += 1
        console.log(`updated: ${req.session.incorrectGuesses}`)
        console.log("")

        console.log("? checking if lose condition met ?")
        console.log(`incorrectGuesses: ${req.session.incorrectGuesses}`)
        console.log("")

        if(req.session.incorrectGuesses >= 8) {
            console.log("lose condition met")
            console.log(`updating continueGame: ${req.session.continueGame}`)
            req.session.continueGame = false
            console.log(`updated: ${req.session.continueGame}`)
            console.log("")
            console.log("--session data--")
            console.log(req.session)
            console.log("")

            let gameData = {}
            gameData.wordToGuess = req.session.wordToGuess
            gameData.lettersGuessed = req.session.lettersGuessed

            gameData.incorrectGuesses = req.session.incorrectGuesses
            gameData.correctGuesses = req.session.correctGuesses

            gameData.correctLetters = req.session.correctLetters
            gameData.incorrectLetters = req.session.incorrectLetters

            gameData.wordDisplay = req.session.wordToGuess.split("")

            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            let alphabetDisplay = []
            alphabet.forEach((character) => {
                if(gameData.correctLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "lime"})
                } else if(gameData.incorrectLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "red"})
                } else {
                    alphabetDisplay.push({"letter": character, "color": "#CCCCCC"})
                }
                
            })

            gameData.alphabetDisplay = alphabetDisplay

            console.log("<<<<< <<<<< rendering lose")
            res.render("lose", gameData)

          // incorrect letter but no lose
        } else {
            console.log("incorrect letter but not a lose")
            let gameData = {}
            gameData.wordToGuess = req.session.wordToGuess
            gameData.lettersGuessed = req.session.lettersGuessed

            gameData.incorrectGuesses = req.session.incorrectGuesses
            gameData.correctGuesses = req.session.correctGuesses

            gameData.correctLetters = req.session.correctLetters
            gameData.incorrectLetters = req.session.incorrectLetters

            gameData.wordDisplay = req.session.wordDisplay

            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            let alphabetDisplay = []
            alphabet.forEach((character) => {
                if(gameData.correctLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "lime"})
                } else if(gameData.incorrectLetters.indexOf(character.toLowerCase()) != -1) {
                    alphabetDisplay.push({"letter": character, "color": "red"})
                } else {
                    alphabetDisplay.push({"letter": character, "color": "#CCCCCC"})
                }
                
            })

            gameData.alphabetDisplay = alphabetDisplay

            
            console.log("")
            console.log("--session data--")
            console.log(req.session)
            console.log("")
            console.log("<<<<< <<<<< rendering index")
            res.render("index", gameData)

        }

    }

}

// when first visiting check to see if a game has been initialized
// and that a win or lose condition has not been met - continueGame
exports.index = function(req, res, next) {
    // present session information if game has been initialized and
    // win or lose condition not met
    console.log("")
    console.log(">>>>> >>>>> index get request")
    if(req.session.gameInitialized && req.session.continueGame){
        startGame(req, res, next)
    } else {
        // if game has not been initialized or if win or lose
        // conition has been met, then initialize a new game
        initializeGame(req, res, next)
        
    }

}


exports.nextRound = function(req, res, next) {
    console.log("")
    console.log("##### ##### ##### ##### ##### ##### ##### ##### ##### #####")
    console.log(">>>>> >>>>> index post request")
    console.log("body:")
    console.log(req.body)
    console.log ("///// ///// nextRound()")
    console.log("##### ##### ##### ##### ##### ##### ##### ##### ##### #####")
    console.log("")
    console.log("--session data--")
    console.log(req.session)
    console.log("")

    req.checkBody("letterGuessed", "Letter previously selected.").notPreviouslyGuessed(req.session.lettersGuessed)
    req.checkBody("letterGuessed", "Please select one letter.").len(1,1)

    let errors = req.validationErrors()
    // if letter has been guessed previously    
    // render index


    if(errors) {
        let gameData = {}
        gameData.wordToGuess = req.session.wordToGuess
        gameData.lettersGuessed = req.session.lettersGuessed

        gameData.incorrectGuesses = req.session.incorrectGuesses
        gameData.correctGuesses = req.session.correctGuesses

        gameData.correctLetters = req.session.correctLetters
        gameData.incorrectLetters = req.session.incorrectLetters

        gameData.wordDisplay = req.session.wordDisplay

        gameData.errors = req.validationErrors()

        req.session.letterHasBeenGuessed = true


        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        let alphabetDisplay = []
        alphabet.forEach((character) => {
            if(gameData.correctLetters.indexOf(character.toLowerCase()) != -1) {
                alphabetDisplay.push({"letter": character, "color": "lime"})
            } else if(gameData.incorrectLetters.indexOf(character.toLowerCase()) != -1) {
                alphabetDisplay.push({"letter": character, "color": "red"})
            } else {
                alphabetDisplay.push({"letter": character, "color": "#CCCCCC"})
            }
            
        })

        gameData.alphabetDisplay = alphabetDisplay


        console.log("letter has been guessed rendering index")
        res.render("index", gameData)

      // if letter has not been guessed then add the letter
      // to the letters gussed array and check if the letter
      // is correct
    } else {
        console.log("letter has not been guessed, adding to letters guessed")
        console.log(`adding ${req.body.letterGuessed} to ${req.session.lettersGuessed}`)
        req.session.lettersGuessed.push(req.body.letterGuessed)
        console.log("############### added letter to lettersGuessed #################")
        console.log(`${req.body.letterGuessed} added to ${req.session.lettersGuessed}`)
        
        checkIfLetterIsCorrect(req, res, next)

    }
    
    

}

