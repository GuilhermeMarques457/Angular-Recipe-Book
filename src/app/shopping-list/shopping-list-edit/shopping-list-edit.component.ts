import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) ingredientsForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredientByIndex(
          this.editedItemIndex
        );

        this.ingredientsForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const ingredients = new Ingredients(
      this.ingredientsForm.value.name,
      this.ingredientsForm.value.amount
    );

    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingredients);
    } else {
      this.shoppingService.addIngredient(ingredients);
    }

    this.editMode = false;
    this.ingredientsForm.reset();
  }

  onClear() {
    this.ingredientsForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingService.deleteIngredient(this.editedItemIndex);
    }

    this.onClear();
  }
  // Old aproach
  // onAddIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
  //   const ingredients = new Ingredients(
  //     nameInput.value,
  //     parseInt(amountInput.value)
  //   );
  //   this.shoppingService.addIngredient(ingredients);
  // }
}
