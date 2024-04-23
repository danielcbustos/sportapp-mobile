import { faker } from "@faker-js/faker";
const url = "http://localhost:8081";
const diet = ["Ornivoro", "Frutivoro", "Vegano", "Carnivoro", "Vegetariano"];
const randomDiet = diet[Math.floor(Math.random() * diet.length)];

const medicalAllergies = ["Lateos", "Frutos secos", "Gluten"];
const randomMedicalAllergies =
  medicalAllergies[Math.floor(Math.random() * medicalAllergies.length)];
describe("Meal Plans", () => {
  it("go to meal profile", () => {
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
    cy.contains("Perfil").click();
    cy.wait(1000);
    cy.contains("alergico").should("exist");
  });
  it("change all fields of meal profile and save", () => {
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
    cy.contains("Perfil").click();
    cy.wait(1000);
    cy.contains("alergico").should("exist");
    cy.wait(500);
    cy.get("[aria-label=medicalAllergies").click();
    cy.wait(500);
    cy.get("[data-testid=web_picker]").select(randomDiet);
    cy.wait(500);
    cy.get("[inputmode=numeric]").clear();
    cy.wait(500);
    cy.get("[inputmode=numeric]").type(
      faker.datatype.number({ min: 0, max: 5000 })
    );
    cy.wait(500);
    cy.get("[aria-label=mealAllergies").click();
    cy.wait(500);
    cy.get("[aria-label=mealAllergies").click();
    cy.wait(500);
    cy.get("[aria-label=mealAllergies]").uncheck();
    cy.wait(500);
    cy.get("[aria-label=mealAllergies]").click();
    cy.wait(500);
    cy.get("[role=combobox").click();
    cy.wait(500);
    cy.contains(randomMedicalAllergies).click();
    cy.wait(500);
    cy.contains("Confirmar").click();
    cy.wait(500);
    cy.contains("Guardar").click();
  });

  it("select a meal plan", () => {
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
    cy.contains("Planes Alimenticios").click();
    cy.wait(2000);
    cy.get("[aria-label=mealPlan]").should("exist").first().click();
    cy.wait(2000);
  });
});
