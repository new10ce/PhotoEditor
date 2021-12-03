import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPhotoComponent } from './crop-photo.component';

describe('CropPhotoComponent', () => {
  let component: CropPhotoComponent;
  let fixture: ComponentFixture<CropPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
