export const queries = {
    getAllProduct: 'SELECT * FROM Products',
    getProductById: 'SELECT * FROM Products where Id = @Id',
    postProduct : "INSERT INTO Products (name,description,quantity) values (@name, @description, @quantity)",
    deleteProduct : "DELETE FROM Products where Id = @Id",
    getTotalProducts : "SELECT COUNT(*) FROM Products",
    updateProductById : "UPDATE Products SET Name = @name , Description = @description , Quantity = @quantity where Id= @id"
}