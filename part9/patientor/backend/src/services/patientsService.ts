import patients from '../data/patients';

import type { NonSensitivePatientsEntry } from '../types';

const getNonsensitivePatientsEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
      id, 
      name,
      dateOfBirth,
      gender,
      occupation
    }));
}

export default {
  getNonsensitivePatientsEntries
}