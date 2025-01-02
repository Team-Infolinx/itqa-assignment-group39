const baseUrl = Cypress.config("baseUrlAPI");

class Login {
    /**
     * Login using a POST request with authentication headers
     * @param {string} username - The username for login
     * @param {string} password - The password for login
     * @returns {Cypress.Chainable} - The response of the POST request
     */
    loginUser(username, password) {
        return cy.request({
            method: "OPTIONS",
            url: baseUrl,
            auth: {
                username: username,
                password: password,
            },
            failOnStatusCode: false,
        });
    }

    createAuthHeader(username, password) {
        return {
            Authorization: `Basic ${btoa(username + ":" + password)}`,
            "Content-Type": "application/json",
        };
    }
}

export default new Login();
