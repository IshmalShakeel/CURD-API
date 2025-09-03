const validateUser = (userData) => {
  const errors = [];
  
  if (!userData.name || userData.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!userData.email || userData.email.trim() === '') {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.push('Email format is invalid');
  }
  
  if (!userData.age || userData.age < 1 || userData.age > 150) {
    errors.push('Age must be between 1 and 150');
  }
  
  return errors;
};

const validatePartialUser = (userData) => {
  const errors = [];
  
  if (userData.name !== undefined) {
    if (!userData.name || userData.name.trim() === '') {
      errors.push('Name cannot be empty');
    }
  }
  
  if (userData.email !== undefined) {
    if (!userData.email || userData.email.trim() === '') {
      errors.push('Email cannot be empty');
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.push('Email format is invalid');
    }
  }
  
  if (userData.age !== undefined) {
    if (userData.age < 1 || userData.age > 150) {
      errors.push('Age must be between 1 and 150');
    }
  }
  
  return errors;
};

module.exports = {
  validateUser,
  validatePartialUser
};
