#Inserts already made

from pymongo import MongoClient

Conection = MongoClient("mongodb+srv://juandreyes:<db_password>@cluster0.23vz8.mongodb.net/")

try:
    Conection.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

TeamsInfo = [
  {
    "Name": "FC Barcelona",
    "Nickname": "The Blaugranas",
    "City": "Barcelona",
    "Country": "Spain",
    "Stadium": "Spotify Camp Nou",
    "President": "Joan Laporta",
    "Head Coach": "Xavi Hernández",
    "Division": "La Liga",
    "Trophies": [
      "5 UEFA Champions League",
      "27 La Liga",
      "31 Copa del Rey",
      "5 UEFA Super Cup",
      "14 Supercopa de España"
    ]
  },
  {
    "Name": "Manchester United",
    "Nickname": "The Red Devils",
    "City": "Manchester",
    "Country": "England",
    "Stadium": "Old Trafford",
    "President": "Joel Glazer",
    "Head Coach": "Erik ten Hag",
    "Division": "Premier League",
    "Trophies": [
      "3 UEFA Champions League",
      "20 Premier League",
      "12 FA Cup",
      "21 FA Community Shield"
    ]
  },
  {
    "Name": "Bayern Munich",
    "Nickname": "The Bavarians",
    "City": "Munich",
    "Country": "Germany",
    "Stadium": "Allianz Arena",
    "President": "Herbert Hainer",
    "Head Coach": "Thomas Tuchel",
    "Division": "Bundesliga",
    "Trophies": [
      "6 UEFA Champions League",
      "33 Bundesliga",
      "20 DFB-Pokal",
      "6 UEFA Super Cup"
    ]
  },
  {
    "Name": "Juventus",
    "Nickname": "The Old Lady",
    "City": "Turin",
    "Country": "Italy",
    "Stadium": "Allianz Stadium",
    "President": "Gianluca Ferrero",
    "Head Coach": "Massimiliano Allegri",
    "Division": "Serie A",
    "Trophies": [
      "2 UEFA Champions League",
      "36 Serie A",
      "14 Coppa Italia",
      "9 Supercoppa Italiana"
    ]
  },
  {
    "Name": "Paris Saint-Germain",
    "Nickname": "Les Parisiens",
    "City": "Paris",
    "Country": "France",
    "Stadium": "Parc des Princes",
    "President": "Nasser Al-Khelaifi",
    "Head Coach": "Luis Enrique",
    "Division": "Ligue 1",
    "Trophies": [
      "0 UEFA Champions League",
      "11 Ligue 1",
      "14 Coupe de France",
      "10 Trophée des Champions"
    ]
  },
  {
    "Name": "Ajax",
    "Nickname": "The Sons of the Gods",
    "City": "Amsterdam",
    "Country": "Netherlands",
    "Stadium": "Johan Cruyff Arena",
    "President": "Frank Eijken",
    "Head Coach": "Maurice Steijn",
    "Division": "Eredivisie",
    "Trophies": [
      "4 UEFA Champions League",
      "36 Eredivisie",
      "20 KNVB Cup",
      "9 Johan Cruyff Shield"
    ]
  },
  {
    "Name": "Porto",
    "Nickname": "The Dragons",
    "City": "Porto",
    "Country": "Portugal",
    "Stadium": "Estadio do Dragão",
    "President": "Jorge Nuno Pinto da Costa",
    "Head Coach": "Sérgio Conceição",
    "Division": "Primeira Liga",
    "Trophies": [
      "2 UEFA Champions League",
      "30 Primeira Liga",
      "18 Taça de Portugal",
      "23 Supertaça Cândido de Oliveira"
    ]
  },
  {
    "Name": "Celtic FC",
    "Nickname": "The Bhoys",
    "City": "Glasgow",
    "Country": "Scotland",
    "Stadium": "Celtic Park",
    "President": "Peter Lawwell",
    "Head Coach": "Brendan Rodgers",
    "Division": "Scottish Premiership",
    "Trophies": [
      "1 UEFA Champions League",
      "53 Scottish Premiership",
      "41 Scottish Cup",
      "21 Scottish League Cup"
    ]
  },
  {
    "Name": "Sevilla FC",
    "Nickname": "Los Nervionenses",
    "City": "Seville",
    "Country": "Spain",
    "Stadium": "Ramón Sánchez Pizjuán",
    "President": "José Castro Carmona",
    "Head Coach": "Diego Alonso",
    "Division": "La Liga",
    "Trophies": [
      "0 UEFA Champions League",
      "1 La Liga",
      "7 UEFA Europa League",
      "5 Copa del Rey"
    ]
  }
]


DB = Conection.DATASTORAGE

TeamsCollection = DB.Teams

try:
    for Team in TeamsInfo:
        TeamsCollection.insert_one(Team)
    print("Teams successfully inserted")
except Exception as e:
    print(e)