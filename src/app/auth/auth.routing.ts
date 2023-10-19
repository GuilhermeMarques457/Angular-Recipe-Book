import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

const authRouting: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(authRouting)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
