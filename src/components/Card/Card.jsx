import css from './Card.module.css';

export const Card = ({ user, onCardChange }) => {
  const { avatar, followers, tweets, id, active } = user;

  return (
    <article className={css.card}>
      <div className={css.userWrapper}>
        <div className={css.userBlockBorder} />
        <img className={css.userAvatar} src={avatar} alt="user avatar" />
      </div>
      <p className={css.counter}>{tweets} tweets</p>
      <p className={css.counter}>
        {new Intl.NumberFormat('en-En').format(followers)} Followers
      </p>
      <button
        className={`${css.button} ${css[active]}`}
        type="button"
        onClick={() => onCardChange(id)}
      >
        {active === 'active' ? 'Following' : 'Follow'}
      </button>
    </article>
  );
};