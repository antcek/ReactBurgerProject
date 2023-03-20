import { URLHost } from "../../src/utils/constants";


describe('service is available', function () {

  it('should be available on localhost:3000', function () {
    cy.visit(URLHost);
  })

}); 