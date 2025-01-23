const authenticate = require('./middlewares/authenticate');
const restify = require('restify');
const fs = require('fs');

const authController = require('./controllers/authcontroller');
const checklistController = require('./controllers/checklistcontroller');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.use(restify.plugins.bodyParser());
const dataFile = './data.json';


  server.get('/users', (req, res, next) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.send(200, data);
    return next();
  });


// Endpoint auth
server.post('/login', authController.login);
server.post('/register', authController.register);

server.post('/checklist', authenticate,checklistController.createChecklist);
server.del('/checklist/:id',authenticate, checklistController.deleteChecklist);
server.get('/checklists',authenticate, checklistController.getChecklists);
server.get('/checklist/:id',authenticate, checklistController.getChecklistDetail);
server.post('/checklist/:id/item',authenticate, checklistController.addItemToChecklist);
server.get('/checklist/:id/item/:itemId',authenticate, checklistController.getItemDetail);
server.put('/checklist/:id/item/:itemId',authenticate, checklistController.updateItem);
server.put('/checklist/:id/item/:itemId/status',authenticate, checklistController.updateItemStatus);
server.del('/checklist/:id/item/:itemId',authenticate, checklistController.deleteItem);
  
  const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});