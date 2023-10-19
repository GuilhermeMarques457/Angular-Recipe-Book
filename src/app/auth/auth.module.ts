import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
