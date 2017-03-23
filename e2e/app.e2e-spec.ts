import { Ee5dashboardPage } from './app.po';

describe('ee5dashboard App', function() {
  let page: Ee5dashboardPage;

  beforeEach(() => {
    page = new Ee5dashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
