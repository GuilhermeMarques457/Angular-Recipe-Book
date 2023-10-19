import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  selectedRecipe: Recipe;
  recipeID: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.recipeID = +params['id'];

      this.selectedRecipe = recipeService.getRecipeByID(this.recipeID);
    });
  }

  onAddIngredientsShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedRecipe.ingredients
    );
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeID);
    this.router.navigate(['/Recipes']);
  }
}
