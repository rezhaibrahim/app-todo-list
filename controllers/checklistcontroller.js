const fs = require('fs');
const path = require('path');

const dataFile = './data-checklist.json';

const readData = () => {
  return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// 1. API untuk Membuat Checklist
const createChecklist = (req, res, next) => {
  const { name,description } = req.body;
  if (!name) {
    res.send(400, { message: 'Checklist name is required' });
    return next();
  }

  const data = readData();
  const newChecklist = {
    id: data.length + 1,
    name,
    description,
    items: []
  };

  data.push(newChecklist);
  writeData(data);

  res.send(201, { message: 'Checklist created successfully', checklist: newChecklist });
  return next();
};

// 2. API untuk Menghapus Checklist
const deleteChecklist = (req, res, next) => {
  const { id } = req.params;
  const data = readData();

  const index = data.findIndex((checklist) => checklist.id === parseInt(id));
  if (index === -1) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  data.splice(index, 1);
  writeData(data);

  res.send(200, { message: 'Checklist deleted successfully' });
  return next();
};

// 3. API untuk Menampilkan Semua Checklist
const getChecklists = (req, res, next) => {
  const data = readData();
  res.send(200, { checklists: data });
  return next();
};

// 4. API untuk Menampilkan Detail Checklist
const getChecklistDetail = (req, res, next) => {
  const { id } = req.params;
  const data = readData();

  const checklist = data.find((checklist) => checklist.id === parseInt(id));
  if (!checklist) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  res.send(200, { checklist });
  return next();
};

// 5. API untuk Menambahkan Item dalam Checklist
const addItemToChecklist = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.send(400, { message: 'Item name is required' });
    return next();
  }

  const data = readData();
  const checklist = data.find((checklist) => checklist.id === parseInt(id));

  if (!checklist) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  const newItem = {
    id: checklist.items.length + 1,
    name,
    completed: false
  };

  checklist.items.push(newItem);
  writeData(data);

  res.send(201, { message: 'Item added successfully', item: newItem });
  return next();
};

// 6. API untuk Menampilkan Detail Item
const getItemDetail = (req, res, next) => {
  const { id, itemId } = req.params;
  const data = readData();

  const checklist = data.find((checklist) => checklist.id === parseInt(id));
  if (!checklist) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  const item = checklist.items.find((item) => item.id === parseInt(itemId));
  if (!item) {
    res.send(404, { message: 'Item not found' });
    return next();
  }

  res.send(200, { item });
  return next();
};

// 7. API untuk Mengubah Item
const updateItem = (req, res, next) => {
  const { id, itemId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.send(400, { message: 'Item name is required' });
    return next();
  }

  const data = readData();
  const checklist = data.find((checklist) => checklist.id === parseInt(id));

  if (!checklist) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  const item = checklist.items.find((item) => item.id === parseInt(itemId));
  if (!item) {
    res.send(404, { message: 'Item not found' });
    return next();
  }

  item.name = name;
  writeData(data);

  res.send(200, { message: 'Item updated successfully', item });
  return next();
};

// 8. API untuk Mengubah Status Item
const updateItemStatus = (req, res, next) => {
  const { id, itemId } = req.params;
  const { completed } = req.body;

  const data = readData();
  const checklist = data.find((checklist) => checklist.id === parseInt(id));

  if (!checklist) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  const item = checklist.items.find((item) => item.id === parseInt(itemId));
  if (!item) {
    res.send(404, { message: 'Item not found' });
    return next();
  }

  item.completed = completed;
  writeData(data);

  res.send(200, { message: 'Item status updated successfully', item });
  return next();
};

// 9. API untuk Menghapus Item
const deleteItem = (req, res, next) => {
  const { id, itemId } = req.params;
  const data = readData();

  const checklist = data.find((checklist) => checklist.id === parseInt(id));
  if (!checklist) {
    res.send(404, { message: 'Checklist not found' });
    return next();
  }

  const itemIndex = checklist.items.findIndex((item) => item.id === parseInt(itemId));
  if (itemIndex === -1) {
    res.send(404, { message: 'Item not found' });
    return next();
  }

  checklist.items.splice(itemIndex, 1);
  writeData(data);

  res.send(200, { message: 'Item deleted successfully' });
  return next();
};

module.exports = {
  createChecklist,
  deleteChecklist,
  getChecklists,
  getChecklistDetail,
  addItemToChecklist,
  getItemDetail,
  updateItem,
  updateItemStatus,
  deleteItem
};
