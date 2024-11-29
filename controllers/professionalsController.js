import Professional from '../models/professional.js';

export const getProfessionalsByProfession = async (req, res) => {
  const { profession } = req.params; 

  try {
    const professionals = await Professional.find({
      profession: { $regex: profession, $options: 'i' }, 
    }).select('name email profession -_id'); 

    if (professionals.length === 0) {
      return res.status(404).json({ message: 'Nenhum profissional encontrado para esta profissão.' });
    }

    res.status(200).json(professionals);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ message: 'Erro no servidor, tente novamente.', error: error.message });
  }
};
