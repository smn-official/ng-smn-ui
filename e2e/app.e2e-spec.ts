import { NgSmnUiPage } from './app.po';

describe('ng-smn-ui App', () => {
  let page: NgSmnUiPage;

  beforeEach(() => {
    page = new NgSmnUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
