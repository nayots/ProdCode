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
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace ProdCodeApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private IConfiguration _config;
        private ProdCodeDbContext db;
        private IMapper mapper;

        public AuthController(IConfiguration config, ProdCodeDbContext db, IMapper mapper)
        {
            this._config = config;
            this.db = db;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost, Route("login")]
        public IActionResult CreateToken([FromBody]LoginModel login)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }
            IActionResult response = Unauthorized();
            var user = Authenticate(login);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString, user = user });
            }

            return response;
        }

        [HttpPost, Route("register")]
        public IActionResult Register([FromBody] RegisterModel register)
        {
            if (!this.ModelState.IsValid || register.Password != register.PasswordSecond)
            {
                if (register.Password != register.PasswordSecond)
                {
                    this.ModelState.AddModelError("Confirmed Password", "Password and Confirmed Password must match!");
                }
                return BadRequest(this.ModelState);
            }

            if (this.db.Users.Any(u => u.Email == register.Email))
            {
                this.ModelState.AddModelError("Email", $"The email {register.Email} is already taken");
                return BadRequest(this.ModelState);
            }
            Role userRole = this.db.Roles.FirstOrDefault(r => r.Name == "User");

            User userToRegister = new User()
            {
                Name = register.Name,
                Email = register.Email,
                Birthdate = register.Birthday,
                PasswordHash = EncryptionHelper.Sha256_Hash(register.Password.Trim()),
                Roles = new UserRole[] { new UserRole() { RoleId = userRole.Id } }
            };
            this.db.Users.Add(userToRegister);
            this.db.SaveChanges();

            UserProfile userProfile = this.mapper.Map<User, UserProfile>(userToRegister);

            return Ok(userProfile);
        }

        private string BuildToken(UserProfile user)
        {
            Claim[] claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            claims = claims.Concat(user.Roles.Select(r => new Claim(ClaimTypes.Role, r))).ToArray();

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
            UserProfile user = this.db.Users
                .Where(u => u.Email == login.Email && u.PasswordHash == EncryptionHelper.Sha256_Hash(login.Password))
                .ProjectTo<UserProfile>()
                .FirstOrDefault();

            return user;
        }
    }
}