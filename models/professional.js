import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profession: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  cep: { type: String, required: true },
  complemento: { type: String },
  cpf: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Professional = mongoose.model('Professional', professionalSchema);

export default Professional;

