// import express
const express = require('express');
const { pool, testConnection } = require('./database');

//create a new express app
const app = express();

//create a new port
const PORT = process.env.PORT || 3000;

// middleware to parse the body of the request JSON
app.use(express.json());

// Probar conexión a la base de datos al iniciar
testConnection();

// GET /users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID debe ser un número válido' });
        }

        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST /users
// Crear un nuevo usuario
// Body JSON esperado: { name: string, email: string }
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body || {};

        if (!name || !email) {
            return res.status(400).json({ error: 'Nombre y email son requeridos' });
        }

        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Formato de email inválido' });
        }

        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creando usuario:', error);
        
        // Manejo específico para email duplicado
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// PUT /users/:id
// Actualizar un usuario existente
app.put('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email } = req.body || {};

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID debe ser un número válido' });
        }

        if (!name || !email) {
            return res.status(400).json({ error: 'Nombre y email son requeridos' });
        }

        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Formato de email inválido' });
        }

        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        
        // Manejo específico para email duplicado
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/**
 * DELETE /users/:id
 * Elimina un usuario por id
 */
app.delete('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID debe ser un número válido' });
        }

        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint de salud para verificar el estado de la API y DB
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ 
            status: 'OK', 
            database: 'Connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'ERROR', 
            database: 'Disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});