using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Models
{
    public class EditProductInfoModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Code { get; set; }

        public string ImageUrl { get; set; }
    }
}
