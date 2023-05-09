import { CardList } from "../../components/CardList/CardList";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import css from "./Tweets.module.css";

export default function Tweets () {
  return (
    <>
      <Header>
        <Link className={css.navLink} to="/">
          Back
        </Link>
      </Header>
      <main>
        <CardList />
      </main>
    </>
  );
};