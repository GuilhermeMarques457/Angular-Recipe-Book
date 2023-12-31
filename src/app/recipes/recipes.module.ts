import { NgModule } from '@angular/core';
import { RecipeDefaultComponent } from './recipe-list/recipe-default/recipe-default.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeDefaultComponent,
    RecipeEditComponent,
  ],
  imports: [RouterModule, SharedModule, RecipesRoutingModule],
  // exports: [
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeDefaultComponent,
  //   RecipeEditComponent,
  // ],
})
export class RecipesModule {}
