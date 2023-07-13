const db = require('./connection');
const { User,  Category, Excercise,Record } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'UpperBody' },
    { name: 'Core' },
    { name: 'LowerBody' },
    { name: 'Cardio' }
  ]);

  console.log('categories seeded');

  await Excercise.deleteMany();

  const exercises = await Excercise.insertMany([
    {
        exerciseName: 'OHP',
        category: categories[0]._id,
        targetHeavy:135,
        targetReps:6,
        repsActual:10,
        heavyActual:135
    },
    {
        exerciseName: 'BP',
        category: categories[0]._id,
        targetHeavy:195,
        targetReps:6,
        repsActual:10,
        heavyActual:195
    },
    {
        exerciseName: 'BP',
        category: categories[0]._id,
        targetHeavy:195,
        targetReps:6,
        repsActual:10,
        heavyActual:195
    },
    {
        exerciseName: 'BP',
        category: categories[0]._id,
        targetHeavy:195,
        targetReps:6,
        repsActual:10,
        heavyActual:195
    },
   
  ]);
  const records=await Record.insertMany([

  ])
  const weeks=await Week.insertMany([])

  console.log('exercises seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Alex',
    lastName: 'Sigala',
    email: 'alexsigala87@gmail.com',
    password: 'slimchado1',
    sessions: [
      {
        exercises: [exercises[0]._id, exercises[1]._id,exercises[2]._id ,exercises[3]._id]
      }
    ],
    records:[
      {
        records:[records[0]._id,records[1]._id,records[2]._id,records[3]._id]
      }
    ]
  });


  console.log('users seeded');

  process.exit();
});
