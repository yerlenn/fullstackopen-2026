interface BodyValues {
  value1: number;
  value2: number;
}

const calculateBmi = (h: number, m: number) : string => {
  let bmi = m / ((h / 100) ** 2)
  if (bmi < 25) {
    return 'Normal range'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
} 

const parseArguments = (args: string[]): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values are not numbers')
  }
}

try {
  const { value1, value2} = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2))
} catch(error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}