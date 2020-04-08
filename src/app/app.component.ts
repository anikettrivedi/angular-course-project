import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //commented after routing was added.
  // selectedFeature = 'recipe';

  // navigateTo(feature: string){
  //   this.selectedFeature = feature;
  // }
  constructor(private authService : AuthService) {}

  ngOnInit(){
    this.authService.autoLogin();
  }
}
