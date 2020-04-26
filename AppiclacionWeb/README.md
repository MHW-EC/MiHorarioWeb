# MERN-Stack-template

Platilla de proyecto con Mongo, Express, React y Node

## Instalación

Para la instalación de los módulos requeridos ejecutar el sigueinte comando en la ruta del proyecto:

`npm i`

## Procesos para crear la app en Heroku

`heroku create <nombre de la app>`

Luego si es necesario se añaden addons, si es desde consola se tinee que especificar el nombre y plan desde la pagina web tambien se puede

Para probar la applicacion en un entorno local de heroku:

`heroku local`

Para subir la app completa e inicar la app:

`git push heroku master`

Si se usa mLab MongoDB, para improtar un archivo .json local se tiene que usar el siguiente comando (en la terminal de su preferecnia pero en la ruta de su proyecto) pero tener en cuenta de usar el link que provee el portal de mLab:

`mongoimport -h <link del portal> -d <account> -c <nombre de su coleccion> -u <user> -p <password> --file <ruta del archivo>`

## Scripts útiles

Estos scripts va en la sección scripts de archivo package.json
start: para inicar la app
dev: para inicar la app en modo desarollo
build: para generar la app con los archivos de producción
webpack: para traducir los archivos de react en modo desarollo

`{

    "start": "node src/index.js",

    "dev": "nodemon src/index.js",

    "build": "webpack --mode production",

    "webpack": "webpack --mode development --watch",

}`
