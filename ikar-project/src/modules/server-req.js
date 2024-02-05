// ! Запросы на сервер

/** @module Server-req */

/**
 * Возвращает массив с объектами пользователей
 * @returns {Array}
 */
export async function getUserList() {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  return data;
}

export async function addNewUser(userObj) {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  });
  const data = await response.json()
  return data;
}


/**
 * Возвращает объект пользователя по ID
 * @param {string} userId - ID пользователя
 * @returns {object} Объект пользователя
 */
export async function getUser(userId) {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  const data = await response.json();
  return data;
}

export async function editUser(userObj) {
  await fetch(`http://localhost:3000/api/users/${userObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  });
}

export async function deleteUser(userId) {
  await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: 'DELETE'
  });
}