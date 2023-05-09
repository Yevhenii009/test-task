import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import css from './Home.module.css';

export default function Home() {
  return (
    <>
      <Header>
        <Link className={css.navLink} to="/tweets">
          Tweets
        </Link>
      </Header>
      <main>
        <h1 className={css.title}>Welcome to your Twitter!</h1>
      </main>
    </>
  );
}