from pymongo import MongoClient

client = MongoClient("mongodb+srv://juandreyes:BBfQH7cn3mGpGdJz@cluster0.23vz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
try:
    client.admin.command('ping')
    print("Conexión exitosa a MongoDB!")
except Exception as e:
    print(e)

# Datos de equipos
# equipos = [
#     {
#         "nombre": "FC Barcelona",
#         "pais": "España",
#         "liga": "La Liga",
#         "fundacion": 1899,
#         "titulos": 75
#     },
#     {
#         "nombre": "Manchester United",
#         "pais": "Inglaterra",
#         "liga": "Premier League",
#         "fundacion": 1878,
#         "titulos": 66
#     },
#     {
#         "nombre": "Boca Juniors",
#         "pais": "Argentina",
#         "liga": "Primera División",
#         "fundacion": 1905,
#         "titulos": 68
#     }
# ]

# Datos de carreras
jugadores = [
    {
        "nombre": "Lionel Messi",
        "equipo_id": None,  # Este valor será el _id de FC Barcelona
        "nacionalidad": "Argentina",
        "posicion": "Delantero",
        "estatura": 170,
        "edad": 36
    },
    {
        "nombre": "Gerard Piqué",
        "equipo_id": None,  # _id de FC Barcelona
        "nacionalidad": "España",
        "posicion": "Defensa",
        "estatura": 194,
        "edad": 37
    },
    {
        "nombre": "Marcus Rashford",
        "equipo_id": None,  # _id de Manchester United
        "nacionalidad": "Inglaterra",
        "posicion": "Delantero",
        "estatura": 185,
        "edad": 26
    },
    {
        "nombre": "Harry Maguire",
        "equipo_id": None,  # _id de Manchester United
        "nacionalidad": "Inglaterra",
        "posicion": "Defensa",
        "estatura": 194,
        "edad": 30
    },
    {
        "nombre": "Carlos Tévez",
        "equipo_id": None,  # _id de Boca Juniors
        "nacionalidad": "Argentina",
        "posicion": "Delantero",
        "estatura": 173,
        "edad": 39
    },
    {
        "nombre": "Juan Román Riquelme",
        "equipo_id": None,  # _id de Boca Juniors
        "nacionalidad": "Argentina",
        "posicion": "Mediocampista",
        "estatura": 182,
        "edad": 45
    }
]

contrataciones = [
    {
        "jugador_id": "6719333476566333c83a1878",  # Este será el _id de Lionel Messi
        "equipo_id": "6719333376566333c83a1875",   # Este será el _id de FC Barcelona
        "fecha_contrato": "2000-07-01",
        "fecha_fin": "2021-08-05"
    },
    {
        "jugador_id": "6719333476566333c83a187a",  # _id de Marcus Rashford
        "equipo_id": "6719333476566333c83a1876",   # _id de Manchester United
        "fecha_contrato": "2015-01-01",
        "fecha_fin": "2024-06-30"
    },
    {
        "jugador_id": "6719333476566333c83a187c",  # _id de Carlos Tévez
        "equipo_id": "6719333476566333c83a1877",   # _id de Boca Juniors
        "fecha_contrato": "2015-07-13",
        "fecha_fin": "2021-06-01"
    }
]

# Base de datos y colecciones
DB = client.futbol
# EquiposCollection = DB.equipos
# JugadoresCollection = DB.jugadores
ContratacionesCollection = DB.contrataciones

# Insertar datos en la colección equipos
# try:
#     for equipo in equipos:
#         EquiposCollection.insert_one(equipo)
#     print("Universidades insertadas exitosamente")
# except Exception as e:
#     print(e)

# Insertar datos en la colección jugadores
# try:
#     for jugador in jugadores:
#         JugadoresCollection.insert_one(jugador)
#     print("Carreras insertadas exitosamente")
# except Exception as e:
#     print(e)

# Insertar datos en la colección contrataciones
try:
    for contrato in contrataciones:
        ContratacionesCollection.insert_one(contrato)
    print("contrataciones insertadas exitosamente")
except Exception as e:
    print(e)