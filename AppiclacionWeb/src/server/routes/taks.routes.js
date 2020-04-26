const express = require('express');
const router = express.Router();

//Con esto podemos hacer consulta a la DB
//Perimos la ruta del modelo que deseamos
const Item = require('../models/modelo1');

/*
Cada vez que se cree un nuevo item de la coleccion de la DB, es decir
cosnt item =new Item({atributo1, atributo2}) este mismo nos sirve
para hacer .save()
Mientras que la variable del modelo Item sirve para hacer quetys commo
busqueda, actualizar y eliminar
*/

router.get('/', async (req, res) => {
	const item = await Item.find();

	console.log(item);
	res.json(item);
});

router.get('/:id', async (req, res) => {
	const item = await Item.findById(req.params.id);
	res.json(item);
});

router.post('/', async (req, res) => {
	const { title, description } = req.body;
	const item = new Item({ title, description });
	console.log(item);
	await item.save();
	res.json({ status: 'Tarea guardada' });
});

router.put('/:id', async (req, res) => {
	const { title, description } = req.body;
	const newItem = { title, description };
	await Item.findByIdAndUpdate(req.params.id, newItem);
	res.json({ status: 'Tarea actualizada' });
});

router.delete('/:id', async (req, res) => {
	await Item.findByIdAndRemove(req.params.id);
	res.json({ status: 'Tarea eliminada' });
});

module.exports = router;
