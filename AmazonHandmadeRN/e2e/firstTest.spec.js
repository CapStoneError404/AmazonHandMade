describe('create account test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    //await device.launchApp({newInstance: true});
  });
  it('Hits create account button', async () => {
    await expect(element(by.id('create_account'))).toBeVisible();
    await element(by.id('create_account')).tap();
  })
  it('sees if register text is visible', async () => {
    await expect(element(by.id('register_text'))).toBeVisible();
  })
  it('sees if email field is visible', async () => {
    await expect(element(by.id("email_field"))).toBeVisible();
  })
  it('sees if password field is visible', async () => {
    await expect(element(by.id("password_field"))).toBeVisible();
  })
  it('sees if confirm password field is visible', async () => {
    await expect(element(by.id("confirm_pass_field"))).toBeVisible();
  })
  it('sees if register button is visible', async () => {
    await expect(element(by.id("register_button"))).toBeVisible()
  })
});
describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    //await device.launchApp({newInstance: true});
  });

  it('HandMade logo is visible', async () => {
   //await expect(element(by.id('create_account'))).toBeVisible();
   await expect(element(by.id('handmade_logo'))).toBeVisible();
  })

  it('create account is visible', async () => {
   //await expect(element(by.id('create_account'))).toBeVisible();
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
   await expect(element(by.id('handmade_logo'))).toBeVisible();
   await element(by.id('email_login')).replaceText('user@user.com');
   await element(by.id('password_login')).replaceText('password');
   await element(by.id('submit_login')).tap();
   await expect(element(by.id('artisan_list'))).toBeVisible();
   
  })

  it('check artisan list is present after login', async () => {
   await expect(element(by.id('artisan_list'))).toBeVisible();
   await expect(element(by.id('listItem0'))).toBeVisible();
   await expect(element(by.id('listItem1'))).toBeVisible();
   await expect(element(by.id('listItem2'))).toBeVisible();
   await expect(element(by.id('listItem3'))).toBeVisible();
   await expect(element(by.id('listItem4'))).toBeVisible();
   await element(by.id('artisan_list')).scrollTo('bottom');
   await expect(element(by.id('listItem5'))).toBeVisible();
  })


});
