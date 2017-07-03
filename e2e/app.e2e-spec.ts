import { WebForumAngularPage } from './app.po';

describe('web-forum-angular App', () => {
  let page: WebForumAngularPage;

  beforeEach(() => {
    page = new WebForumAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
