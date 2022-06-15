export const Button = ({ label, callback }) => {
  return (
    <button
      type="button"
      className="game__button"
      onClick={callback}
    >
      {label}
    </button>
  );
}