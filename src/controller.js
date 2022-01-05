import service from './service.js';

const controller = {
  async healthCheck(_req, res) {
    const result = await service.healthCheck();
    res.status(200).json(result);
  },
  async create(req, res) {
    const info = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    const result = await service.create(info);
    res.status(200).json(result);
  },
  async authenticate(req, res) {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    const jwt = await service.authenticate(credentials);
    res.status(200).json(jwt);
  },
  async read(req, res) {
    const email = req.user.email;
    const result = await service.read(email);
    res.status(200).json(result);
  },
  async update(req, res) {
    const email = req.user.email;
    const newInfo = req.body;
    const result = await service.update(email, newInfo);
    res.status(200).json(result);
  },
  async delete(req, res) {
    const email = req.user.email;
    const result = await service.delete(email);
    res.status(200).json(result);
  },
};

export default controller;
