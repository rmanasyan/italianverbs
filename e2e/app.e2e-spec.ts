import { ItalianverbsPage } from './app.po';

describe('italianverbs App', () => {
  let page: ItalianverbsPage;

  beforeEach(() => {
    page = new ItalianverbsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
