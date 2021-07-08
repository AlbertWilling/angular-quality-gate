import {FormControl, Validators} from '@angular/forms';

describe('should submit', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/sight/add');
  });

  it('should get form submitted message', () => {
    cy.get('input[formControlName=\'name\']').type('Testing Point');
    cy.get('input[formControlName=\'longitude\']').type('12.2345');
    cy.get('input[formControlName=\'latitude\']').type('12.5678');
    cy.get('input[formControlName=\'countryName\']').type('Poland');
    cy.get('input[formControlName=\'iataCode\']').type('PL');
    cy.get('input[formControlName=\'description\']').type('Description of Poland');
    cy.get('select[formControlName=\'color\']').select('1');
    cy.get('#submit-button').click();
    cy.get('#submit-message').contains('Form has been submitted');
    cy.wait(2000);
  });

  it('should show error message', () => {

    cy.get('input[formControlName=\'name\']').type('Testing Point');
    cy.get('input[formControlName=\'longitude\']').type('12.2345');
    cy.get('input[formControlName=\'latitude\']').type('123.456');
    cy.get('input[formControlName=\'countryName\']').type('Poland');
    cy.get('input[formControlName=\'iataCode\']').type('PL');
    cy.get('input[formControlName=\'description\']').type('Description of Poland');
    cy.get('select[formControlName=\'color\']').select('1');
    cy.contains('Latitude value is incorrect');
    cy.wait(2000);
  });

  it('should show error message', () => {

    cy.get('input[formControlName=\'name\']').type('Testing Point');
    cy.get('input[formControlName=\'longitude\']').type('12.2345');
    cy.get('input[formControlName=\'latitude\']').type('12.4563');
    cy.get('input[formControlName=\'countryName\']').type('Poland');
    cy.get('input[formControlName=\'iataCode\']').type('PL');
    cy.get('input[formControlName=\'description\']').type('Bulbator'.repeat(40));
    cy.get('select[formControlName=\'color\']').select('1');
    cy.contains('Description cannot exceed 256 characters');
  });

});
