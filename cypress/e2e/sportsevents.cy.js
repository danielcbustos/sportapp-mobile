describe("Login", () => {
  it("sports events list is not empty", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
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
    cy.contains("Eventos Deportivos").click();
    cy.wait(1000);
    cy.contains("10").click();
    cy.wait(500);
    cy.contains("Ver disponibilidad").click();
    cy.wait(2000);
  });

  it("sports events list is empty", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
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
    cy.contains("Eventos Deportivos").click();
    cy.wait(500);
    cy.contains("28").click();
    cy.wait(500);
    cy.contains("Ver disponibilidad").click();
    cy.wait(2000);
  });
  it("no date selected", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
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
    cy.contains("Eventos Deportivos").click();
    cy.wait(1000);
  });
  it("sports event detail", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
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
    cy.contains("Eventos Deportivos").click();
    cy.wait(1000);
    cy.contains("10").click();
    cy.wait(500);
    cy.contains("Ver disponibilidad").click();
    cy.wait(2000);
    // cy.get("[aria-label=event]").should("exist").click();
    // cy.get("[aria-label=event]").first().click();
    cy.wait(1500);
  });
});
