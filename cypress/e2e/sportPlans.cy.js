import { faker } from "@faker-js/faker";
const url = "http://localhost:8081";
const sportGoals = [
  "Mejorar resistencia",
  "Ganar peso",
  "Construir musculo",
  "Aumentar Frexibilidad",
  "Perder peso",
  "Aumentar Fuerza",
];
const randomSportGoals =
  sportGoals[Math.floor(Math.random() * sportGoals.length)];

const genres = ["Masculino", "Femenino"];
const randomGenre = genres[Math.floor(Math.random() * genres.length)];
const countries = ["Colombia", "Ecuador"];
const randomCountries = countries[Math.floor(Math.random() * countries.length)];

const sportLevels = ["Basico", "Medio", "Avanzado"];
const randomSportLevel =
  sportLevels[Math.floor(Math.random() * sportLevels.length)];

const diet = ["Ornivoro", "Frutivoro", "Vegano", "Carnivoro", "Vegetariano"];
const randomDiet = diet[Math.floor(Math.random() * diet.length)];

describe("Sports Plans", () => {
  it("go to sport profile", () => {
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
    cy.contains("Continuar").click();
    cy.wait(1000);
    cy.contains("Nivel Fisico").should("exist");
  });
  it("change all fields of sport profile and save", () => {
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
    cy.get("[data-testid=web_picker_genre]").select(randomGenre);
    cy.wait(500);
    cy.get("[data-testid=web_picker_country]").select(randomCountries);
    cy.wait(500);
    cy.get("[data-testid=input_age]").clear();
    cy.wait(500);
    cy.get("[data-testid=input_age]").type(
      faker.datatype.number({ min: 16, max: 68 })
    );
    cy.wait(500);
    cy.get("[data-testid=input_weight]").clear();
    cy.wait(500);
    cy.get("[data-testid=input_weight]").type(
      faker.datatype.number({ min: 40, max: 120 })
    );
    cy.wait(500);
    cy.get("[data-testid=input_heigth]").clear();
    cy.wait(500);
    cy.get("[data-testid=input_heigth]").type(
      faker.datatype.number({ min: 140, max: 200 })
    );
    cy.contains("Continuar").click();
    cy.wait(1000);
    cy.get("[role=combobox").click();
    cy.wait(500);
    cy.contains(randomSportGoals).click();
    cy.wait(500);
    cy.contains("Confirmar").click();
    cy.wait(500);
    cy.get("[data-testid=web_picker_goals]").select(randomSportLevel);
    cy.wait(500);
    cy.contains("Continuar").click();
    cy.wait(1000);
    cy.get("[data-testid=web_picker]").select(randomDiet);
    cy.wait(500);
    cy.contains("Guardar").click();
    cy.wait(3000);
  });

  it("select a sport plan", () => {
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
  });
});
