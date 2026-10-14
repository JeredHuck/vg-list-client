import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment.development';
import { DatabaseService } from './databse-service';

describe('DatabaseService list caching', () => {
  let service: DatabaseService;
  let http: HttpTestingController;
  const url = (userId: number) => `${environment.apiUrl}/users/${userId}/lists`;
  const lists = [{ id: 1, title: 'Favorites', content: 'Zelda' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DatabaseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('shares an in-flight request and reuses its result on a later visit', () => {
    const first = jasmine.createSpy('first visit');
    const concurrent = jasmine.createSpy('concurrent consumer');
    const later = jasmine.createSpy('later visit');

    service.getUserLists(1).subscribe(first);
    service.getUserLists(1).subscribe(concurrent);
    http.expectOne(url(1)).flush(lists);

    service.getUserLists(1).subscribe(later);
    http.expectNone(url(1));
    expect(first).toHaveBeenCalledOnceWith(lists);
    expect(concurrent).toHaveBeenCalledOnceWith(lists);
    expect(later).toHaveBeenCalledOnceWith(lists);
  });

  it('keeps different users results separate', () => {
    service.getUserLists(1).subscribe();
    http.expectOne(url(1)).flush(lists);

    const otherUser = jasmine.createSpy('other user');
    service.getUserLists(2).subscribe(otherUser);
    http.expectOne(url(2)).flush([]);
    expect(otherUser).toHaveBeenCalledOnceWith([]);

    service.getUserLists(1).subscribe((result) => expect(result).toEqual(lists));
    http.expectNone(url(1));
  });

  it('retries a failed load on the next visit', () => {
    spyOn(console, 'error');
    const failed = jasmine.createSpy('failed load');
    service.getUserLists(1).subscribe({ error: failed });
    http.expectOne(url(1)).flush('Failed', {
      status: 500,
      statusText: 'Server error',
    });
    expect(failed).toHaveBeenCalled();

    service.getUserLists(1).subscribe((result) => expect(result).toEqual(lists));
    http.expectOne(url(1)).flush(lists);
  });

  it('allows explicitly refreshing one user without clearing another', () => {
    service.getUserLists(1).subscribe();
    http.expectOne(url(1)).flush(lists);
    service.getUserLists(2).subscribe();
    http.expectOne(url(2)).flush([]);

    service.clearUserListsCache(1);
    service.getUserLists(1).subscribe((result) => expect(result).toEqual([]));
    http.expectOne(url(1)).flush([]);
    service.getUserLists(2).subscribe();
    http.expectNone(url(2));
  });

  it('refreshes after a successful create but retains cached data after a failed create', () => {
    spyOn(console, 'error');
    service.getUserLists(1).subscribe();
    http.expectOne(url(1)).flush(lists);

    service.createList(1, ['Mario']).subscribe({ error: () => {} });
    http.expectOne({ method: 'POST', url: url(1) }).flush('Failed', {
      status: 422,
      statusText: 'Unprocessable Entity',
    });
    service.getUserLists(1).subscribe((result) => expect(result).toEqual(lists));
    http.expectNone(url(1));

    service.createList(1, ['Mario']).subscribe();
    http.expectOne({ method: 'POST', url: url(1) }).flush(lists[0]);
    service.getUserLists(1).subscribe((result) => expect(result).toEqual(lists));
    http.expectOne(url(1)).flush(lists);
  });

  it('refreshes after a successful delete', () => {
    service.getUserLists(1).subscribe();
    http.expectOne(url(1)).flush(lists);

    service.deleteList(1, 1).subscribe();
    http.expectOne({ method: 'DELETE', url: `${url(1)}/1` }).flush({});
    service.getUserLists(1).subscribe((result) => expect(result).toEqual([]));
    http.expectOne(url(1)).flush([]);
  });
});
