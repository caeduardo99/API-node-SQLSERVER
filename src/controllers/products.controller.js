import {getConnection, sql, queries} from '../database'

// GET PRODUCTS
export const getProducts = async (req, res) => {

    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProduct);
        res.json(result.recordset)
    }catch (error){
        res.status(500)
        res.send(error.message)
    }
}


// POST PRODUCTS
export const createNewProduct = async (req, res) => {
    const { name, description } = req.body;
    let { quantity } = req.body;
  
    // validating
    if (description == null || name == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    if (quantity == null) quantity = 0;
  
    try {
      const pool = await getConnection();
  
      await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("quantity", sql.Int, quantity)
        .query(queries.postProduct);
  
      res.json({ name, description, quantity });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


// GET PRODUCT : ID
  export const getProductById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query(queries.getProductById);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };




// GET TOTAL CONT
  export const getTotalProducts = async (req, res) => {
    const pool = await getConnection();
  
    const result = await pool.request().query(queries.getTotalProducts);
    console.log(result);
    res.json(result.recordset[0][""]);
  };
  

  export const deleteProductById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query(queries.deleteProduct);
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };





// PUT PRODUCTS
  export const updateProductById = async (req, res) => {
    const { description, name, quantity } = req.body;
  
    // validating
    if (description == null || name == null || quantity == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("quantity", sql.Int, quantity)
        .input("id", req.params.id)
        .query(queries.updateProductById);
      res.json({ name, description, quantity });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


