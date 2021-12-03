import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSettingsComponent } from './photo-settings.component';

describe('PhotoSettingsComponent', () => {
  let component: PhotoSettingsComponent;
  let fixture: ComponentFixture<PhotoSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
