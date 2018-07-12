using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProdCodeApi.Data;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Models;
using ProdCodeApi.Services.Contracts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private List<string> acceptedExtensions = new List<string>(){ ".png", ".jpeg", ".jpg" };
        private ProdCodeDbContext db;
        private IMapper mapper;
        private IProductService productService;

        public ProductController(ProdCodeDbContext db, IMapper mapper, IProductService productService)
        {
            this.db = db;
            this.mapper = mapper;
            this.productService = productService;
        }

        [HttpPost, Authorize, Route("create")]
        public IActionResult Create([FromForm] CreateProductModel createProductModel)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }
            string fileExtension = Path.GetExtension(createProductModel.ProductImage.FileName);
            if (!this.acceptedExtensions.Any(e => e == fileExtension.ToLower()))
            {
                this.ModelState.AddModelError("Product Image", "This type of extension is not accepted.");
                return BadRequest(this.ModelState);
            }

            var currentUser = HttpContext.User;
            string userEmail = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;

            int newProductId = this.productService.CreateProduct(userEmail, createProductModel);

            return Ok(new { productId = newProductId });
        }
    }
}