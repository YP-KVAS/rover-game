import { Router } from 'express'

export interface IRouter {
  routes(): void
}

abstract class BaseRouter implements IRouter {
  public router: Router
  protected constructor() {
    this.router = Router()
    this.routes()
  }

  abstract routes(): void
}

export default BaseRouter
