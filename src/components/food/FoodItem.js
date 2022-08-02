import logo from '../../assets/icon-star.png';
import giftIcon from '../../assets/icon-gift.png';
import Card from '../UI/Card';
import classes from './FoodItem.module.css';

const FoodItem = (props) => {
  const promotionContent = () => {
      if (props.promotion === 'gift') {
        return (
          <span className={`${classes.promotion} ${classes.promotionGift}`}>
            <img src={giftIcon} alt='gift' width='50%' />
          </span>
        )
      } else if (props.promotion === '1+1') {
        return (
          <span className={`${classes.promotion} ${classes.promotionOneForOne}`}>
            1+1
          </span>
        )
      } else if (props.promotion === 'discount') {
        return (
          <span className={`${classes.promotion} ${classes.promotionDiscount}`}>
            %
          </span>
        )
      }
  }

  return (
    <Card>
      <div className={classes.image}>
        {props.promotion && promotionContent()}
        <img src={props.imageUrl} alt={props.name} />
      </div>
      <div className={classes.info}>
        <div className={classes.foodName}>{props.name}</div>
        <div className={classes.details}>
          <div className={classes.rating}>
            <img className={classes.starIcon} src={logo} alt='rating' />
            <span className={classes.ratingValue}>
              {Math.round(props.rating * 10) / 10}
            </span>
          </div>
          <div className={classes.cookingTime}>
            <span>{`${props.minCookingTime}-${props.maxCookingTime} min`}</span>
          </div>
          {props.isNew && (
            <div className={classes.isNew}>
              <span>New</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FoodItem;
