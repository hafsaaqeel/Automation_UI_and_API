describe("Simple Books API Tests", () => {
    const baseUrl = "https://simple-books-api.glitch.me";
    let authToken; // Variable to store the token
    let orderId; // Store order ID for future requests
  
    before(() => {
      // Register API Client & Get Token
      cy.request({
        method: "POST",
        url: `${baseUrl}/api-clients/`,
        body: {
          clientName: "Cypress Test Client",
          clientEmail: `test${Date.now()}@example.com`, // Unique email to avoid 409 error
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        authToken = response.body.accessToken; // Save token for later use
      });
    });
  
    // ------------------ Positive Tests ------------------
  
    it("should check API status", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/status`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("status", "OK");
        cy.log("API is up and running!");
      });
    });
  
    it("should fetch a list of books", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/books`,
        qs: { type: "fiction", limit: 5 }, // Optional query parameters
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.lte(5);
        cy.log("Fetched books successfully", response.body);
      });
    });
  
    it("should fetch details of a single book", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/books/1`, // Fetch details for bookId = 1
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", 1);
        expect(response.body).to.have.property("name");
        cy.log("Fetched book details:", response.body);
      });
    });
  
    it("should successfully place an order", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/orders`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          bookId: 1, // Order a book with ID 1
          customerName: "Hafsa Aqeel",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("orderId");
        orderId = response.body.orderId; // Save order ID for later use
        cy.log("Order placed successfully!", orderId);
      });
    });
  
    it("should retrieve all orders", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/orders`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        cy.log("Fetched orders successfully", response.body);
      });
    });

    it("should update an order", () => {
      cy.request({
        method: "PATCH",
        url: `${baseUrl}/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          customerName: "Frau Hafsa Aqeel", // Updating the customer's name
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
        cy.log(`Order ${orderId} updated successfully!`);
      });
    });
  
    it("should delete an order", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
        cy.log(`Order ${orderId} deleted successfully!`);
      });
    });
  
    // ------------------ Negative Tests ------------------
  
    it("should return 404 for a non-existing book", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/books/999`, // Non-existing book ID
        failOnStatusCode: false, // Prevent failure on 404 status
      }).then((response) => {
        expect(response.status).to.eq(404);
        cy.log("Book not found with ID 999.");
      });
    });
  
    it("should return 400 for invalid order creation", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/orders`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          // Missing required `bookId` and `customerName`
        },
        failOnStatusCode: false, // Prevent failure on 400 status
      }).then((response) => {
        expect(response.status).to.eq(400);
        cy.log("Invalid order creation attempt.");
      });
    });
  
    it("should return 401 for unauthorized order deletion", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/orders/${orderId}`,
        failOnStatusCode: false, // Prevent failure on 401 status
      }).then((response) => {
        expect(response.status).to.eq(401);
        cy.log("Unauthorized request to delete an order.");
      });
    });
  
    it("should return 404 for non-existing order deletion", () => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/orders/999999`, // Non-existing order ID
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        failOnStatusCode: false, // Prevent failure on 404 status
      }).then((response) => {
        expect(response.status).to.eq(404);
        cy.log("Order not found with ID 999999.");
      });
    });
    
    it("should return 401 for unauthorized access with an invalid token", () => {
        cy.request({
          method: "GET",
          url: `${baseUrl}/orders`, // Trying to fetch orders with an invalid token
          headers: {
            Authorization: `Bearer invalid_token_here`, // Invalid token
          },
          failOnStatusCode: false, // Prevent failure on 401 status
        }).then((response) => {
          expect(response.status).to.eq(401);
          cy.log("Unauthorized access due to invalid token.");
        });
      });      
  });
  