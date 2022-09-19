-- table: categories

INSERT INTO `tech_bakers_db`.`categories` (`name`) VALUES ('En Oferta');
INSERT INTO `tech_bakers_db`.`categories` (`name`) VALUES ('Destacados');

-- table: types

INSERT INTO `tech_bakers_db`.`types` (`name`) VALUES ('Tortas');
INSERT INTO `tech_bakers_db`.`types` (`name`) VALUES ('Pastelería');
INSERT INTO `tech_bakers_db`.`types` (`name`) VALUES ('Masas');

-- table: images

INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('Cheesecake.jpeg', '1');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('LemonPie.jpe', '2');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('DevilsCake.jpeg', '3');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('TartaMango.jpeg', '4');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('ParfaitChocolate.jpeg', '5');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('BudinGlaseado.jpeg', '6');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('cookies.jpeg', '7');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('masitas.jpeg', '8');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('queenPavlova.jpg', '9');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('MiniRogel.JPG', '10');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('Cheesecake.jpeg', '11');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('DeditosFinos.JPG', '12');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('tartatres.jpeg', '13');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('flanNapo.jpg', '14');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('TartaRed.jpg', '15');
INSERT INTO `tech_bakers_db`.`images` (`name`, `productId`) VALUES ('milHoja.JPG', '16');

-- table: roles

INSERT INTO `tech_bakers_db`.`roles` (`name`) VALUES ('admin');
INSERT INTO `tech_bakers_db`.`roles` (`name`) VALUES ('user');


-- table: products

INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Cheesecake','2','5500','15','New york Chessecake, con base de masa quebrada de limón y crema saborizada a Maracujá. Opcional, topping de Crumble o Salsa de fruta de la pasión.','20','2');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Lemon Pie','1','2500','9','Base de Pâte sucrée aromatizada con vainas de Vainilla con el clásico Curd de Limón y el perfecto de un esponjoso Merengue Italiano','10','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Devils Cake','1','2900','5','Bomba de Chocolate en tres texturas con un palet de Frutos Rojos y decoraciones de Figuras de Chocolate.','10','2');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Tarta de Mango','1','2500','5','Genoise de Fruta de la Pasión acompañado de una crema sedosa de mango y decorado con Frutas Frescas y pétalos de flores comestibles','20','2');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Torta Mousse','1','1700','5','Torta con bizcochuelo de vainilla perfumado al Contreau, mousse de chocolate semi amargo, bizcochuelo al cacao y mousse de chocolate blanco. Decorada con láminas de chocolate.','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Budin Glaseado','3','1500','15','Es la versión más rica de Glaseado, con ciruelas, cascaritas de naranja, nueces, pasas de uva y cerezas. Elaborada de manera 100% artesanal.','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Caja de Cookies','3','1200','5','Preparación culinaria de pequeño tamaño, dulce, horneada y hecha normalmente a base de harina de trigo y con bolitas de chocolate','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Masitas','3','1100','5','Son un rollos o pastas de masa de pan dulce, ahuecadas en el centro y rellenadas de únicos sabores.','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Pavlova','2','3500','5','Torre de Pavlova compuesta de frambuesa y chocolate, y exquisitos toques de canela','20','2');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Rogel','1','3000','10','Capas intercaladas de Dulce de Leche y masa Rogel, coronadas con merengue italiano','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Deditos Finos','3','800','5','Ricos deditos crocrantes llenos de crema chantilly y cubiertos de un exquisito cocoa.','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Tarta tres chocolates','2','2800','5','Mousse de chocolate negro, blanco y con leche, glaseado con un baño de chocolate negro. Hecho en nuestro obrador','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Flan Napolino','2','2500','5','Es un postre de caramelo, en textura fundente de la leche condensada, queso crema y aroma de la vainilla, muy rica al paladar','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Tarta Red Velvet','1','3200','5','Torta de terciopelo rojo que contiente chocolate con un color rojo oscuro o rojo brillante, preparado en capas cubierto con un glaseado de queso cremoso','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Volcán de chocolate','2','2500','5','Es un postre muy atractivo tanto para la vista como el paladar, al ser picado deja verter chocolate derretido de su interior','20','1');
INSERT INTO `tech_bakers_db`.`products` (`name`, `typeId`, `price`, `discount`, `description`, `stock`, `categoryId`) VALUES ('Milhoja','3','1200','5','Milhoja crocante con relleno de arequipe sin azúcar  y crema de leche, decorada con una capa suave de arequipe endulzado con sucralosa','20','1');

-- table: photos

INSERT INTO `tech_bakers_db`.`photos` (`name`, `userId`) VALUES ('default-user.png', '1');
INSERT INTO `tech_bakers_db`.`photos` (`name`, `userId`) VALUES ('imgProduct_165974131018hola.jpg', '2');

-- table: users

INSERT INTO `tech_bakers_db`.`users` (`fullname`, `lastname`, `email`, `phonenumber`, `address`, `city`, `password`, `terms`, `roleId`) VALUES ('test1', 'test1', 'test1@Pruebapass.com', '123123123', 'Calle 4 sur', 'Cordoba', 'test1', 'terms', '1');
INSERT INTO `tech_bakers_db`.`users` (`fullname`, `lastname`, `email`, `phonenumber`, `address`, `city`, `password`, `terms`, `roleId`) VALUES ('Waylen', 'Tanfield', 'wtanfield1@dion.ne.jp', '456', 'Cra 46 # 20 -20', 'Medellin', '123654', 'terms', '2');