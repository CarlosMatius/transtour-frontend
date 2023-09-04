import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { inject } from '@angular/core';
import { Rol } from 'src/app/roles/rol';
import Swal from 'sweetalert2';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(!authService.isAuthenticated()) {
    router.navigate(['/index']);
    return false;
  }

  let roles =  route.data['role'] as Rol[];
  let hasRole = false;
  Array.from(roles).forEach(role => {
    if(authService.hasRole(role)) {
      hasRole = true;
    }
  });

  if(hasRole) {
    return true;
  }
  
  Swal.fire('Acceso denegado', `Hola ${authService.usuario.username}, no tienes acceso a éste recurso!`, 'warning');
  router.navigate(['/perfil']);
  return false;
};