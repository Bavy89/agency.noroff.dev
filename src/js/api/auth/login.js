import { Store } from '../../storage/storage.js';
import { message } from '../../utilities/message/message.js';
import { callLoginApi } from './handleAuthServices.js';

/**
 * @param {UserData} userData - The user data to store.
 * @param {boolean} rememberLogin - Whether or not to remember the login
 * @param {Store} Store - The store class.
 */
function storeProfileData(userData, rememberLogin, Store) {
  const { token, role, id, email } = userData;

  new Store('token', token, rememberLogin);
  new Store('role', role, rememberLogin);
  new Store('email', email, rememberLogin);
  new Store('id', id, rememberLogin);
}



/**
 * @param {Store} Store - The store class.
 */
function clearProfileData(Store) {
  new Store('token').clear();
  new Store('role').clear();
  new Store('email').clear();
  new Store('id').clear();
}

function handleLoginRedirect(url) {
  window.location.replace(url);
}

function getRedirectUrl(role) {
  switch (role) {
    case 'Applicant':
      return '/pages/user/index.html';
    case 'Admin':
      return '#'; // TODO: Add admin page url
    case 'Client':
      return '#'; // TODO: Add client page url
    default:
      return '/pages/user/index.html';
  }
}

/**
 * Function for logging in an existing user in database and storing the returned token in session or localstorage
 * @param {object} profile Values from loginForm
 * @param {string} profile.email Email of the user
 * @param {string} profile.password Plain text password
 * @param {string} [profile.remember] If the user checkbox is checked it will equal to the string 'on'
 * @returns {void}
 */
export async function login(profile) {
  const { remember, email, password } = profile;
  const rememberLogin = remember === 'on';

  try {
    const { userData, error } = await callLoginApi(email, password);

    if (error) {
      return (errorContainer.innerHTML = error?.message);
    }

    const { role } = userData;


        if (id === id) {
          // spiderman.gif
          new Store('Role', 'user', Boolean(remember !== 'on'));
         window.location.replace('../../../pages/user/index.html');

        } else if (profile.admin) {
          new Store('Role', 'admin', Boolean(remember !== 'on'));
          window.location.replace('#'); // TODO: Add admin page url
        } else {
          window.location.replace('../../../pages/user/index.html');
        }
        break;
      case 403:
        message('danger', 'Incorrect e-mail/password', '#errorContainer');
        break;
      default:
        message('danger', 'Invalid login credentials. Please try again', '#errorContainer');
        break;
    }

    clearProfileData(Store); // Clear any previous data
    storeProfileData(userData, rememberLogin, Store);

    const redirectUrl = getRedirectUrl(role);
    handleLoginRedirect(redirectUrl);

  } catch (error) {
    message('danger', `An unknown error occured, please try again later`, '#errorContainer');
    console.error(error);
  }
}

