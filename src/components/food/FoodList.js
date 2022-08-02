import FoodItem from './FoodItem';
import classes from './FoodList.module.css';

const FoodList = (props) => {
  return (
    <div className={classes['food-list']}>
      {props.foodList.map((food) => (
        <div className={classes['food-list__item']} key={food.id}>
          <FoodItem
            promotion={food.promotion}
            imageUrl={food.imageUrl}
            name={food.name}
            rating={food.rating}
            minCookingTime={food.minCookTime}
            maxCookingTime={food.maxCookTime}
            isNew={food.isNew}
          />
        </div>
      ))}
    </div>
  );
};

export default FoodList;
