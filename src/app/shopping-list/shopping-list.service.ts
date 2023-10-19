import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Cheese', 3),
    new Ingredients('Flour', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);

    console.log(this.ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
