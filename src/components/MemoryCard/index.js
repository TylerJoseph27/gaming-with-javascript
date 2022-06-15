import { useSelector, useDispatch } from 'react-redux';
import { setFirstCard, setSecondCard } from 'components';
import { crate } from 'assets';

export const MemoryCard = ({ index, order, matched }) => {
  const cardFaces = useSelector(state => state.memoryGame.cardFaces);
  const firstCard = useSelector(state => state.memoryGame.firstCard);
  const secondCard = useSelector(state => state.memoryGame.secondCard);
  const disabled = useSelector(state => state.memoryGame.disabled);
  const dispatch = useDispatch();

  // handle click event and change state
  const handleClick = ({ target }) => {
    if (!disabled) {
      const currentCard = {
        cardFace: target.previousSibling.src,
        cardOrder: order
      };
      firstCard ? dispatch(setSecondCard(currentCard)) : dispatch(setFirstCard(currentCard));
    }
  };

  let flipped = false;

  if (firstCard && !secondCard) {
    flipped = order === firstCard.cardOrder;
  } else if (firstCard && secondCard) {
    flipped = order === firstCard.cardOrder || order === secondCard.cardOrder;
  }

  return (
    <div
      className={'memory-game__card' + (flipped || matched ? ' memory-game__card--flipped' : '')}
      style={{ order: order }}
    >      
      <img
        className="memory-game__card-front pixel-art"
        src={cardFaces[index]}
        alt={`Front of card ${order + 1}`}
      />
      <img
        className="memory-game__card-back pixel-art"
        src={crate}
        alt={`Back of card ${order + 1}`}
        onClick={handleClick}
      />
    </div>
  );
}
