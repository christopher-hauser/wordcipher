import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WinPopup from "../WinPopup";
import { Modal } from '../../context/Modal'
import './style.css'
import LosePopup from "../LosePopup";

function GameRandom() {
    const [this_word, setThis_word] = useState('');
    const location = useLocation();
    const [guessNumber, setGuessNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showLoseModal, setShowLoseModal] = useState(false);
    const [points, setPoints] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const user = useSelector(state => state.session.user);


    const getRandomWord = async () => {
        const data = await fetch("https://wordsapiv1.p.rapidapi.com/words/?" + new URLSearchParams({
            letters: 5,
            random: true,
            partOfSpeech: "adjective"
        }), {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "ae0e954da5msh9667458788d83f1p140318jsn677fc8a6e57c"
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.error(err);
            });
        return data.word.toUpperCase();
    }


    const handleChange = e => {
        // handleChange helper functions
        const setLetter = (fieldGuess, fieldLetter, value) => {
            const letterInput = document.querySelector(`input[name='${(fieldGuess)}-${parseInt(fieldLetter)}']`);
            letterInput.value = value.toUpperCase();
        }

        const setNext = (fieldGuess, fieldLetter) => {
            const nextSibling = document.querySelector(
                `input[name='${(fieldGuess)}-${parseInt(fieldLetter) + 1}']`
            );

            if (nextSibling !== null) {
                nextSibling.focus();
            }
        }

        const addAllBackspaceEvents = () => {
            // GRAB ALL LETTER INPUTS
            let letter_guesses = document.getElementsByClassName('guess-letter');

            // ADD EVENT LISTENERS TO EVERY LETTER INPUT
            for (let i = 0; i < letter_guesses.length; i++) {
                letter_guesses[i].addEventListener("keydown", function (e) {
                    const { name } = e.target;
                    const [fieldGuess, fieldLetter] = name.split("-");
                    const thisLetter = document.querySelector(
                        `input[name='${(fieldGuess)}-${parseInt(fieldLetter)}']`
                    );
                    const nextSibling = document.querySelector(
                        `input[name='${(fieldGuess)}-${parseInt(fieldLetter) + 1}']`
                    );
                    const prevSibling = document.querySelector(
                        `input[name='${(fieldGuess)}-${parseInt(fieldLetter) - 1}']`
                    );

                    //LEFT/RIGHT ARROWS
                    if (e.key === "ArrowLeft") {
                        if (fieldLetter > 1) {
                            prevSibling.focus();
                        }
                    }

                    if (e.key === "ArrowRight") {
                        if (fieldLetter < 5) {
                            nextSibling.focus();
                        }
                    }

                    // BACKSPACE/DELETE
                    if (fieldLetter > 1) {
                        if (thisLetter.value) {
                            if (e.key === "Backspace" || e.key === "Delete") {
                                thisLetter.value = '_';
                                thisLetter.focus();
                                return;
                            }
                        } else {
                            if (e.key === "Backspace" || e.key === "Delete") {
                                prevSibling.focus();
                                return;
                            }
                        }
                    } else if (fieldLetter == 1) {
                        if (e.key === "Backspace" || e.key === "Delete") {
                            if (thisLetter.value) {
                                thisLetter.value = '_';
                                thisLetter.focus();
                                return;
                            }
                        }
                    }
                })
            }
        }

        addAllBackspaceEvents();

        //handleChange function

        const { value, name } = e.target;
        const [fieldGuess, fieldLetter] = name.split("-");

        if (value.length === 0) {
            setLetter(fieldGuess, fieldLetter, '')
        }

        if (value.length >= 1) {
            setLetter(fieldGuess, fieldLetter, value)
            setNext(fieldGuess, fieldLetter)
        }
    }

    const checkLetter = (letterPosition, actual_word, guessNumber) => {
        const letterBlock = document.querySelector(`input[name='${guessNumber}-${letterPosition}']`)
        const thisSubmitButton = document.querySelector(`button[name='submit-${guessNumber}']`)
        const nextSubmitButton = document.querySelector(`button[name='submit-${parseInt(guessNumber) + 1}']`)
        const value = letterBlock.value;
        if (value === actual_word[parseInt(letterPosition) - 1]) {
            letterBlock.classList.add('green');
        } else if (actual_word.includes(value) && value !== actual_word[parseInt(letterPosition) - 1]) {
            letterBlock.classList.add('yellow');
        } else {
            letterBlock.classList.add('gray');
        }
        letterBlock.disabled = true;
        thisSubmitButton.className = 'disabled-button'
        if (nextSubmitButton) {
            nextSubmitButton.className = 'active-guess-button'
        }
        return value;
    }

    const sendGameData = async (completedGame) => {
        const res = await fetch(`/api/completed_games/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(completedGame)
        })
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    }


    const checkWin = async (guessed_word, actual_word, attemptNo) => {
        // IF WIN
        const userId = user.id;
        const word = actual_word;
        const attempts = attemptNo;
        let challengerId;
        if (location.state) {
            if (location.state.challengerId) {
                challengerId = location.state.challengerId;
            } else {
                challengerId = null;
            }
        }

        console.log(challengerId);

        if (guessed_word === actual_word) {
            // AWARD POINTS AND SET MODAL
            const pointsAwarded = (6 / parseInt(attemptNo) * 150)
            setAttempts(attemptNo);
            setPoints(pointsAwarded);
            setShowModal(true);

            const win = true;

            const completedGame = {
                userId,
                challengerId: challengerId,
                word,
                attempts,
                win,
                pointsAwarded
            }

            await sendGameData(completedGame)

            //DISABLE REMAINING INPUTS AND BUTTONS
            let letter_guesses = document.getElementsByClassName('guess-letter');
            for (let i = 0; i < letter_guesses.length; i++) {
                letter_guesses[i].disabled = true;
            }
            if (attemptNo < 6) {
                document.querySelector(`button[name='submit-${parseInt(attemptNo) + 1}']`).className = 'disabled-button';
            }
        }

        // IF LOSE
        if (guessed_word !== actual_word && attemptNo == 6) {
            setShowLoseModal(true);

            const win = false;
            const pointsAwarded = 0

            const completedGame = {
                userId,
                challengerId,
                word,
                attempts,
                win,
                pointsAwarded
            }

            await sendGameData(completedGame)
        }
    }


    const submitGuess = async e => {
        e.preventDefault();
        const { name } = e.target;
        const [guessNo] = name.split("-")[1];
        const firstLetter = document.querySelector(`input[name='${guessNumber}-1']`).value;
        const secondLetter = document.querySelector(`input[name='${guessNumber}-2']`).value;
        const thirdLetter = document.querySelector(`input[name='${guessNumber}-3']`).value;
        const fourthLetter = document.querySelector(`input[name='${guessNumber}-4']`).value;
        const fifthLetter = document.querySelector(`input[name='${guessNumber}-5']`).value;

        // const animateFakeWord = () => {
        //     console.log('animate')
        //     let id = null;
        //     const el = document.getElementById(`guess-form-${guessNo}`);
        //     el.style.position = 'relative';
        //     let posH = 0;
        //     let posV = 0;
        //     clearInterval(id);
        //     id = setInterval(frame, 2);
        //     function frame() {
        //         let begun = false;
        //         if (posH == 0 && posV == 0 && begun == false) {
        //             console.log('1', posH, posV)
        //             posH -= 2;
        //             posV--;
        //             el.style.top = posV + "px"
        //             el.style.right = posH + "px"
        //         } else if ((posH >= -40 &&  posH < 0) && (posV >= -20  && posV < 0)) {
        //             console.log('2', posH, posV)
        //             posH += 2;
        //             posV++;
        //             el.style.top = posV + "px"
        //             el.style.right = posH + "px"
        //             if (posH == 0 && posV == 0) {
        //                 begun = true;
        //             }
        //         } else if ((posH <= 40 && posH > 0) && (posV <= 20 && posV > 0)) {
        //             console.log('3', posH, posV)
        //             posH -= 2;
        //             posV--;
        //             el.style.top = posV + "px"
        //             el.style.right = posH + "px"
        //             if (posH == 0 && posV == 0) {
        //                 clearInterval(id);
        //             }
        //         }
        //     }
        // }

        // CHECK IF ANY LETTERS ARE EMPTY AND PREVENT SUBMIT
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
        const guessed_word = firstLetter + secondLetter + thirdLetter + fourthLetter + fifthLetter;
        if (!firstLetter || !secondLetter || !thirdLetter || !fourthLetter || !fifthLetter) return;
        if (!alpha.includes(firstLetter) || !alpha.includes(secondLetter) || !alpha.includes(thirdLetter) || !alpha.includes(fourthLetter) || !alpha.includes(fifthLetter)) return;
        const is_word = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${guessed_word}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "ae0e954da5msh9667458788d83f1p140318jsn677fc8a6e57c"
            }
        }).then(response => {
            return response.ok;
        }).catch(err => {
            console.error(err);
        });
        if (!is_word) {
            // animateFakeWord();
            return;
        }

        // CHECK EACH LETTER AND SET CLASS APPROPRIATELY
        checkLetter(1, this_word, guessNo);

        setTimeout(() => {
            checkLetter(2, this_word, guessNo);
        }, 300)

        setTimeout(() => {
            checkLetter(3, this_word, guessNo);
        }, 600)

        setTimeout(() => {
            checkLetter(4, this_word, guessNo);
        }, 900)

        setTimeout(() => {
            checkLetter(5, this_word, guessNo);
        }, 1200);

        // CHECK TO SEE IF THE USER WON

        setTimeout(() => {
            checkWin(guessed_word, this_word, guessNo);
        }, 1500);

        // SET GUESS NUMBER FOR DISABLE FUNCTION
        setGuessNumber(prevState => prevState + 1);
    }


    const disableForms = guessNumber => {
        let guessIndex;
        let newlyDisabledStart;
        let newlyDisabledEnd;
        let letter_guesses = document.getElementsByClassName('guess-letter');

        // ENABLE/DISABLE HELPER FUNCTION
        const enableDisable = (start, end) => {
            if (letter_guesses) {
                for (let i = end + 1; i <= end + 5; i++) {
                    letter_guesses[i].disabled = false;
                }
                letter_guesses[end + 1].focus();
            }
            return;
        }

        // DISABLE FORMS BASED ON WHICH ROW YOU ARE ON

        if (guessNumber === 1) {
            guessIndex = 5;
            if (letter_guesses) {
                for (let i = guessIndex; i < letter_guesses.length; i++) {
                    letter_guesses[i].disabled = true;
                }
            }
        }

        if (guessNumber === 2) {
            newlyDisabledStart = 0;
            newlyDisabledEnd = 4;
            enableDisable(newlyDisabledStart, newlyDisabledEnd);
        }

        if (guessNumber === 3) {
            newlyDisabledStart = 5;
            newlyDisabledEnd = 9;
            enableDisable(newlyDisabledStart, newlyDisabledEnd);
        }

        if (guessNumber === 4) {
            newlyDisabledStart = 10;
            newlyDisabledEnd = 14;
            enableDisable(newlyDisabledStart, newlyDisabledEnd);
        }

        if (guessNumber === 5) {
            newlyDisabledStart = 15;
            newlyDisabledEnd = 19;
            enableDisable(newlyDisabledStart, newlyDisabledEnd);
        }

        if (guessNumber === 6) {
            newlyDisabledStart = 20;
            newlyDisabledEnd = 24;
            enableDisable(newlyDisabledStart, newlyDisabledEnd);
        }
    }

    // CHECK ROW EVERY SUBMIT

    useEffect(() => {
        disableForms(guessNumber)
    }, [guessNumber])

    useEffect(async () => {
        if (location.state && Object.entries(location.state).length > 0) {
            const word = location.state.word.toUpperCase();
            setThis_word(word);
        } else {
            const data = await getRandomWord();
            setThis_word(data);
        }
    }, [])


    return (
        <>
            <form onSubmit={submitGuess} name='Guess-1' className='guess-word' id='guess-form-1'>
                <div className="guess-letter-container">
                    <input name='1-1' className='guess-letter' id='1-1' onChange={handleChange} type='text' maxLength='1'></input>
                    <input name='1-2' className='guess-letter' id='1-2' onChange={handleChange} type='text' maxLength='1' ></input>
                    <input name='1-3' className='guess-letter' id='1-3' onChange={handleChange} type='text' maxLength='1' ></input>
                    <input name='1-4' className='guess-letter' id='1-4' onChange={handleChange} type='text' maxLength='1'></input>
                    <input name='1-5' className='guess-letter' id='1-5' onChange={handleChange} type='text' maxLength='1'></input>
                </div>
                <div className='guess-button-container'>
                    <button className='active-guess-button' name='submit-1'>Guess!</button>
                </div>
            </form>
            <form onSubmit={submitGuess} name='Guess-2' className='guess-word' id='guess-form-2'>
                <input name='2-1' className='guess-letter' id='2-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-2' className='guess-letter' id='2-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-3' className='guess-letter' id='2-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-4' className='guess-letter' id='2-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-5' className='guess-letter' id='2-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button className="disabled-button" name='submit-2'>Guess!</button>
            </form>
            <form onSubmit={submitGuess} name='Guess-3' className='guess-word' id='guess-form-3'>
                <input name='3-1' className='guess-letter' id='3-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-2' className='guess-letter' id='3-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-3' className='guess-letter' id='3-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-4' className='guess-letter' id='3-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-5' className='guess-letter' id='3-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button className="disabled-button" name='submit-3'>Guess!</button>
            </form>
            <form onSubmit={submitGuess} name='Guess-4' className='guess-word' id='guess-form-4'>
                <input name='4-1' className='guess-letter' id='4-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-2' className='guess-letter' id='4-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-3' className='guess-letter' id='4-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-4' className='guess-letter' id='4-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-5' className='guess-letter' id='4-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button className="disabled-button" name='submit-4'>Guess!</button>
            </form>
            <form onSubmit={submitGuess} name='Guess-5' className='guess-word' id='guess-form-5'>
                <input name='5-1' className='guess-letter' id='5-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-2' className='guess-letter' id='5-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-3' className='guess-letter' id='5-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-4' className='guess-letter' id='5-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-5' className='guess-letter' id='5-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button className="disabled-button" name='submit-5'>Guess!</button>
            </form>
            <form onSubmit={submitGuess} name='Guess-6' className='guess-word' id='guess-form-6'>
                <input name='6-1' className='guess-letter' id='6-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-2' className='guess-letter' id='6-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-3' className='guess-letter' id='6-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-4' className='guess-letter' id='6-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-5' className='guess-letter' id='6-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button className="disabled-button" name='submit-6'>Guess!</button>
            </form>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <WinPopup points={points} attempts={attempts} />
                </Modal>
            )}
            {showLoseModal && (
                <Modal onClose={() => setShowLoseModal(false)}>
                    <LosePopup word={this_word} />
                </Modal>
            )}
        </>
    )
}

export default GameRandom
