import { Ingredients } from '../shared/ingredients.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredients[];

  constructor(
    id: number,
    name: string,
    desc: string,
    img: string,
    ingredients: Ingredients[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = img;
    this.ingredients = ingredients;
  }
}
