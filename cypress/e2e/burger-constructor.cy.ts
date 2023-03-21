import { fakePassword, fakeUser, URLHost } from "../../src/utils/constants";
import '@4tw/cypress-drag-drop';


describe('Проверка функциональности конструктора', () => {

  beforeEach(() => {
    cy.visit(URLHost)
  })

  it('Должно проверять авторизованность пользователя', () => {

  })

  it('Должно проверять функциональность модальных окон ингредиентов', () => {

    cy.get('[data-testid="product"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');// проверяет открытие модального окна
    cy.get('[data-testid="modal"]').contains('Краторная булка N-200i'); // проверяет содержимое
    cy.get('[data-testid="close-mark"]').click(); // закрывает модальное окно
    cy.get('#react-modals').should('be.empty'); // проверка на отсутствие видимости модалки
  })

  it('Должно проверять функциональность заказа и drag-n-drop', () => {
  
    cy.get('[data-testid="product"]').first().drag('[data-testid="drop-area"]');
    cy.get('[data-testid="submit-order"]').click();
    cy.get('#login-email-input').type(fakeUser);
    cy.get('#login-password-input').type(fakePassword);
    cy.get('#login-button').click();
    cy.get('[data-testid="submit-order"]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.wait(20000)
    cy.get('[data-testid="modal"]').contains('идентификатор заказа');
  })

});
