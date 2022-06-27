import { createServer, Factory, Model } from 'miragejs';
import { faker } from '@faker-js/faker'

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    // quais dados quero armazernar no banco
    models: {
      // Partial - usar parte dos dados
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10)
        },
      })
    },

    // criar dados quando o mirage inicializa
    seeds(server) {
      server.createList('user', 10)
    },

    // quais rotas vou ter
    routes() {
      // precisa chamar /api/users
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      // vai resetar o nome, para não prejudiar rotas de api no next
      this.namespace = '';
      this.passthrough(); // se nenhuma rota for identificada ela chama as outras rotas
    }
  })

  return server;
}