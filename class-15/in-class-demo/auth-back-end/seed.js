const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./models/bookModel.js');

async function seed() {
  mongoose.connect(process.env.MONGO_URL);

  const QT3 = new Book({
    title:  'The King of Attolia',
    description: 'By scheming and theft, the Thief of Eddis has become King of Attolia. Eugenides wanted the queen, not the crown, but he finds himself trapped in a web of his own makingThen he drags a naive young guard into the center of the political maelstrom. Poor Costis knows he is the victim of the king\'s caprice, but his contempt for Eugenides slowly turns to grudging respect. Though struggling against his fate, the newly crowned king is much more than he appears. Soon the corrupt Attolian court will learn that its subtle and dangerous intrigue is no match for Eugenides.',
    status: 'read',
    // change to your email
  });
  QT3.save(function (err) {
    if (err) console.error(err);
    else console.log('saved The King of Attolia');
  });

  // alternately...
  await Book.create({
    title:  'Six of Crows',
    description:   'Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams. But he can\'t pull it off alone ... A convict with a thirst for revenge. A sharpshooter who can\'t walk away from a wager. A runaway with a privileged past. A spy known as the Wraith. A Heartrender using her magic to survive the slums. A thief with a gift for unlikely escapes. Six dangerous outcasts. One impossible heist. Kaz\'s crew is the only thing that might stand between the world and destruction—if they don\'t kill each other first.',
    status: 'read',
  });

  console.log('saved Six of Crows');

  await Book.create({
    title:  'Les Misérables',
    description:   'Victor Hugo\'s tale of injustice, heroism and love follows the fortunes of Jean Valjean, an escaped convict determined to put his criminal past behind him. But his attempts to become a respected member of the community are constantly put under threat: by his own conscience, when, owing to a case of mistaken identity, another man is arrested in his place; and by the relentless investigations of the dogged Inspector Javert. It is not simply for himself that Valjean must stay free, however, for he has sworn to protect the baby daughter of Fantine, driven to prostitution by poverty',
    status: 'read',
  });

  console.log('saved Les Misérables');

  mongoose.disconnect();
}

seed();
