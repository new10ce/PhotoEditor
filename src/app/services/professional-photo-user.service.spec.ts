import { TestBed } from '@angular/core/testing';

import { ProfessionalPhotoUserService } from './professional-photo-user.service';

describe('ProfessionalPhotoUserService', () => {
  let service: ProfessionalPhotoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalPhotoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
