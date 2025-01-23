const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'test'; 
const dataFile = './data.json'; 
const SALT_ROUNDS = 10;
const login = async (req, res) => {
  const { username, password } = req.body;
console.log(req.body);


  // Membaca data pengguna dari file JSON
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  const user = data.find(u => u.username === username);

  if (!user) {
    res.send(401, { message: 'Invalid username or password' });
    return;
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.send(401, { message: 'Invalid username or password' });
    return;
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username }, // Payload token
    SECRET_KEY,                              // Secret key
    { expiresIn: '1h' }                      // Token berlaku 1 jam
  );

  res.send(200, { message: 'Login successful', token });
};
const register = async (req, res) => {
    const { name, email, username, password } = req.body;
  
    // Validasi input
    if (!name || !email || !username || !password) {
      res.send(400, { message: 'All fields are required' });
      return;
    }
  
    // Baca data pengguna yang sudah ada
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  
    // Periksa apakah username atau email sudah digunakan
    const existingUser = data.find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      res.send(400, { message: 'Username or email already exists' });
      return;
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
    // Tambahkan pengguna baru
    const newUser = {
      id: data.length + 1,
      name,
      email,
      username,
      password: hashedPassword,
    };
    data.push(newUser);
  
    // Simpan data pengguna baru ke file
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  
    res.send(201, { message: 'User registered successfully', user: newUser });
  };

module.exports = { login, register };
