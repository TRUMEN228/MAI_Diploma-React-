const { existsSync, readFileSync, writeFileSync } = require('fs');
const { createServer } = require('http');

const DB_FILE = process.env.DB_FILE || './db.json';
const PORT = process.env.PORT || 3000;
const URI_PREFIX = '/api/users';

/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
  * Асинхронно считывает тело запроса и разбирает его как JSON
  * @param {Object} req
  * @throws {ApiError}
  * @returns {Object}
  */
function drainJson(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(JSON.parse(data));
    });
  });
}

/**
 * Проверяет входные данные и создаёт из них корректный объект пользователя
 * @param {Object} data
 * @throws {ApiError}
 * @returns {{ type: string, login: string, password: string, surname: string, name: string, lastname: string, birthday: string, email: string }}
 */
function makeUserFromData(data) {
  const errors = [];

  function asString(v) {
    return v && String(v).trim() || '';
  }

  const user = {
    type: asString(data.type),
    login: asString(data.login),
    password: asString(data.password),
    surname: asString(data.surname),
    name: asString(data.name),
    lastname: asString(data.lastname),
    birthday: asString(data.birthday),
    email: asString(data.email)
  };

  if (!user.type) errors.push({ field: 'type', message: 'Не указан тип учетной записи' });
  if (!user.password) errors.push({ field: 'password', message: 'Не указан пароль' });
  if (!user.surname) errors.push({ field: 'surname', message: 'Не указана фамилия' });
  if (!user.name) errors.push({ field: 'name', message: 'Не указано имя' });
  if (!user.birthday) errors.push({ field: 'birthday', message: 'Не указана дата рождения' });
  if (!user.email) errors.push({ field: 'email', message: 'Не указан e-mail' });

  if (errors.length) throw new ApiError(422, { errors });

  return user;
}

/**
 * Возвращает список пользователей из базы данных
 * @param {{ search: string }} [params]
 * @returns {{ id: string, type: string, login: string, password: string, surname: string, name: string, lastname:string, birthday: string, email: string }[]}
 */
function getUserList(params = {}) {
  const users = JSON.parse(readFileSync(DB_FILE) || '[]');
  if (params.search) {
    const search = params.search.trim().toLowerCase();
    return users.filter(user => [
        user.surname,
        user.name,
        user.lastname,
        user.birthday,
        user.email
      ]
      .some(str => str.toLowerCase().includes(search))
    );
  }

  return users;
}

/**
 * Создаёт и сохраняет пользователя в базу данных
 * @throws {ApiError}
 * @param {Object} data
 * @returns {{ id: string, type: string, login: string, password: string, surname: string, name: string, lastname:string, birthday: string, email: string }}
 */
function createUser(data) {
  const newItem = makeUserFromData(data);
  newItem.id = Date.now().toString();
  writeFileSync(DB_FILE, JSON.stringify([...getUserList(), newItem]), { encoding: 'utf8' });

  return newItem;
}

/**
 * Возвращает объект пользователя по его ID
 * @param {string} itemId
 * @throws {ApiError}
 * @returns {{ id: string, type: string, login: string, password: string, surname: string, name: string, lastname:string, birthday: string, email: string }}
 */
function getUser(itemId) {
  const user = getUserList().find(({ id }) => id === itemId);
  if (!user) throw new ApiError(404, { message: 'User Not Found' })
  return user;
}

/**
 * Изменяет пользователя с указанным ID и сохраняет изменения в базу данных
 * @param {string} itemId
 * @param {{ id: string, type?: string, login?: string, password?: string, surname?: string, name?: string, lastname?:string, birthday?: string, email?: string }} data
 * @throws {ApiError}
 * @throws {ApiError}
 * @returns {{ id: string, type: string, login: string, password: string, surname: string, name: string, lastname:string, birthday: string, email: string }}
 */
function updateUser(itemId, data) {
  const users = getUserList();
  const itemIndex = users.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, { message: 'User Not Found' });
  Object.assign(users[itemIndex], makeUserFromData({ ...users[itemIndex], ...data }));
  writeFileSync(DB_FILE, JSON.stringify(users), { encoding: 'utf8' });
  return users[itemIndex];
}

/**
 * Удаляет пользователя из базы данных
 * @param {string} itemId
 * @returns {{}}
 */
function deleteUser(itemId) {
  const users = getUserList();
  const itemIndex = users.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, { message: 'User Not Found' });
  users.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(users), { encoding: 'utf8' });
  return {};
}

if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, '[]', { encoding: 'utf8' });

module.exports = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.end();
    return;
  }

  if(!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  const [uri, query] = req.url.substring(URI_PREFIX.length).split('?');
  const queryParams = {};

  if (query) {
    for (const piece of query.split('&')) {
      const [key, value] = piece.split('=');
      queryParams[key] = value ? decodeURIComponent(value) : '';
    }
  }

  try {
    const body = await (async () => {
      if (uri === '' || uri === '/') {
        if (req.method === 'GET') return getUserList(queryParams);
        if (req.method === 'POST') {
          const createdItem = createUser(await drainJson(req));
          res.statusCode = 201;
          res.setHeader('Access-Control-Expose-Headers', 'Location');
          res.setHeader('Location', `${URI_PREFIX}/${createdItem.id}`);
          return createdItem;
        }
      } else {
        const itemId = uri.substring(1);
        if (req.method === 'GET') return getUser(itemId)
        if (req.method === 'PATCH') return updateUser(itemId, await drainJson(req));
        if (req.method === 'DELETE') return deleteUser(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Server Error' }));
      console.error(err);
    }
  }
})
  .on('listening', () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
      console.log('Нажмите CTRL+C, чтобы остановить сервер');
      console.log('Доступные методы:');
      console.log(`GET ${URI_PREFIX} - получить список клиентов, в query параметр search можно передать поисковый запрос`);
      console.log(`POST ${URI_PREFIX} - создать клиента, в теле запроса нужно передать объект { type: string, login: string, password: string, surname: string, name: string, lastname?: string, birthday: string, email: string }`);
      console.log(`GET ${URI_PREFIX}/{id} - получить клиента по его ID`);
      console.log(`PATCH ${URI_PREFIX}/{id} - изменить клиента с ID, в теле запроса нужно передать объект { surname: string, name: string, lastname?: string, login: string, birthday: string, email: string }`);
      console.log(`DELETE ${URI_PREFIX}/{id} - удалить клиента по ID`);
    }
  })
  .listen(PORT);
