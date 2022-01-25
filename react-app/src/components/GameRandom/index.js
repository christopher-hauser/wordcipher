import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThisGuess } from "../../store/game";
import './style.css'

function GameRandom() {
    const this_word = 'ABOUT'; //FETCH FROM API
    const dispatch = useDispatch();
    let [guessNumber, setGuessNumber] = useState(1);
    const [word, setWord] = useState(this_word);
    const [guess, setGuess] = useState('')
    const [firstLetter, setFirstLetter] = useState('')
    const [secondLetter, setSecondLetter] = useState('')
    const [thirdLetter, setThirdLetter] = useState('')
    const [fourthLetter, setFourthLetter] = useState('')
    const [fifthLetter, setFifthLetter] = useState('')
    const guess1 = useSelector(state => state.game[1]);
    const guess2 = useSelector(state => state.game[2]);
    const guess3 = useSelector(state => state.game[3]);
    const guess4 = useSelector(state => state.game[4]);
    const guess5 = useSelector(state => state.game[5]);
    const guess6 = useSelector(state => state.game[6]);

    const handleChange = e => {
        const setLetter = (fieldGuess, fieldLetter, value) => {
            const letterInput = document.querySelector(`input[name='${(fieldGuess)}-${parseInt(fieldLetter)}']`);
            letterInput.value = value;
        }

        const setNext = (fieldGuess, fieldLetter) => {
            const nextSibling = document.querySelector(
                `input[name='${(fieldGuess)}-${parseInt(fieldLetter) + 1}']`
            );

            if (nextSibling !== null) {
                nextSibling.focus();
            }
        }

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

    const checkLetter = async e => {
        e.preventDefault()
        const { name } = e.target;
        const [guessNo] = name.split("-")[1];
        const guessedWord = { firstLetter, secondLetter, thirdLetter, fourthLetter, fifthLetter }

        const wordSet = await dispatch(setThisGuess(guessNo, guessedWord))

        const firstWordGuess = document.querySelector(
            `form[name='Guess-${parseInt(guessNo)}']`
        );
        console.log(firstWordGuess)

        //GRAB WHAT IS CURRENTLY IN STATE
        if (wordSet) {

            //SET EACH GUESSED LETTER PERMANENTLY IN THAT ROW

            //RESET STATE
            setFirstLetter('');
            setSecondLetter('');
            setThirdLetter('');
            setFourthLetter('');
            setFifthLetter('');
        }

        //SET NEXT ROW TO USE STATE

        setGuessNumber(prevState => prevState + 1);

    }


    const disableForms = guessNumber => {
        const enableDisable = (start, end) => {
            if (letter_guesses) {
                for (let i = newlyDisabledStart; i <= newlyDisabledEnd; i++) {
                    letter_guesses[i].disabled = true;
                }
                for (let i = newlyDisabledEnd + 1; i <= newlyDisabledEnd + 5; i++) {
                    letter_guesses[i].disabled = false;
                }
            }
            return;
        }

        let guessIndex;
        let newlyDisabledStart;
        let newlyDisabledEnd;
        let letter_guesses = document.getElementsByClassName('guess-letter');
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

    useEffect(() => {
        disableForms(guessNumber)
    }, [guessNumber])


    return (
        <>
            <form onSubmit={checkLetter} name='Guess-1' className='guess-word' id='guess-form-1'>
                <input name='1-1' className='guess-letter' id='1-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='1-2' className='guess-letter' id='1-2' onChange={handleChange} type='text' maxLength='1' ></input>
                <input name='1-3' className='guess-letter' id='1-3' onChange={handleChange} type='text' maxLength='1' ></input>
                <input name='1-4' className='guess-letter' id='1-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='1-5' className='guess-letter' id='1-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button name='firstGuessSubmit'>Guess!</button>
            </form>
            <form onSubmit={checkLetter} name='Guess-2' className='guess-word' id='guess-form-2'>
                <input name='2-1' className='guess-letter' id='2-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-2' className='guess-letter' id='2-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-3' className='guess-letter' id='2-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-4' className='guess-letter' id='2-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='2-5' className='guess-letter' id='2-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button>Guess!</button>
            </form>
            <form onSubmit={checkLetter} name='Guess-3' className='guess-word' id='guess-form-3'>
                <input name='3-1' className='guess-letter' id='3-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-2' className='guess-letter' id='3-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-3' className='guess-letter' id='3-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-4' className='guess-letter' id='3-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='3-5' className='guess-letter' id='3-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button>Guess!</button>
            </form>
            <form onSubmit={checkLetter} name='Guess-4' className='guess-word' id='guess-form-4'>
                <input name='4-1' className='guess-letter' id='4-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-2' className='guess-letter' id='4-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-3' className='guess-letter' id='4-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-4' className='guess-letter' id='4-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='4-5' className='guess-letter' id='4-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button>Guess!</button>
            </form>
            <form onSubmit={checkLetter} name='Guess-5' className='guess-word' id='guess-form-5'>
                <input name='5-1' className='guess-letter' id='5-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-2' className='guess-letter' id='5-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-3' className='guess-letter' id='5-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-4' className='guess-letter' id='5-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='5-5' className='guess-letter' id='5-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button>Guess!</button>
            </form>
            <form onSubmit={checkLetter} name='Guess-6' className='guess-word' id='guess-form-6'>
                <input name='6-1' className='guess-letter' id='6-1' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-2' className='guess-letter' id='6-2' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-3' className='guess-letter' id='6-3' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-4' className='guess-letter' id='6-4' onChange={handleChange} type='text' maxLength='1'></input>
                <input name='6-5' className='guess-letter' id='6-5' onChange={handleChange} type='text' maxLength='1'></input>
                <button>Guess!</button>
            </form>
        </>
    )
}

export default GameRandom
