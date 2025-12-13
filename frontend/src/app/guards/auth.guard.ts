import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService(null as any);
  const router = new Router();

  if (authService.hasToken()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
