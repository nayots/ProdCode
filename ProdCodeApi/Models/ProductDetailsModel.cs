using AutoMapper;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Infrastructure.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Models
{
    public class ProductDetailsModel : IMapFrom<Product>, IHaveCustomMapping
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int AuthorId { get; set; }

        public string ImageUrl { get; set; }

        public string DisqusId { get; set; }

        public void ConfigureMapping(Profile profile)
        {
            profile.CreateMap<Product, ProductDetailsModel>()
                .ForMember(p => p.DisqusId, cfg => cfg.MapFrom(p => p.DisqusId.ToString()));
        }
    }
}
