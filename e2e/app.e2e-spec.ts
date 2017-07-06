import { SIRBPage } from './app.po';

describe('sirb App', () => {
  let page: SIRBPage;

  beforeEach(() => {
    page = new SIRBPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
