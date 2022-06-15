export const Bar = ({ type = "health", name, value, maxValue}) => {
  return (
    <div className={type}>
      {type === 'health' && <p className={`${type}__text`}>{name}</p>}
      <div className={`${type}__bar-max`}>
        <div
          className={`${type}__bar`}
          style={{ width: `${(value / maxValue) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
