const url = "http://localhost:8081";
describe("Monitoring Goals", () => {
  it("go to progress screen and click on button", () => {
    cy.viewport(390, 844);
    cy.visit(url);
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.get("[placeholder=Correo]").type("dani@hotmail.com");
    cy.wait(500);
    cy.get("[placeholder=Contraseña]").type("Messi96*");
    cy.wait(500);
    cy.contains("Iniciar sesión").click();
    cy.wait(2000);
    cy.contains("Progreso").click();
    cy.wait(500);
    cy.contains("musculo").should("exist");
    cy.wait(500);
    cy.contains("Actualizar").click();
    cy.wait(1000);
  });
});
