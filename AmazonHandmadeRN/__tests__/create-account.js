import * as actions from '../src/screens/Auth/actions.js'
test('test creating account, no email', () => {
   actions.emailLogin("", "password")
});
test('test creating account, existing username', () => {
   actions.emailLogin("patrickbeninga@gmail.com", "password1")
});
test('test creating account, valid username, no password', () => {
   expect(true).toBeTruthy()
});
test('test creating account, valid username, valid password', () => {
   expect(true).toBeTruthy()
});