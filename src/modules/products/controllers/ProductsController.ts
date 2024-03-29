import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductsService from './../services/ListProductsService';
import ReadProductService from './../services/ReadProductService';
import UpdateProductService from './../services/UpdateProductService';
import DeleteProduceService from './../services/DeleteProduceService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async read(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProduct = new ReadProductService();

    const product = await listProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProduceService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
