using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Models
{
    public class EditProductModel
    {
        [Required]
        public int? Id { get; set; }

        [Required]
        [MaxLength(100)]
        [MinLength(2)]
        public string ProductName { get; set; }

        [Required]
        public string ProductCode { get; set; }

        [Required]
        public IFormFile ProductImage { get; set; }
    }
}
