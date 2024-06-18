
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the Chats table
    return queryInterface.bulkInsert('chats', [
      {
        model: 'psychika1',
        messages: JSON.stringify([{ sender: 'User', text: 'Hello!' }, { sender: 'Asisstant', text: 'Hi!' }]),
        stream: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        model: 'psychika1',
        messages: JSON.stringify([{ sender: 'User3', text: 'How are you?' }, { sender: 'User4', text: 'I am fine, thanks!' }]),
        stream: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // Add more seed data as required
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data from the Chats table
    return queryInterface.bulkDelete('Chats', null, {});
  }
};
