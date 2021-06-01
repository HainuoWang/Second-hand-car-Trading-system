import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSecurityComponent } from './seller-security.component';

describe('SellerSecurityComponent', () => {
  let component: SellerSecurityComponent;
  let fixture: ComponentFixture<SellerSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
