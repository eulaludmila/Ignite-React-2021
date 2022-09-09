import { createServer, Factory, Model, Response } from 'miragejs';
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
      server.createList('user', 90)
    },

    // quais rotas vou ter
    routes() {
      // precisa chamar /api/users
      this.namespace = 'api';
      this.timing = 750;

      //fazer paginção usando a função
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10} = request.queryParams;

        const total = schema.all('user').length

        /*Página 2 = 10 - 20*/
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
                      .users.slice(pageStart, pageEnd)
        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });
      this.post('/users');

      // vai resetar o nome, para não prejudiar rotas de api no next
      this.namespace = '';
      this.passthrough(); // se nenhuma rota for identificada ela chama as outras rotas
    }
  })

  return server;
}