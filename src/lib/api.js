const MOCKY_DOMAIN = 'https://run.mocky.io/v3';

export async function getFoodCategories() {
  const response = await fetch(
    `${MOCKY_DOMAIN}/f25ced0a-9ff7-4996-bdc7-430f281c48db`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch food categories.');
  }

  const transformedFoodCategories = [];

  for (const foodCategory of data) {
    transformedFoodCategories.push(foodCategory);
  }

  return transformedFoodCategories;
}

export async function getAllFood() {
  const response = await fetch(
    `${MOCKY_DOMAIN}/a24cfec5-f76c-410b-a5ac-9f63fab28abb`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get all food.');
  }

  const transformedFood = [];

  for (const food of data) {
    transformedFood.push(food);
  }

  return transformedFood;
}
