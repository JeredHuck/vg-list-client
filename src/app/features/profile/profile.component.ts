import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  myLists: string[] = ['Top Nintendo Games', 'Top Games', 'Top Xbox Games'];
  myFavoritedLists: string[] = [
    'Top Sonic Games',
    'Greatest Zelda Games of All Time',
    'My Favorite Mario Games',
  ];
}
