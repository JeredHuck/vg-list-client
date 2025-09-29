import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent implements OnInit {
  tempLists: string[] = ['The Greatest Games of All Time', 'Best Zelda Games'];
  ngOnInit() {
    // TODO subscribe to setLists observable in the database service
  }
}
