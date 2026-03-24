interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  targetValue: number;
  dailyValues: number[];
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
  let numberOfDays = dailyExerciseHours.length
  let trainingDays = dailyExerciseHours.filter(d => d != 0).length
  let averageDailyHours = dailyExerciseHours.reduce((sum, d) => sum + d, 0) / dailyExerciseHours.length
  let isSuccess = averageDailyHours >= targetAmount
  let rating = 0
  let ratingDescription = ''
  if (averageDailyHours >= targetAmount) {
    rating = 3
    ratingDescription = 'You are doing great!'
  } else if (averageDailyHours >= targetAmount / 2) {
    rating = 2
    ratingDescription = 'Not bad, you can do better'
  } else {
    rating = 1
    ratingDescription = 'You can do much better'
  }
  

  return {
    periodLength: numberOfDays,
    trainingDays: trainingDays,
    success: isSuccess,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: averageDailyHours
  }
}

const parseArgs = (args: string[]): exerciseValues => {
  let dailyValues = []
  let targetValue = 0
  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i == 2) {
        targetValue = Number(args[i])
      } else {
        dailyValues.push(Number(args[i]))
      }
    } else {
      throw new Error('Provided values are not numbers')
    }
  }

  return {
    targetValue: targetValue,
    dailyValues: dailyValues
  }
}

try {
  const { targetValue, dailyValues } = parseArgs(process.argv);
  console.log(calculateExercises(dailyValues, targetValue))
  console.log(process.argv.length)
} catch(error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
