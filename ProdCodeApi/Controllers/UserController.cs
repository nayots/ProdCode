using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProdCodeApi.Data;
using ProdCodeApi.Models;
using ProdCodeApi.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("all/{searchTerm?}"), ]
        public IActionResult GetUsers(string searchTerm = "")
        {
            var currentUser = HttpContext.User;
            string userEmail = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;

            ICollection<UserAdminViewModel> users = this.userService.GetAllMatches(searchTerm);

            return Ok(users.Where(u => u.Email != userEmail).ToList());
        }

        [HttpPost("change/{id?}")]
        public IActionResult ChangeAdminStatus(int? id)
        {
            if (id is null || !this.userService.UserExists(id.Value))
            {
                return BadRequest();
            }

            this.userService.ToggleAdmin(id.Value);

            return Ok();
        }
    }
}
