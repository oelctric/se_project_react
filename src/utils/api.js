const baseUrl = 'http://localhost:3001';

const getItemList = () => {
  return fetch(`${baseUrl}/items`).then((response) => {
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  });
};

const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  });
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  });
};

export { getItemList, addItem, deleteItem };
