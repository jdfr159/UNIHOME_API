module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [
        { roleName: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
        { roleName: 'EntidadInmobiliaria', createdAt: new Date(), updatedAt: new Date() },
        { roleName: 'UsuarioInmobiliaria', createdAt: new Date(), updatedAt: new Date() }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});
    }
  };
  