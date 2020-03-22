import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorCommentsComponent } from './moderator-comments.component';

describe('ModeratorCommentsComponent', () => {
  let component: ModeratorCommentsComponent;
  let fixture: ComponentFixture<ModeratorCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
