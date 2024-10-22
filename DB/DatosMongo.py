from pymongo import MongoClient

# Conexión a MongoDB
client = MongoClient("mongodb+srv://juandreyes:BBfQH7cn3mGpGdJz@cluster0.23vz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Verificar conexión
try:
    client.admin.command('ping')
    print("Conexión exitosa a MongoDB!")
except Exception as e:
    print(e)

# Datos de universidades
UniversidadesInfo = [
  {
    "Nombre": "Universidad de Oxford",
    "Ciudad": "Oxford",
    "País": "Reino Unido",
    "Fundada": 1096,
    "Tipo": "Pública",
    "Presidente": "Louise Richardson",
    "Estudiantes": 24000,
    "Ranking Global": 1,
    "Número de Facultades": 38,
    "Descripción": "Una de las universidades más antiguas y prestigiosas del mundo, con una rica historia académica y una cultura estudiantil vibrante."
  },
  {
    "Nombre": "Universidad de Harvard",
    "Ciudad": "Cambridge",
    "País": "Estados Unidos",
    "Fundada": 1636,
    "Tipo": "Privada",
    "Presidente": "Claudine Gay",
    "Estudiantes": 21000,
    "Ranking Global": 2,
    "Número de Facultades": 12,
    "Descripción": "Institución de élite conocida por su excelencia académica y su enfoque en la investigación y el liderazgo a nivel global."
  },
  {
    "Nombre": "Universidad de Tokio",
    "Ciudad": "Tokio",
    "País": "Japón",
    "Fundada": 1877,
    "Tipo": "Pública",
    "Presidente": "Teruo Fujii",
    "Estudiantes": 29000,
    "Ranking Global": 23,
    "Número de Facultades": 10,
    "Descripción": "La universidad más prestigiosa de Japón, famosa por sus programas de ingeniería y su investigación científica de vanguardia."
  },
  {
    "Nombre": "Universidad de Buenos Aires",
    "Ciudad": "Buenos Aires",
    "País": "Argentina",
    "Fundada": 1821,
    "Tipo": "Pública",
    "Presidente": "Ricardo Gelpi",
    "Estudiantes": 320000,
    "Ranking Global": 67,
    "Número de Facultades": 13,
    "Descripción": "La mayor universidad de Argentina, conocida por su calidad académica en las áreas de derecho, medicina y ciencias sociales."
  },
  {
    "Nombre": "Universidad Nacional Autónoma de México (UNAM)",
    "Ciudad": "Ciudad de México",
    "País": "México",
    "Fundada": 1551,
    "Tipo": "Pública",
    "Presidente": "Enrique Graue Wiechers",
    "Estudiantes": 350000,
    "Ranking Global": 103,
    "Número de Facultades": 15,
    "Descripción": "Una de las universidades más grandes y prestigiosas de América Latina, con una fuerte tradición en artes, ciencias y humanidades."
  }
]

# Datos de carreras
CarrerasInfo = [
  {
    "Nombre de la Carrera": "Licenciatura en Ciencias de la Computación",
    "Facultad": "División de Ciencias Matemáticas, Físicas y de la Vida",
    "Universidad": "Universidad de Oxford",
    "Duración": "4 años",
    "Tipo": "Pregrado",
    "Asignaturas Principales": ["Algoritmos", "Estructuras de Datos", "Inteligencia Artificial", "Bases de Datos"],
    "Requisitos de Admisión": "Promedio alto en matemáticas, examen de admisión, entrevista.",
    "Tasa de Empleabilidad": "98%",
    "Descripción": "Carrera enfocada en el desarrollo de habilidades técnicas en computación, programación y análisis de datos, con un fuerte énfasis en la investigación y el trabajo práctico."
  },
  {
    "Nombre de la Carrera": "Maestría en Administración de Empresas (MBA)",
    "Facultad": "Escuela de Negocios de Harvard",
    "Universidad": "Universidad de Harvard",
    "Duración": "2 años",
    "Tipo": "Posgrado",
    "Asignaturas Principales": ["Finanzas", "Marketing", "Liderazgo", "Emprendimiento"],
    "Requisitos de Admisión": "Experiencia laboral mínima de 3 años, GMAT o GRE, ensayo personal.",
    "Tasa de Empleabilidad": "95%",
    "Descripción": "Programa de MBA enfocado en la formación de líderes empresariales capaces de gestionar organizaciones complejas y tomar decisiones estratégicas en entornos competitivos globales."
  },
  {
    "Nombre de la Carrera": "Ingeniería Mecánica",
    "Facultad": "Facultad de Ingeniería",
    "Universidad": "Universidad de Tokio",
    "Duración": "4 años",
    "Tipo": "Pregrado",
    "Asignaturas Principales": ["Termodinámica", "Mecánica de Fluidos", "Ciencia de Materiales", "Robótica"],
    "Requisitos de Admisión": "Examen de admisión nacional, alto desempeño en física y matemáticas.",
    "Tasa de Empleabilidad": "93%",
    "Descripción": "Carrera orientada a formar ingenieros con conocimientos en diseño y desarrollo de sistemas mecánicos, automotrices y robóticos, con un enfoque en la innovación tecnológica."
  },
  {
    "Nombre de la Carrera": "Abogacía",
    "Facultad": "Facultad de Derecho",
    "Universidad": "Universidad de Buenos Aires",
    "Duración": "5 años",
    "Tipo": "Pregrado",
    "Asignaturas Principales": ["Derecho Civil", "Derecho Penal", "Derecho Internacional", "Derechos Humanos"],
    "Requisitos de Admisión": "Examen de ingreso, promedio alto en historia y ciencias sociales.",
    "Tasa de Empleabilidad": "88%",
    "Descripción": "Una de las carreras más reconocidas en la región, con un fuerte enfoque en la formación de abogados especializados en múltiples áreas del derecho, incluyendo derecho internacional y derechos humanos."
  },
  {
    "Nombre de la Carrera": "Licenciatura en Filosofía",
    "Facultad": "Facultad de Filosofía y Letras",
    "Universidad": "Universidad Nacional Autónoma de México (UNAM)",
    "Duración": "4 años",
    "Tipo": "Pregrado",
    "Asignaturas Principales": ["Ética", "Metafísica", "Filosofía del Lenguaje", "Filosofía Política"],
    "Requisitos de Admisión": "Examen de admisión, promedio alto en literatura y ciencias sociales.",
    "Tasa de Empleabilidad": "76%",
    "Descripción": "Carrera enfocada en el estudio del pensamiento filosófico desde la antigüedad hasta la actualidad, con énfasis en la crítica, la argumentación y la interpretación filosófica en contextos contemporáneos."
  }
]

# Base de datos y colecciones
DB = client.tarea
UniversidadesCollection = DB.Universidades
CarrerasCollection = DB.Carreras

# Insertar datos en la colección Universidades
try:
    for Universidad in UniversidadesInfo:
        UniversidadesCollection.insert_one(Universidad)
    print("Universidades insertadas exitosamente")
except Exception as e:
    print(e)

# Insertar datos en la colección Carreras
try:
    for Carrera in CarrerasInfo:
        CarrerasCollection.insert_one(Carrera)
    print("Carreras insertadas exitosamente")
except Exception as e:
    print(e)