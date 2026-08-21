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

const getItemList = () =>
  fetch(`${baseUrl}/items`).then(checkResponse);

const addItem = ({ name, imageUrl, weather }) =>
  fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);

const deleteItem = (id) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(checkResponse);

export { getItemList, addItem, deleteItem };
