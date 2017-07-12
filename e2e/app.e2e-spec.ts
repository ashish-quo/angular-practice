import { AngPocPage } from './app.po';

describe('ang-poc App', () => {
  let page: AngPocPage;

  beforeEach(() => {
    page = new AngPocPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
