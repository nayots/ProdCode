using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;
using ProdCodeApi.Data;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Models;
using ProdCodeApi.Services.Contracts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Services
{
    public class ProductService : IProductService
    {
        private IConfiguration configuration;
        private ProdCodeDbContext db;

        public ProductService(IConfiguration configuration, ProdCodeDbContext db)
        {
            this.configuration = configuration;
            this.db = db;
        }

        public int CreateProduct(string userEmail, CreateProductModel productModel)
        {
            User author = this.db.Users.FirstOrDefault(u => u.Email == userEmail);

            Account account = new Account(
            configuration["Cloudinary:CloudName"],
            configuration["Cloudinary:ApiKey"],
            configuration["Cloudinary:ApiSecret"]);

            Cloudinary cloudinary = new Cloudinary(account);
            string fileName = $"{Guid.NewGuid().ToString()}{System.IO.Path.GetExtension(productModel.ProductImage.FileName)}";
            using (Stream imageStream = productModel.ProductImage.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(fileName, imageStream),
                    Folder = "ProdCode"
                };
                var uploadResult = cloudinary.Upload(uploadParams);
                string imageUrl = uploadResult.JsonObj.Value<string>("url");
                Product newProduct = new Product()
                {
                    Name = productModel.ProductName,
                    Code = productModel.ProductCode,
                    ImageUrl = imageUrl,
                    AuthorId = author.Id,
                    CreatedDate = DateTime.UtcNow,
                    DisqusId = Guid.NewGuid()
                };

                this.db.Products.Add(newProduct);
                this.db.SaveChanges();

                return newProduct.Id;
            }
        }
    }
}