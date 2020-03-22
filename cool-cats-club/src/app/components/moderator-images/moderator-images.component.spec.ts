import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorImagesComponent } from './moderator-images.component';

describe('ModeratorImagesComponent', () => {
  let component: ModeratorImagesComponent;
  let fixture: ComponentFixture<ModeratorImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
