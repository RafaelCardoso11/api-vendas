import { getCustomRepository } from 'typeorm';
import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import AppError from './../../../shared/errors/AppError';
import Product from './../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute(data: IRequest): Promise<Product> {

    const { name } = data;

    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Esse produto já existe');
    }

    const product = productsRepository.create(data);

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
