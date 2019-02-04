describe('Login Screen', () => {
  beforeEach(async () => {
    //await device.reloadReactNative();
    //await device.launchApp({newInstance: true});
  });

  it('HandMade logo is visible', async () => {
    await expect(element(by.id('handmade_logo'))).toBeVisible();
  })

  it('create account is visible', async () => {
    await expect(element(by.id('create_account'))).toBeVisible();
  })

  it('forgot password button is visible', async () => {
    await expect(element(by.id('forgot_password_button'))).toBeVisible();
  })

  it('email text input is visible', async () => {
    await expect(element(by.id('email_login'))).toBeVisible();
  })

  it('password text input is visible', async () => {
    await expect(element(by.id('password_login'))).toBeVisible();
  })

  it('submit button is visible', async () => {
    await expect(element(by.id('submit_login'))).toBeVisible();
  })

  it('enter login information and submit', async () => {
    await element(by.id('email_login')).replaceText('user@user.com');
    await element(by.id('password_login')).replaceText('password');
    await element(by.id('submit_login')).tap();
    await expect(element(by.id('artisan_list'))).toBeVisible();
  })

  it('logout successfully', async () => {
    await expect(element(by.text('Settings'))).toBeVisible();
    await element(by.text('Settings')).tap();
    await element(by.id('logout_button')).tap();
    await expect(element(by.id('handmade_logo'))).toBeVisible();
  })
});
