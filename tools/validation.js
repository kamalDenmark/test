export function required(name, value) {
  if (!value) return `${name} is a required field.`;
}
export function minLength(min) {
  //returning a function
  //returning function has 2 parameters

  return (name, value) => {
    if (value.length < min) {
      return `'${name}' must have at least ${min} characters.`;
    }
  };
}

/* 
export function minLength(name, value) {
  if (value.length < 3) {
    return `${name} must have at least 3 characters.`;
  }
} */
export function validateSchema(formData, schema) {
  const schemaEntries = Object.entries(schema);

  const errorEntries = schemaEntries.map(([key, { validators }]) => {
    const value = formData.get(key);
    const message = validateField(key, value, validators) || "";
    return [key, { value, message, error: !!message }];
  });
  const errors = Object.fromEntries(errorEntries);

  return { errors };
}
export function validateField(elemName, elevalue, validators) {
  for (const validator of validators) {
    const error = validator(elemName, elevalue);
    if (error) return error;
  }
}
