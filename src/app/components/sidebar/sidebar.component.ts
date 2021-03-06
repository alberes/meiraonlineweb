import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/notice-termination', title: 'Aviso Prévio Trabalhado',  icon: 'design_app', class: '' },
  { path: '/sick-leave', title: 'Afastamento Temporário',  icon: 'design_app', class: '' },
  { path: '/school-calendar', title: 'Calendário Escolar',  icon: 'design_app', class: '' },
  { path: '/preliminary-registration', title: 'Ficha de Cadastro Preliminar',  icon: 'design_app', class: '' },
  { path: '/employer-union-contribution', title: 'Contribuição Sindical Patronal', icon: 'design_app', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}