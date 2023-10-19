import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListRouting } from './shopping-list.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [RouterModule, SharedModule, ShoppingListRouting],
})
export class ShoppingListModule {}
