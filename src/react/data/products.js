import libro0011 from "../../assets/images/libro-0011.png";
import libro0006 from "../../assets/images/libro-0006.png";
import libro0010 from "../../assets/images/libro-0010.png";
import libro0001 from "../../assets/images/libro-0001.png";
import libro0013 from "../../assets/images/libro-0013.png";
import libro0007 from "../../assets/images/libro-0007.png";
import libro0009 from "../../assets/images/libro-0009.png";
import libro0004 from "../../assets/images/libro-0004.png";
import libro0002 from "../../assets/images/libro-0002.png";
import libro0014 from "../../assets/images/libro-0014.png";
import libro0005 from "../../assets/images/libro-0005.png";
import libro0003 from "../../assets/images/libro-0003.png";
import libro0008 from "../../assets/images/libro-0008.png";

export const featuredBooks = [
  { id: "libro-0011", title: "Cien Anos de Soledad", price: 24.99, image: libro0011 },
  { id: "libro-0006", title: "El Principito", price: 18.99, image: libro0006 },
  { id: "libro-0010", title: "Don Quijote de la Mancha", price: 32.99, image: libro0010 },
  { id: "libro-0001", title: "Cronica de una Muerte Anunciada", price: 21.99, image: libro0001 },
  { id: "libro-0013", title: "Romeo y Julieta", price: 19.99, image: libro0013 },
  { id: "libro-0007", title: "La Odisea", price: 23.99, image: libro0007 },
  { id: "libro-0009", title: "El Principito 02", price: 18.99, image: libro0009 }
];

export const catalogBooks = [
  ...featuredBooks,
  { id: "libro-0004", title: "La Casa de Bernarda Alba", price: 22.99, image: libro0004 },
  { id: "libro-0002", title: "El Lazarillo de Tormes", price: 16.99, image: libro0002 },
  { id: "libro-0014", title: "Mitos y Leyendas del Peru", price: 26.99, image: libro0014 },
  { id: "libro-0005", title: "La Metamorfosis", price: 17.99, image: libro0005 },
  { id: "libro-0003", title: "La Metamorfosis 02", price: 17.99, image: libro0003 },
  { id: "libro-0008", title: "Cronica de una Muerte Anunciada 02", price: 21.99, image: libro0008 }
];
