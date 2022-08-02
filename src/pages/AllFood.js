import { useEffect, useMemo, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import FoodList from '../components/food/FoodList';
import NoFoodFound from '../components/food/NoFoodFound';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllFood } from '../lib/api';
import classes from './AllFood.module.css';

const PAGE_SIZE = 10;

const AllFood = () => {
  const { categoryId } = useParams();
  const [page, setPage] = useState(1);
  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const {
    sendRequest,
    status,
    data: loadedFoodList,
    error,
  } = useHttp(getAllFood, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    setPage(1);
  }, [categoryId, search]);

  const showMoreClickHandler = () => {
    setPage((prevState) => prevState + 1);
  };

  if (status === 'pending') {
    return (
      <div className={classes.loadingSpinner}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (
    status === 'completed' &&
    (!loadedFoodList || loadedFoodList.length === 0)
  ) {
    return <NoFoodFound />;
  }

  let filteredFoodList =
    categoryId && categoryId !== 'all'
      ? loadedFoodList.filter((food) => food.categoryId === categoryId)
      : loadedFoodList;

  if (queryParams && queryParams.get('foodName')) {
    filteredFoodList = filteredFoodList.filter(
      (food) => food.name.toLowerCase().includes(queryParams.get('foodName').toLowerCase())
    );
  }

  const paginatedFoodList = filteredFoodList.slice(0, page * PAGE_SIZE);

  return (
    <>
      <FoodList foodList={paginatedFoodList} />
      <div className={classes.showMore}>
        <Button onClick={showMoreClickHandler}>+ Show More</Button>
      </div>
    </>
  );
};

export default AllFood;
