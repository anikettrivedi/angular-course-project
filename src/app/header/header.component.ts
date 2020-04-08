import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy  {

  // commented out as navigation is handled by routing now
  // @Output() featureEmitter = new EventEmitter<string>();

  // onSelect(feature : string){
  //   this.featureEmitter.emit(feature);
  // }

  private userSubscription : Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService : DataStorageService,
    private authService : AuthService
    ){}

  ngOnInit(){
    this.userSubscription = this.authService.userSubject.subscribe(user =>{
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
