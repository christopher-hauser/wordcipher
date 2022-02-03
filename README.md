# wordcipher

<img src="https://user-images.githubusercontent.com/85594249/152443604-c7098ef7-2653-4ca3-96aa-151afe8d78d4.JPG" alt="wordcipher-demo-image"/>

## Summary
Wordcipher is a word-guessing game based on the popular word game, Wordle. However, Worcipher allows for some additional functionality that the original Wordle does not. Users are able to do the following:
- Create an account
- Log in and log out
- Play Wordcipher with any randomly generated five-letter word from WordsAPI
- Send, receive, accept, and decline friend requests from other users
- View their own stats (win/loss ratio, points accumulated through playing, number of games played) or the stats of users they have become friends with
- Send challenge words to users that they are friends with
- Edit and delete sent challenges that have not yet been played by the recipient
- Play Wordcipher with a challenge word that has been sent to them by a friend
- Create lists of words for any user to play from
- Edit and delete lists that they have created
- Add and remove words to a list that they have created
- Play Wordcipher with a random word from a user-generated list

## How to Use
To use Wordcipher, navigate to https://wordcipher.herokuapp.com/. From there, you can login as a demo user or create a new account to sign in. It's as easy as that! Once you are logged in, you can play the game as much as you'd like, friend other users, create lists of words to play from, and send challenges to friends.

## How to Play Wordcipher
In Wordcipher, you are tasked with figuring out the word that has been provided to you. The word will always be five letters long and belong in the English dictionary. You will not be given a proper noun (i.e. names, places, etc.)

You have 6 guesses to get the word correct. After you submit each guess, the letters in your answer will light up a certain color to indicate your accuracy. If a letter turns yellow, it is in the word, but not in the spot you had it. If a letter turns green, it is in the word and in the right spot! If a letter turns gray, it isn't in the word at all.

Good luck and have fun guessing!

![Alt Text](https://giphy.com/embed/2w5tlgZdcEjkJvGHxc)

## Overall Structure
### Back End
Wordcipher was built using Python, the web framework Flask, and a PostgreSQL database. Data requests are fulfilled with JSON API and use RESTful routes across the entire project. The words that are generated randomly come from WordsAPI. Words input by the user also make fetch requests to WordsAPI to check if the word has a definition in the dictionary, and therefore is valid.

### Front End
Wordcipher's front end is built with React.js and JavaScript. React allows for the site to quickly and dynamically render information. The game itself, however, relies more heavily on DOM manipulation than React.js/Redux to render in an intuitive and game-like way.

## Technologies Used
- React.js
- Redux
- PostgreSQL
- Flask
- WTForms
- JavaScript
- Python
- JSON API
- WordsAPI
- Heroku

## Technical Implementation
Wordcipher's CRUD functionality is made seamless and dynamic through the use of React.js/Redux. These technologies allow for information to be both stored and received in a moment that feels instantaneous. For example, when a user selects a friend on the friends list page, that friend is added to state where the information can easily be pulled from and rendered.

React makes much of the friend/list functionality possible, but the game itself relies heavily on JavaScript, basic HTML forms, and DOM manipulation. Each time a guess is submitted by a user, JavaScript functions manipulate the way letters are stored and checked, as opposed to React state. If React's useState were implemented, it would mean that there would have to be a specific state and setState assigned to every single letter input (i.e. guess1letter1, guess1letter2, ... guess2letter1...), whereas DOM manipulation and intuitive id/class naming allows for the implementation of functions that do all the work without all the repitition.

Additionally, JavaScript and DOM manipulation are necessary for the enabling and disabling of forms, inputs, and submits, which make the game feel more fluid. This way, a user isn't able to enter their "second" or "third" guess when they have yet to submit their first. These technologies are also used to listen for keypresses (i.e. backspace and left/right arrow keys), helping to create a more seamless and intuitive experience overall.


