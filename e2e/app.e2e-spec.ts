import { Angular2TodolistPage } from './app.po';

describe('angular2-todolist App', function() {
  let page: Angular2TodolistPage;

  beforeEach(() => {
    page = new Angular2TodolistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
