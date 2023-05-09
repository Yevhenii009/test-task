import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner';
import { Card } from '../Card/Card';
import css from './CardList.module.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const CardList = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState('all');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.baseURL = 'https://645a5a0565bd868e93188c7a.mockapi.io/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/users');

        let activeUsersIdArray =
          JSON.parse(localStorage.getItem('activeUsersIdArray')) ?? [];
        const usersChacked = response.data?.map(user => {
          if (activeUsersIdArray.includes(user.id)) {
            return { ...user, followers: user.followers + 1, active: 'active' };
          }
          return user;
        });

        setUsers(usersChacked);
      } catch (error) {
        console.log(error.message);
        toast.error('Request error.');
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onCardChange = id => {
    try {
      let activeUsersIdArray =
        JSON.parse(localStorage.getItem('activeUsersIdArray')) ?? [];
      if (activeUsersIdArray.includes(id)) {
        activeUsersIdArray = activeUsersIdArray.filter(userId => userId !== id);
      } else {
        activeUsersIdArray.push(id);
      }
      localStorage.setItem(
        'activeUsersIdArray',
        JSON.stringify(activeUsersIdArray)
      );

      const correctedUsersArray = users.map(user => {
        if (user.id === id) {
          return user.active
            ? { ...user, followers: user.followers - 1, active: '' }
            : { ...user, followers: user.followers + 1, active: 'active' };
        }
        return user;
      });

      setUsers(correctedUsersArray);
    } catch (error) {
      console.log(error.message);
      toast.error('Request error.');
    }
  };
  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleDropdown = value => {
    setPage(1);
    setShowUsers(value.value);
  };
  const filteredUsers = useMemo(() => {
    switch (showUsers) {
      case 'follow':
        return users.filter(user => !user.active);
      case 'followings':
        return users.filter(user => user.active);
      default:
        return users;
    }
  }, [showUsers, users]);
  const options = [
    { value: 'all', label: 'Show all' },
    { value: 'follow', label: 'Show follow' },
    { value: 'followings', label: 'Show followings' },
  ];

  return (
    <>
      <Dropdown
        placeholderClassName={css.placeholderClassName}
        className={css.className}
        controlClassName={css.controlClassName}
        menuClassName={css.menuClassName}
        options={options}
        onChange={handleDropdown}
        value={showUsers}
        placeholder="Show Tweets"
      />
      <div className={css.spiner}>
        {isLoading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#5cd3a8'
            barColor = '#5736a3'
/>
        )}
      </div>
      <ul className={css.cardList}>
        {filteredUsers.length > 0 &&
          filteredUsers.slice(0, page * 3).map(user => (
            <li key={user.id}>
              <Card user={user} onCardChange={onCardChange} />
            </li>
          ))}
      </ul>
      {page * 3 < filteredUsers.length && (
        <button
          className={css.loadMoreButton}
          onClick={onLoadMoreClick}
          type="button"
        >
          Load More
        </button>
      )}
    </>
  );
};