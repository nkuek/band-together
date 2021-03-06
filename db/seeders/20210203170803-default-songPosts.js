'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('SongPosts', [
    { postTitle: 'Jewel Post', songTitle: 'Jewel', artist: "Flume", album: 'Hi This Is Flume', genre: 'Electronic', songLink: 'https://youtu.be/_ADZq3fyw9k', body: null, userId: 1, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Hyperreal Post', songTitle: 'Hyperreal', artist: 'Flume', album: 'Skin Companion EP 2', genre: 'Electronic', songLink: 'https://youtu.be/SPc-oWXEhQQ', body: null, userId: 2, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Tuxedo Hat Post', songTitle: 'Tuxedo Hat', artist: 'The Octopus Project', album: 'One Ten Hundred Thousand Million', genre: 'Electronic', songLink: 'https://youtu.be/48sLCAdbEEY', body: null, userId: 3, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'After Dark Post', songTitle: 'After Dark', artist: 'Mr.Kitty', album: 'Time', genre: 'Alternative/Indie', songLink: 'https://youtu.be/waAlgFq9Xq8', body: null, userId: 4, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Speed of Sound Post', songTitle: 'Speed of Sound', artist: 'Coldplay', album: 'X&Y', genre: 'Alternative Rock', songLink: 'https://youtu.be/0k_1kvDh2UA', body: null, userId: 5, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Yellow Post', songTitle: 'Yellow', artist: 'Coldplay', album: 'Yellow', genre: 'BritPop', songLink: 'https://youtu.be/yKNxeF4KMsY', body: null, userId: 6, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Clocks Post', songTitle: 'Clocks', artist: 'Coldplay', album: 'A Rush of Blood to the Head', genre: 'Rock', songLink: 'https://youtu.be/PFW2uSCZ0uE', body: null, userId: 7, createdAt: new Date(), updatedAt: new Date()},
    { postTitle: 'Paradise Post', songTitle: 'Paradise', artist: 'Coldplay', album: 'Mylo Xyloto', genre: 'Alternative/Indie', songLink: 'https://youtu.be/1G4isv_Fylg', body: null, userId: 8, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Watermelon Sugar Post', songTitle: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', genre: 'Pop', songLink: 'https://youtu.be/E07s5ZYygMg', body: null, userId: 9, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'The Birds (Part 1) Post', songTitle: 'The Birds (Part 1)', artist: 'The Weeknd', album: 'Thursday', genre: 'R&B', songLink: 'https://youtu.be/t2_YyRBYZjM' , body: null, userId: 10, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Adieu Post', songTitle: 'Adieu',  artist: 'Tchami', album: 'Revelations', genre: 'Electronic', songLink: 'https://youtu.be/kr0_YzOQf5A', body: null, userId: 1, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Better Post', songTitle: 'Better', artist: 'Guns N’ Roses', album: 'Chinese Democracy', genre: 'Metal', songLink: 'https://youtu.be/tVKtLfFD8Po', body: null, userId: 2, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Stairway To Heaven Post', songTitle: 'Stairway To Heaven', artist:'Led Zeppelin', album: 'Led Zeppelin IV', genre: 'Hard Rock', songLink: 'https://youtu.be/QkF3oxziUI4', body: null, userId: 3, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Comfortably Numb Post', songTitle: 'Comfortably Numb', artist:'Pink Floyd', album: 'The Wall', genre: 'Pop', songLink: 'https://youtu.be/_FrOQC-zEog', body: null, userId: 4, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Super Trapper Post', songTitle: 'Super Trapper', artist:'Future', album: 'Future',  genre: 'Hip-Hop/Rap', songLink: 'https://youtu.be/P1J1mby_5Dg', body: null, userId: 5, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'XO Tour Llif3 Post', songTitle: 'XO Tour Llif3', artist:'Lil Uzi Vert', album: 'Luv Is Rage', genre: 'Emo Rap', songLink: 'https://youtu.be/WrsFXgQk5UI', body: null, userId: 6, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Moment of Clarity Post', songTitle: 'Moment of Clarity', artist:'Jay-Z', album: 'The Black Album', genre: 'Hip-Hop/Rap', songLink: 'https://open.spotify.com/track/5TTFD5DuFhQOrs0RJxGDbD', body: null, userId: 7, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Ether Post', songTitle: 'Ether', artist:'Nas', album: 'Stillmatic', genre: 'Hip-Hop/Rap', songLink: 'https://youtu.be/aznJJir__oE', body: null, userId: 8, createdAt: new Date(), updatedAt: new Date() },
    { postTitle: 'Roses Post', songTitle: 'Roses', artist:'SAINt JHN', album: 'Collection One', genre: 'Dance/Electronic', songLink: 'https://youtu.be/XHA-QM-q-3E', body: null, userId: 9, createdAt: new Date(), updatedAt: new Date() }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('SongPosts', null, {});
  }
};
