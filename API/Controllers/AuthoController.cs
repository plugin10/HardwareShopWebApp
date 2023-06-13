using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class AuthoController : BaseApiController
    {
        private readonly IConfiguration _config;

        public AuthoController(IConfiguration config)
        {
            _config = config;
        }


        [HttpGet("{name}/{password}")] // api/autho/{name}/{password}
        public ActionResult<string> GetAutho(string name, string password)
        {
            if (name == "Admin" && password == "Admin")
            {
                return GenerateJSONWebToken(new User { Username = name });
            }
            else
            {
                return "Wrong username or Password";
            }
        }

        private string GenerateJSONWebToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var kay = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("BT+pDsHVZZaoE87Fb4ZThsEc2Wz0jNIxy6LmKZblb/ZH8t5pocX9I9OsGXUVmwyxBrokqYP0hrtzipzUGPi0rHS+dQ4TAbrL/xJN6HzA63c+Ehx8XrBQFhMNJ+C9vJEvMsJA1sQuU2ahCV3/v6SlVisWMnVNOhi6AT4KKoWX0FBVyBR0P2AeeE3hblRNW9rzU+xN7RZbc9vk4RElbr+ZV76JfT2TqA+u/dsccQ0cJfHq8vBIOyCmwyBt91eyI/NlV/tiYddszCnEbbF/xkzRPCFkQkBSugnlgqQLPnb7/ymUJAzVi3/XO2E0Qrd+e+1PGOzyMYIeaImzGgmCn5PhUnm15kai+iiX6msPJ0uOHRg="));

            var signingCredentials = new SigningCredentials(kay, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signingCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }
    }
}