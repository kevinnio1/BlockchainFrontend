import { StageFrontendPage } from './app.po';

describe('stage-frontend App', () => {
  let page: StageFrontendPage;

  beforeEach(() => {
    page = new StageFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
