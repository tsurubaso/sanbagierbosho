// DBTools.js
//You can use this file to run database update or seed scripts as needed.

//node DBTools.js


/*
//update script to set imageUrl for existing products

import db from "./lib/db.js";

db.prepare(`
  UPDATE products
  SET imageUrl = '/image.jpg'
  WHERE slug = 'tshirt-noir'
`).run();

db.prepare(`
  UPDATE products
  SET imageUrl = '/image2.jpg'
  WHERE slug = 'sweat-gris'
`).run();

console.log("Images mises à jour");

*/





/*
//Seed script to add initial products
import db from "./lib/db.js";

db.prepare(`
  INSERT INTO products (name, slug, price, description, imageUrl)
  VALUES (?, ?, ?, ?, ?)
`).run(
  "Cravate Rouge",
  "cravate-rouge",
  29.99,
  "Une cravate rouge élégante pour les occasions spéciales.",
  "/image5.jpg"
);

db.prepare(`
  INSERT INTO products (name, slug, price, description, imageUrl)
  VALUES (?, ?, ?, ?, ?)
`).run(
  "Jupe Fleurie",
  "jupe-fleurie",
  59.99,
  "Jupe fleurie élégante pour l’été.",
  "/image6.jpg"
);

console.log("✅ Produits insérés");

*/