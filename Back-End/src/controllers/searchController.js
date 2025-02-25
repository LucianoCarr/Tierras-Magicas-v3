const { Op } = require('sequelize');
const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

exports.search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'El parámetro "q" es necesario' });
    }

    const personajes = await db.Character.findAll({
      where: {
        name: {
          [Op.substring]: q,
        },
      },
    });

    const reinos = await db.Realm.findAll({
      where: {
        name: {
          [Op.substring]: q,
        },
      },
    });

    return res.status(200).json({
      personajes,
      reinos,
    });
    
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};

