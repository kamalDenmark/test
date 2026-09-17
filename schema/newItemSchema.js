import { required, minLength } from "../tools/validation.js";

export const newItemSchema = {
  sname: {
    validators: [required, minLength(3)],
  },
  smarks: {
    validators: [required],
  },
};
