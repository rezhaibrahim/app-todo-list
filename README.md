Todo List API dengan Restify dan JWT Authentication
API ini menyediakan fitur untuk membuat dan mengelola checklist serta item-item di dalamnya, dengan menggunakan Restify sebagai framework backend dan JSON Web Token (JWT) untuk autentikasi.

Fitur
Login: Menggunakan username dan password untuk login dan mendapatkan token JWT.
Create Checklist: Membuat checklist baru.
Get Checklists: Menampilkan daftar checklist yang sudah dibuat.
Get Checklist Detail: Menampilkan detail dari checklist tertentu.
Create Item in Checklist: Menambahkan item ke dalam checklist.
Get Item Detail: Menampilkan detail item dalam checklist.
Update Item: Mengubah detail item dalam checklist.
Update Item Status: Mengubah status item (misalnya menyatakan bahwa item sudah selesai).
Delete Item: Menghapus item dari checklist.
Delete Checklist: Menghapus checklist beserta item-innya.
Persyaratan
Node.js (Versi terbaru yang stabil)
Restify
JWT (JSON Web Token)
bcrypt (untuk hashing password)
fs (untuk membaca dan menulis ke file JSON)
Instalasi
Clone repository ini:

bash
Copy
Edit
git clone https://github.com/username/todolist-api.git
cd todolist-api
Install dependencies:

bash
Copy
Edit
npm install
Jalankan server:

bash
Copy
Edit
node server.js
Server akan berjalan pada http://localhost:3000.

Endpoints API
1. Login
Metode: POST
URL: /login
Request Body:
json
Copy
Edit
{
  "username": "johndoe",
  "password": "password123"
}
Response:
Sukses:
json
Copy
Edit
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
Gagal:
json
Copy
Edit
{
  "message": "Invalid username or password"
}
2. Create Checklist
Metode: POST
URL: /checklist
Headers:
Authorization: Bearer <JWT_TOKEN>
Request Body:
json
Copy
Edit
{
  "name": "My New Checklist"
}
Response:
json
Copy
Edit
{
  "message": "Checklist created successfully",
  "checklist": {
    "id": 1,
    "name": "My New Checklist",
    "items": []
  }
}
3. Get Checklists
Metode: GET
URL: /checklists
Headers:
Authorization: Bearer <JWT_TOKEN>
Response:
json
Copy
Edit
{
  "checklists": [
    {
      "id": 1,
      "name": "My New Checklist",
      "items": []
    }
  ]
}
4. Get Checklist Detail
Metode: GET
URL: /checklist/:id
Headers:
Authorization: Bearer <JWT_TOKEN>
Response:
json
Copy
Edit
{
  "checklist": {
    "id": 1,
    "name": "My New Checklist",
    "items": []
  }
}
5. Create Item in Checklist
Metode: POST
URL: /checklist/:id/item
Headers:
Authorization: Bearer <JWT_TOKEN>
Request Body:
json
Copy
Edit
{
  "name": "New Item"
}
Response:
json
Copy
Edit
{
  "message": "Item added successfully",
  "item": {
    "id": 1,
    "name": "New Item",
    "status": "pending"
  }
}
6. Get Item Detail
Metode: GET
URL: /checklist/:id/item/:itemId
Headers:
Authorization: Bearer <JWT_TOKEN>
Response:
json
Copy
Edit
{
  "item": {
    "id": 1,
    "name": "New Item",
    "status": "pending"
  }
}
7. Update Item
Metode: PUT
URL: /checklist/:id/item/:itemId
Headers:
Authorization: Bearer <JWT_TOKEN>
Request Body:
json
Copy
Edit
{
  "name": "Updated Item"
}
Response:
json
Copy
Edit
{
  "message": "Item updated successfully",
  "item": {
    "id": 1,
    "name": "Updated Item",
    "status": "pending"
  }
}
8. Update Item Status
Metode: PUT
URL: /checklist/:id/item/:itemId/status
Headers:
Authorization: Bearer <JWT_TOKEN>
Request Body:
json
Copy
Edit
{
  "status": "completed"
}
Response:
json
Copy
Edit
{
  "message": "Item status updated successfully",
  "item": {
    "id": 1,
    "name": "Updated Item",
    "status": "completed"
  }
}
9. Delete Item
Metode: DELETE
URL: /checklist/:id/item/:itemId
Headers:
Authorization: Bearer <JWT_TOKEN>
Response:
json
Copy
Edit
{
  "message": "Item deleted successfully"
}
10. Delete Checklist
Metode: DELETE
URL: /checklist/:id
Headers:
Authorization: Bearer <JWT_TOKEN>
Response:
json
Copy
Edit
{
  "message": "Checklist deleted successfully"
}
Catatan
Semua endpoint yang berkaitan dengan checklist dan item memerlukan autentikasi menggunakan JWT. Token dapat diperoleh dengan melakukan login terlebih dahulu di endpoint /login.
Semua data akan disimpan di file data.json di server. Pastikan untuk memulai server terlebih dahulu menggunakan node server.js.
Pengujian
Gunakan Postman atau Insomnia untuk menguji API. Jangan lupa untuk menyertakan token JWT dalam header Authorization ketika mengakses endpoint yang membutuhkan autentikasi.