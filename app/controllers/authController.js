import { loginService } from '../services/authServices';

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} token object
 * */

const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const {
    response,
    status,
  } = await loginService(email, password);

  return res.status(status).send(response);
};

export { login };
