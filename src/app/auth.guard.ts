import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

	/**
	 * Constructor to declare defualt propeties of class.
	 * @param authService - Declare authentication service Object.
	 * @param router - Declare router object.
	 */
	constructor(
		private router: Router,
	) { }


	canActivate(next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		return this.isValidate();
	}

	canLoad(): boolean {
		return this.isValidate();
	}

	isValidate() {
		let current_user = JSON.parse(localStorage.getItem('current_user'));
		if (current_user && current_user.token) {
			return true;
		} else {
			this.router.navigate(['auth/login']);
			return false;
		}

	}
}
