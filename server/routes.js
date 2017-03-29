
export default (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'Document Management API' });
  });
};
