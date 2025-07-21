// =================================================================
// ARCHIVO: server/index.js (COMPLETO Y MODIFICADO)
// DESCRIPCIÓN: Servidor conectado a Firestore para obtener datos reales
// de países Y proyectos.
// =================================================================
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- ¡IMPORTANTE! ---
// Coloca el archivo .json que descargaste en esta misma carpeta 'server'
// y renuéombralo a 'serviceAccountKey.json'.
const serviceAccount = require('./serviceAccountKey.json');

// --- Inicializar la conexión con Firebase ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Obtener una referencia a la base de datos de Firestore
const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3001;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === Rutas de la API (Ahora con datos reales) ===

// --- Ruta para obtener los países desde Firestore ---
app.get('/api/paises', async (req, res) => {
  try {
    console.log("Petición recibida en /api/paises (desde Firestore)");
    const paisesRef = db.collection('paises'); // Apunta a la colección 'paises'
    const snapshot = await paisesRef.get();

    if (snapshot.empty) {
      console.log('No se encontraron documentos en la colección "paises".');
      return res.status(200).json([]);
    }

    const paises = [];
    snapshot.forEach(doc => {
      paises.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(paises);
  } catch (error) {
    console.error("Error al obtener países desde Firestore:", error);
    res.status(500).send('Error interno del servidor al contactar la base de datos.');
  }
});


// --- Ruta para obtener los proyectos desde Firestore (MODIFICADA) ---
app.get('/api/proyectos', async (req, res) => {
  try {
    // Este console.log es la prueba de que estás usando el código nuevo
    console.log("Petición recibida en /api/proyectos (desde Firestore)");
    
    const proyectosRef = db.collection('proyectos'); // Apunta a la colección 'proyectos'
    const snapshot = await proyectosRef.get();

    if (snapshot.empty) {
      console.log('No se encontraron documentos en la colección "proyectos".');
      return res.status(200).json([]);
    }

    const proyectos = [];
    snapshot.forEach(doc => {
      proyectos.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(proyectos);
  } catch (error) {
    console.error("Error al obtener proyectos desde Firestore:", error);
    res.status(500).send('Error interno del servidor al contactar la base de datos.');
  }
});
// --- Ruta para obtener UN SOLO proyecto por su ID ---
app.get('/api/proyectos/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(`Petición para el proyecto individual: ${projectId}`);

    const proyectoRef = db.collection('proyectos').doc(projectId);
    const doc = await proyectoRef.get();

    if (!doc.exists) {
      res.status(404).send('No se encontró el proyecto con ese ID');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error("Error al obtener el proyecto individual:", error);
    res.status(500).send('Error interno del servidor.');
  }
});
// --- Rutas de simulación (sin cambios por ahora) ---
app.post('/api/usuarios/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`Intento de login para: ${email}`);
  res.json({ token: 'este_es_un_token_simulado_12345' });
});

app.post('/api/pagos/crear-intento-donacion', (req, res) => {
  const { monto, email } = req.body;
  console.log(`Intento de donación de ${monto} por ${email}`);
  res.json({ clientSecret: 'pi_12345_secret_67890_simulado' });
});


// === Iniciar el servidor ===
app.listen(PORT, () => {
  console.log(`Servidor de Alma ONG corriendo en http://localhost:${PORT}`);
});