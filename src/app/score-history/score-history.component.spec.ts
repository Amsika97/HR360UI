import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreHistoryComponent } from './score-history.component';

describe('ScoreHistoryComponent', () => {
  let component: ScoreHistoryComponent;
  let fixture: ComponentFixture<ScoreHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreHistoryComponent]
    });
    fixture = TestBed.createComponent(ScoreHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
