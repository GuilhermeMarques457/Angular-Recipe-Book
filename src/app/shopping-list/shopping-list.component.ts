import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../auth/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  private ingredientsChangedSubs: Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.ingredientsChangedSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();

    // Whenever an event is emmited in this property of the service,
    // This is called using subscrive to set the new array again
    this.ingredientsChangedSubs =
      this.shoppingService.ingredientsChanged.subscribe(
        (ingredients: Ingredients[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
