import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // View child will look for the first place we putted this directive
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;
  private subsClose: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.subsClose) this.subsClose.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoginMode
      ? (authObservable = this.authService.login(email, password))
      : (authObservable = this.authService.signUp(email, password));

    authObservable.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/Recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentAlertRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentAlertRef.instance.message = message;
    this.subsClose = componentAlertRef.instance.close.subscribe(() => {
      this.subsClose.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
