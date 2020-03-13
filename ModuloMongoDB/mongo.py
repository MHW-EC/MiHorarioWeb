from pymongo import MongoClient
import os

#Conexcion a Base de datos
MONGO_URI = 'mongodb://localhost/'
client = MongoClient(MONGO_URI)

#Crea la base de datos
#Si no exsite crea una con el nombre expecificado
db = client['MiHorarioDB']
#Creacion de una colecion
coleccion = db['materias']

def convertHTMLtoJSON(html):
  print('Procesando...')
  
'''ACTUALIZACION, VER EL COMENTARIO DE LA LINEA 81 ''' 
data = {
  '_id': '',
    'codigo': '',
    'nombre': '',
    'profesor': '',
    'paralelo': 0,
    'cupo_maximo': 0,
    'examenes':{'parcial':{'fecha': time(),
                          'desde': time(),
                          'hasta': time()},
                'final':{'fecha': time(),
                          'desde': time(),
                          'hasta': time()},
                'mejoramiento':{'fecha': time(),
                          'desde': time(),
                          'hasta': time()}
              },
    'clases': [{'dia':{'desde':time(),
                        'hasta':time(),
                        'aula':'',
                        'edificio':''}
                }],
    'fecha_act': time()
    }

def updateOrDiscard(materiaJSON):

  filtroCodigo = {'_id': materiaJSON['_id']}
  materiaDB = coleccion.find(filtroCodigo)

  BOOL_NOMBRE = materiaDB['nombre'] != materiaJSON['nombre']
  BOOL_CLASES = materiaDB['clases'] != materiaJSON['clases']
  BOOL_PROF = materiaDB['profesor'] != materiaJSON['profesor']
  BOOL_EXAMS = materiaDB['examenes'] != materiaJSON['examenes']
  BOOL_CUPO = materiaDB['cupo_maximo'] != materiaJSON['cupo_maximo']
  
  if BOOL_NOMBRE or BOOL_CLASES or BOOL_PROF or BOOL_EXAMS or BOOL_CUPO:

    actualizada = coleccion.replace_one(filtroCodigo, materiaJSON, upsert=True)
    print('Materia actualizada: %s Paralelo: %s' %(actualizada['nombre'], actualizada['paralelo']))
    return 1
  
  return 0


rutaMaterias = '../ModuloScrap/Materias/'
contActualizadas = 0

for carpetaMateria in os.listdir(rutaMaterias):

  rutaCarpetaMateria = os.path.join(rutaMaterias, carpetaMateria)

  nombreMateria = os.listdir(rutaCarpetaMateria)[0]
  rutaCompleta = os.path.join(rutaCarpetaMateria, nombreMateria)
  materiaHTML = open(rutaCompleta, 'r')
  
  filter = {'price': 300}
  productos = coleccion.find(filter)

  print(os.path.basename(rutaCompleta))
  """
  Josue te toca este metodo
  Tienes que añadir el atributo _id y que se componga de el 
  <codigo de la materia>_<paralelo>, ejemplo: CPG1005_5
  Ya que con esto podre buscar en la base de datos si busco
  por el codigo obtendre toodos los paralelos y asi sera mejor

  Entonces, en teoria tu metodo convertHTMLtoJSON me daras una lista de JSON's
  por eso yo lo itero aca abajo, 3.1415-las
  """
  materiasJSON = convertHTMLtoJSON(materiaHTML)
  #Ya termine
  for materiaJSON in materiasJSON:
    contActualizadas += updateOrDiscard(materiaJSON)
  break




