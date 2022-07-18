import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(data: IRequest): Promise<User> {
    const { email } = data;

    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail address already used');
    }

    const user = usersRepository.create({
      ...data,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
