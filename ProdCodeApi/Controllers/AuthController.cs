using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProdCodeApi.Data;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Helpers;
using ProdCodeApi.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ProdCodeApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private IConfiguration _config;
        private ProdCodeDbContext db;

        public AuthController(IConfiguration config, ProdCodeDbContext db)
        {
            this._config = config;
            this.db = db;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public IActionResult CreateToken([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(login);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        [HttpPost, Route("register")]
        public IActionResult Register([FromBody] RegisterModel register)
        {
            User userToRegister = new User()
            {
                Name = register.Name,
                Email = register.Email,
                Birthdate = register.Birthday,
                PasswordHash = EncryptionHelper.Sha256_Hash(register.Password.Trim())
            };
            this.db.Users.Add(userToRegister);
            this.db.SaveChanges();

            UserProfile userProfile = new UserProfile()
            {
                Id = userToRegister.Id,
                Email = userToRegister.Email,
                Name = userToRegister.Name,
                Birthdate = userToRegister.Birthdate
            };

            return Ok(userProfile);
        }

        private string BuildToken(UserProfile user)
        {
            Claim[] claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserProfile Authenticate(LoginModel login)
        {
            UserProfile user = null;

            User userInfo = this.db.Users.SingleOrDefault(u => u.Email == login.Email && u.PasswordHash == EncryptionHelper.Sha256_Hash(login.Password));
            if (userInfo != null)
            {
                user = new UserProfile()
                {
                    Id = userInfo.Id,
                    Name = userInfo.Name,
                    Email = userInfo.Email,
                    Birthdate = userInfo.Birthdate
                };
            }

            return user;
        }
    }
}