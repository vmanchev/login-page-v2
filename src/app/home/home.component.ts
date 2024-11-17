import { Component, inject } from '@angular/core';
import { AuthFasadeService } from '../store/auth/auth-fasade.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authFasadeService = inject(AuthFasadeService);
}
