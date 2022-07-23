/// <reference types="cypress" />
const helper = require("../support/helper");

describe("Add Item to cart", () => {
  /*beforeEach(() => {
    cy.request("GET", "https://api.demoblaze.com/entries").then(response => {
      expect(response).to.have.property("status", 200);
      expect(response.body.Items).to.have.length(9);
    })
  })*/

  it("Requests examples", () => {
    cy.visit("https://www.demoblaze.com/");
    cy.intercept("https://api.demoblaze.com/view").as("view");

    cy.request({
      method: "POST",
      url: "https://api.demoblaze.com/view",
      body: { "id": "1" }
    }).its("body.title").should("equal", "Samsung galaxy s6");

    cy.wait(1000);

    cy.getCookie("user").then((c) => {
      let userCookie = "user=" + (c.value).toString();
      cy.request({
        method: "POST",
        url: "https://api.demoblaze.com/addtocart",
        body: {
          cookie: userCookie,
          flag: false,
          id: helper.generateIdForPostRequest(),
          prod_id: 1
        }
      })
    });

    cy.contains("Cart").click();

    cy.wait("@view");

    cy.get("#totalp").then(price => {
      expect(price.text()).to.be.equal("360");
    })
  })
})
