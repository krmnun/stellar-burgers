import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.ingredientsReducer
  );
  const { id } = useParams();

  const ingredientData = ingredients.find((item) => item._id === id);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : ingredientData ? (
        <IngredientDetailsUI ingredientData={ingredientData} />
      ) : (
        <h3 className='text text_type_main-medium mt-2 mb-4'>
          Такого ингредиента нет
        </h3>
      )}
    </>
  );
};
