"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_cors = __toESM(require("cors"));
var import_reflect_metadata2 = require("reflect-metadata");
var import_express2 = __toESM(require("express"));

// src/routes/routes.ts
var import_express = __toESM(require("express"));

// src/entities/User.ts
var import_typeorm = require("typeorm");
var User = class {
};
__decorateClass([
  (0, import_typeorm.Column)({ primary: true, generated: true })
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 6 })
], User.prototype, "role", 2);
__decorateClass([
  (0, import_typeorm.Column)("char", { nullable: false, length: 14, unique: true })
], User.prototype, "cpf", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 200 })
], User.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 200 })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm.Column)("char", { nullable: false, length: 15 })
], User.prototype, "phone", 2);
__decorateClass([
  (0, import_typeorm.Column)("char", { nullable: false, length: 9 })
], User.prototype, "cep", 2);
__decorateClass([
  (0, import_typeorm.Column)("char", { nullable: false, length: 2 })
], User.prototype, "state", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 120 })
], User.prototype, "city", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 120 })
], User.prototype, "bairro", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 200 })
], User.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm.Column)({ nullable: false })
], User.prototype, "number", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar", { nullable: false, length: 200 })
], User.prototype, "complement", 2);
User = __decorateClass([
  (0, import_typeorm.Entity)("user")
], User);

// src/database/data-source.ts
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm3 = require("typeorm");

// src/entities/Product.ts
var import_typeorm2 = require("typeorm");
var Product = class {
};
__decorateClass([
  (0, import_typeorm2.Column)({ primary: true, generated: true })
], Product.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { nullable: false, length: 200 })
], Product.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { nullable: false, length: 12 })
], Product.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar", { nullable: false, length: 200 })
], Product.prototype, "img", 2);
Product = __decorateClass([
  (0, import_typeorm2.Entity)("product")
], Product);

// src/database/data-source.ts
var AppDataSource = new import_typeorm3.DataSource({
  type: "mysql",
  host: "db4free.net",
  port: 3306,
  username: "isaac_2023",
  password: "12345678",
  database: "fastfood_deliver",
  synchronize: true,
  logging: false,
  entities: [User, Product],
  migrations: [],
  subscribers: []
});

// src/controllers/UserController.ts
var UserController = class {
  // Rota para obter todos os usuários
  getUsers(req, res) {
    return __async(this, null, function* () {
      const userRepository = AppDataSource.getRepository(User);
      const users = yield userRepository.find();
      res.status(200).json(users);
    });
  }
  // Rota para obter um usuário por ID
  getUserById(req, res) {
    return __async(this, null, function* () {
      const id = Number(req.params.id);
      const userRepository = AppDataSource.getRepository(User);
      try {
        const user = yield userRepository.findOneByOrFail({ id });
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
      }
    });
  }
  // Rota para inserir um usuário
  postUser(req, res) {
    return __async(this, null, function* () {
      const userRepository = AppDataSource.getRepository(User);
      const createdUser = userRepository.create(req.body);
      try {
        yield userRepository.save(createdUser);
        res.status(201).json(createdUser);
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          res.status(409).json({ error: "CPF existente" });
        } else {
          res.status(500).json({ error: "Erro ao criar o usu\xE1rio" });
        }
      }
    });
  }
  // Rota para atualizar um usuário
  updateUser(req, res) {
    return __async(this, null, function* () {
      const userRepository = AppDataSource.getRepository(User);
      const id = Number(req.params.id);
      const updatedUserData = req.body;
      try {
        const userToUpdate = yield userRepository.findOneBy({ id });
        if (!userToUpdate) {
          res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
          return;
        }
        const updatedUser = userRepository.merge(userToUpdate, updatedUserData);
        yield userRepository.save(updatedUser);
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: "Error ao atualizar o usu\xE1rio" });
      }
    });
  }
  // Rota para deletar um usuário
  deleteUser(req, res) {
    return __async(this, null, function* () {
      const id = Number(req.params.id);
      const userRepository = AppDataSource.getRepository(User);
      try {
        const user = yield userRepository.findOneByOrFail({ id });
        yield userRepository.remove(user);
        res.status(200).json({ message: "Usu\xE1rio deletado" });
      } catch (error) {
        res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
      }
    });
  }
};

// src/controllers/LoginController.ts
var LoginController = class {
  // Rota para efetuar o login
  login(req, res) {
    return __async(this, null, function* () {
      const cpf = req.body.cpf;
      const userRepository = AppDataSource.getRepository(User);
      try {
        const user = yield userRepository.findOneByOrFail({ cpf });
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
      }
    });
  }
};

// src/controllers/ProductController.ts
var ProductController = class {
  // Rota para obter todos os produtos
  getProducts(req, res) {
    return __async(this, null, function* () {
      const productRepository = AppDataSource.getRepository(Product);
      const products = yield productRepository.find();
      res.status(200).json(products);
    });
  }
};

// src/routes/routes.ts
var router = import_express.default.Router();
var userController = new UserController();
var loginController = new LoginController();
var productsController = new ProductController();
router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.postUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/login", loginController.login);
router.get("/products", productsController.getProducts);
var routes_default = router;

// src/index.ts
var app = (0, import_express2.default)();
var port = 443;
var corsOptions = {
  origin: "https://ps-2024-estagio-ux.vercel.app/"
};
app.use((0, import_cors.default)(corsOptions));
app.use(import_express2.default.json());
app.use("/", routes_default);
app.use(import_express2.default.urlencoded({ extended: true }));
AppDataSource.initialize().then(() => __async(exports, null, function* () {
  console.log("Database OK");
  app.listen(port, () => {
    console.log(`App escutando na porta ${port}`);
  });
}));
