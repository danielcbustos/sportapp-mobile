const url = "http://localhost:8081";
describe("External App Information", () => {
  it("go to external app information screen and click on button", () => {
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
    cy.contains("Conectar con App Externa").click();
    cy.wait(2500);
    cy.contains("Chequear").click();
    cy.contains("Frecuencia Cardiaca").should("exist");
    cy.wait(2500);
  });
});
