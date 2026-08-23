const baseUrl = 'http://localhost:3001';

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  if (!response.body) {
    return undefined;
  }

  return response.json();
};

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  authorization: `Bearer ${token}`,
});

const getItemList = () => fetch(`${baseUrl}/items`).then(checkResponse);

const addItem = ({ name, imageUrl, weather }, token) =>
  fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);

const deleteItem = (id, token) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(checkResponse);

const addCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: authHeaders(token),
  }).then(checkResponse);

const removeCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(checkResponse);

const updateProfile = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);

export {
  getItemList,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
};
