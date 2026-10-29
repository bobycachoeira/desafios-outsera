import { setWorldConstructor, World } from '@cucumber/cucumber';

export class AutomationExerciseWorld extends World {
  constructor(options) {
    super(options);
    this.automationURL = process.env.AUTOMATION_BASE_URL || 'https://www.automationexercise.com';
    this.automationUsersToDelete = [];
  }

  async createAutomationUser() {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const email = `ae.${Date.now()}.${Math.random().toString(16).slice(2, 8)}@example.com`;
      const password = 'teste123';
      const payload = new URLSearchParams({
        name: 'Cliente Automation',
        email,
        password,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1990',
        firstname: 'Cliente',
        lastname: 'Automation',
        company: 'QA',
        address1: 'Rua Teste 1',
        address2: 'Apto 2',
        country: 'India',
        zipcode: '12345',
        state: 'SP',
        city: 'Sao Paulo',
        mobile_number: '11999999999',
      });

      const response = await fetch(`${this.automationURL}/api/createAccount`, {
        method: 'POST',
        body: payload,
      });
      const text = await response.text();

      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }

      if (body?.responseCode === 201) {
        this.automationUser = { email, password };
        this.automationUsersToDelete.push(this.automationUser);
        return this.automationUser;
      }

      if (attempt === 3) {
        throw new Error(`Falha ao criar conta na Automation Exercise: ${text.slice(0, 200)}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
}

setWorldConstructor(AutomationExerciseWorld);
