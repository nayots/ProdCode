using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Data.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int AuthorId { get; set; }

        public User Author { get; set; }

        public string ImageUrl { get; set; }

        public Guid DisqusId { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool isArchived { get; set; }
    }
}
