import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.ingredients
  );
  const ingredientData = ingredients.find(
    (item: TIngredient) => item._id === id
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <h3 className='text text_type_main-medium mt-2 mb-4'>
        Такого ингредиента нет
      </h3>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
