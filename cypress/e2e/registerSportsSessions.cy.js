const url = "http://localhost:8081";

describe("RegisterSportsSessions", () => {
  it("register sports session", () => {
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
    cy.contains("Servicios").click();
    cy.wait(1000);
    cy.contains("Rutinas Deportivas").click();
    cy.wait(2000);
    cy.get("[aria-label=sportsPlan]").should("exist").first().click();
    cy.wait(2000);
    cy.contains("Comenzar entrenamiento").click();
    cy.wait(500);
    cy.get('[data-testid="start"]').click({ force: true });
    cy.wait(5000);
    cy.contains("Finalizar entrenamiento").click();
    cy.wait(1000);
  });
});
