import Appointment from '../models/Appointment';
import User from '../models/User';
import * as Yup from 'yup';

class AppointmentController {
  async store(req, res){
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na Validação' });
    }
    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'Você não possui acesso de administrador' });
    }

    return res.json();
  }
}
export default new AppointmentController();
