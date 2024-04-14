import { faker } from "@faker-js/faker";
describe("template spec", () => {
  it("Correct registration", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Registrate aquí").click();
    cy.wait(500);
    cy.get("[aria-label=firstName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=lastName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=email]").type(faker.internet.email());
    cy.wait(1000);
    cy.get("[aria-label=password").type("Prueba123*");
    cy.wait(500);
    cy.get("[aria-label=confirmPassword").type("Prueba123*");
    cy.wait(500);
    cy.contains("Registrar").click();
    cy.wait(2000);
  });
  it("empty fields", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Registrate aquí").click();
    cy.wait(500);
    cy.contains("Registrar").click();
    cy.wait(1000);
  });
  it("email already exists", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Registrate aquí").click();
    cy.wait(500);
    cy.get("[aria-label=firstName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=lastName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=email]").type("dani@hotmail.com");
    cy.wait(1000);
    cy.get("[aria-label=password").type("Prueba123*");
    cy.wait(500);
    cy.get("[aria-label=confirmPassword").type("Prueba123*");
    cy.wait(1000);
  });
  it("wrong confirmPassword", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Registrate aquí").click();
    cy.wait(500);
    cy.get("[aria-label=firstName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=lastName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=email]").type("prueba2@gmail.com");
    cy.wait(1000);
    cy.get("[aria-label=password").type("Prueba123*");
    cy.wait(500);
    cy.get("[aria-label=confirmPassword").type("Prueba12*");
    cy.wait(500);
    cy.get("[aria-label=password").click();
    cy.wait(1000);
  });
  it("wrong password format", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Registrate aquí").click();
    cy.wait(500);
    cy.get("[aria-label=firstName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=lastName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=email]").type("prueba2@gmail.com");
    cy.wait(1000);
    cy.get("[aria-label=password").type("Prueb1");
    cy.wait(500);
    cy.get("[aria-label=confirmPassword").type("Prueb1");
    cy.wait(500);
    cy.get("[aria-label=password").click();
    cy.wait(1000);
  });
  it("wrong email format", () => {
    cy.viewport(390, 844);
    cy.visit("http://192.168.0.7:8081");
    cy.wait(500);
    cy.contains("Empezar").click();
    cy.wait(500);
    cy.contains("Registrate aquí").click();
    cy.wait(500);
    cy.get("[aria-label=firstName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=lastName]").type("Prueba");
    cy.wait(500);
    cy.get("[aria-label=email]").type("prueba2gmail.com");
    cy.wait(1000);
    cy.get("[aria-label=password").type("Prueba123*");
    cy.wait(500);
    cy.get("[aria-label=confirmPassword").type("Prueba123*");
    cy.wait(500);
    cy.get("[aria-label=password").click();
    cy.wait(1000);
  });
});
