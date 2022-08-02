import { NavLink, useSearchParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import logo from '../../assets/icon-search.png';
import useHttp from '../../hooks/use-http';
import { getFoodCategories } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  const {
    sendRequest,
    status,
    data: loadedFoodCategories,
    error,
  } = useHttp(getFoodCategories, true);

  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ foodName: searchInput });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  const onSearchChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const foodCategories = loadedFoodCategories
    ? loadedFoodCategories.map((category) => {
        return (
          <li key={category.id}>
            <NavLink
              to={`/food/${category.id}`}
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              {category.name}
            </NavLink>
          </li>
        );
      })
    : [];

  return (
    <>
      <div className={classes.inputContainer}>
        <img className={classes.icon} src={logo} alt='search' />
        <input
          type='text'
          className={classes.searchInput}
          placeholder='Enter food name...'
          onChange={onSearchChangeHandler}
          value={searchInput}
        />
      </div>

      <header className={classes.header}>
        <nav className={classes.nav}>
          <ul>
            <li key='all'>
              <NavLink
                to='/food/all'
                className={({ isActive }) => (isActive ? classes.active : '')}
              >
                All
              </NavLink>
            </li>
            {foodCategories}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
