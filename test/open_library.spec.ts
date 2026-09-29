import { spec } from 'pactum';

describe('Open Library e HTTPBin', () => {
  it('GET - consulta uma obra na Open Library', async () => {
    await spec()
      .get('https://openlibrary.org/works/OL45804W.json')
      .expectStatus(200)
      .expectJsonLike({
        key: '/works/OL45804W',
        title: 'Fantastic Mr Fox'
      });
  });

  it('GET - consulta as edições de uma obra na Open Library', async () => {
    await spec()
      .get('https://openlibrary.org/works/OL45804W/editions.json')
      .expectStatus(200)
      .expectJsonLike({
        links: { work: '/works/OL45804W' }
      });
  });

  it('POST - envia dados para o HTTPBin', async () => {
    await spec()
      .post('https://httpbin.org/anything')
      .withHeaders('Content-Type', 'application/json')
      .withJson({ title: 'Meu livro de teste', author: 'Davi' })
      .expectStatus(200)
      .expectJsonLike({
        json: { title: 'Meu livro de teste', author: 'Davi' }
      });
  });

  it('PUT - envia dados de atualização para o HTTPBin', async () => {
    await spec()
      .put('https://httpbin.org/anything/livro/1')
      .withHeaders('Content-Type', 'application/json')
      .withJson({ title: 'Título atualizado' })
      .expectStatus(200)
      .expectJsonLike({
        json: { title: 'Título atualizado' }
      });
  });

  it('POST - envia outro corpo para o HTTPBin', async () => {
    await spec()
      .post('https://httpbin.org/anything/livros')
      .withJson({ title: 'Livro enviado', year: 2026 })
      .expectStatus(200)
      .expectJsonLike({
        json: { title: 'Livro enviado', year: 2026 },
        url: 'https://httpbin.org/anything/livros'
      });
  });
});
