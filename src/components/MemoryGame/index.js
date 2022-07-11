import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MemoryCard,
  setCardIndices,
  setCardFaces,
  setCardOrder,
  resetTurnCount,
  setFirstCard,
  setSecondCard,
  incTurnCount,
  setCurrentCards,
  setDisabled
} from 'components';
import { genRanNum, genRanNumArr, wait, zip } from 'helpers';

export const MemoryGame = () => {
  const cards = useSelector(state => state.memoryGame.cards);
  const cardIndices = useSelector(state => state.memoryGame.cardIndices);
  const cardOrder = useSelector(state => state.memoryGame.cardOrder);
  const turnCount = useSelector(state => state.memoryGame.turnCount);
  const firstCard = useSelector(state => state.memoryGame.firstCard);
  const secondCard = useSelector(state => state.memoryGame.secondCard);
  const currentCards = useSelector(state => state.memoryGame.currentCards);
  const cardFaces = useSelector(state => state.memoryGame.cardFaces);
  const dispatch = useDispatch();

  // set board to initial state
  const setBoard = () => {
    // reset state
    dispatch(resetTurnCount());
    dispatch(setFirstCard(null));
    dispatch(setSecondCard(null));
    // randomly generate cards to populate game board
    const index = genRanNum(8);
    dispatch(setCardFaces(index));
    const arr = genRanNumArr(8, cards[index].length);
    arr.push(...arr);
    dispatch(setCardIndices(arr));
    dispatch(setCardOrder(genRanNumArr(16, 16)));
  }

  // reset board to initial state
  const resetBoard = async () => {
    dispatch(setDisabled(true));
    // flip every card to show backs
    document.querySelectorAll('.memory-game__card').forEach(element =>
      element.classList.remove('memory-game__card--flipped'));
    // animation delay 0.5s
    await wait(500);
    setBoard();
    // animation delay 0.5s
    await wait(500);
    dispatch(setDisabled(false));
  };

  // reset state and increment turn count to end turn
  const endTurn = useCallback(() => {
    dispatch(incTurnCount());
    dispatch(setFirstCard(null));
    dispatch(setSecondCard(null));
    dispatch(setDisabled(false));
  }, [dispatch]);

  // check if cards match
  const checkCards = useCallback(async () => {
    // check for valid cards
    if (firstCard && secondCard) {
      dispatch(setDisabled(true))
      // check for matching cards
      if (firstCard.cardFace === secondCard.cardFace && 
          firstCard.cardOrder !== secondCard.cardOrder) {
        // update state to show matching cards
        dispatch(setCurrentCards(currentCards.map(card => {
          // localhost condition for testing
          if (cardFaces[card.index] === firstCard.cardFace ||
              `http://localhost/${cardFaces[card.index]}` === firstCard.cardFace) {
            return {...card, matched: true};
          } else {
            return card;
          }
        })));
        endTurn();
      } else {
        // animation delay 1s
        await wait(1000);
        endTurn();
      }
    }
  }, [
    firstCard,
    secondCard,
    currentCards,
    cardFaces,
    endTurn,
    dispatch
  ]);

  // return h2 with text displaying win message
  const winnerHeading = () => {
    if (document.querySelectorAll('.memory-game__card--flipped').length === 16 && turnCount >= 8) {
      return <h2>You Win!</h2>;
    }
  }

  useEffect(setBoard, [cards, dispatch]);

  useEffect(() => {
    checkCards();
  }, [checkCards]);

  useEffect(() => {
    // combine arrays
    const memoryCards = zip(
      cardIndices,
      cardOrder,
      'index',
      'order'
    );

    dispatch(setCurrentCards(memoryCards.map(card => {
      return {...card, matched: false};
    })));
  }, [cardIndices, cardOrder, dispatch]);

  return (
    <div className="memory-game">
      {winnerHeading()}
      <button
        type="button"
        className="game__button"
        onClick={resetBoard}
      >
        New Game
      </button>
      <div className="memory-game__board">
        {currentCards.map((card, index) => (
          <MemoryCard
            key={index}
            index={card.index}
            order={card.order}
            matched={card.matched}
          />
        ))}
      </div>
      <p className="memory-game__count">{`Turns: ${turnCount}`}</p>
    </div>
  );
}

export * from './memoryGameSlice.js';
