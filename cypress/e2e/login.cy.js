describe("Login", () => {
  it("Correct Login", () => {
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
  });
  it("Wrong email format", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.get("[placeholder=Correo]").type("daniel%%.com");
    cy.wait(500);
    cy.get("[placeholder=Contraseña]").type("Messi96*");
    cy.wait(500);
    cy.contains("Iniciar sesión").click();
    cy.wait(1000);
  });
  it("Short Password", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.get("[placeholder=Correo]").type("dani@hotmail.com");
    cy.wait(500);
    cy.get("[placeholder=Contraseña]").type("Mess*");
    cy.wait(500);
    cy.contains("Iniciar sesión").click();
    cy.wait(1000);
  });
  it("Empty fields", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Iniciar sesión").click();
    cy.wait(1000);
  });
  it("Wrong credentials", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.get("[placeholder=Correo]").type("dadadf@hotmail.com");
    cy.wait(500);
    cy.get("[placeholder=Contraseña]").type("Mess89ad*");
    cy.wait(500);
    cy.contains("Iniciar sesión").click();
    cy.wait(1000);
  });
});
