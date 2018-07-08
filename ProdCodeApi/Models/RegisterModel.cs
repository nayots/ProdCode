using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Models
{
    public class RegisterModel
    {
        [Required]
        [MaxLength(20, ErrorMessage ="The max allowed length for Name is 20 characters!")]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required(ErrorMessage = "Confirmed Password is Required")]
        public string PasswordSecond { get; set; }

        public DateTime? Birthday { get; set; }
    }
}
