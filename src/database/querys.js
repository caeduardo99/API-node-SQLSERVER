export const queries = {
    getAllProduct: 'SELECT * FROM Ivruta',
    getProductById: 'SELECT * FROM Products where Id = @Id',
    postProduct : "INSERT INTO Ivruta (latitud,longitud) values (@latitud, @longitud)",
    deleteProduct : "DELETE FROM Products where Id = @Id",
    getTotalProducts : "SELECT COUNT(*) FROM Products",
    updateProductById : "UPDATE Products SET Name = @name , Description = @description , Quantity = @quantity where Id= @id"
}