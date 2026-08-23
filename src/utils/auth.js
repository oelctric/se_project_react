const baseUrl = 'http://localhost:3001';

const checkResponse = (response) => {
  if (!response.ok) {
    const error = new Error(`API error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

const signup = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);

const signin = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export { signup, signin, checkToken };
