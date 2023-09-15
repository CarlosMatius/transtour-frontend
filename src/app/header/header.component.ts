import { Component } from "@angular/core";
import { AuthService } from "../usuarios/login/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    titulo:string = 'Pacific Rides';
    constructor(public authService: AuthService, private router: Router) {}

    logout(): void {
        let username = this.authService.usuario.username;
        this.authService.logout();
        Swal.fire({
            title: 'Logout',
            text: `Hola ${username} has cerrado sesion con exito!`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
        this.router.navigate(['/index'])
    }
}