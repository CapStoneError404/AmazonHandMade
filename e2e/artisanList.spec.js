describe('Artisan List is Visible', () => {
   beforeEach(async () => {
     //await device.reloadReactNative();
     //await device.launchApp({newInstance: true});
   });

   it('enter login information and submit', async () => {
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

   it('logout successfully', async () => {
   await expect(element(by.text('Settings'))).toBeVisible();
   await element(by.text('Settings')).tap();
   await element(by.id('logout_button')).tap();
   await expect(element(by.id('handmade_logo'))).toBeVisible();

  })
   
 });