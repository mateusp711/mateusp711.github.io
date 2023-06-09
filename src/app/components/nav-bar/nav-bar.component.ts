import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: any;
  photoUrl?: string;
  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.user = await this.authService.getUser()
    this.photoUrl = this.user.photoURL;
  }

  navigateToRpd() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['rpd'])
    }
    else { this.router.navigate(['sign-in']) }
  }

  logOut() {
    this.authService.SignOut()
  }



}
