describe('Artisan list and Details', () => {
  beforeEach(async () => {
  
  });

  it('enter login information and submit', async () => {
    await element(by.id('email_login')).replaceText('user@user.com');
    await element(by.id('password_login')).replaceText('password');
    await element(by.id('submit_login')).tap();
    await expect(element(by.id('artisan_list'))).toBeVisible();
  })

  it('Check artisan Alan Bard details ', async () => {
    await expect(element(by.id('artisan_list'))).toBeVisible();
    await expect(element(by.id('listItem0'))).toBeVisible();
    await element(by.id('listItem0')).tap();
    await expect(element(by.text('Artisan Details'))).toBeVisible();
    await expect(element(by.text('ArtisanHub'))).toBeVisible();
    await element(by.text('ArtisanHub')).tap();
  })

  it('logout successfully', async () => {
    await expect(element(by.text('Settings'))).toBeVisible();
    await element(by.text('Settings')).tap();
    await element(by.id('logout_button')).tap();
    await expect(element(by.id('handmade_logo'))).toBeVisible();
  }) 
});
