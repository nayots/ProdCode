using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace ProdCodeApi.Helpers
{
    public static class EncryptionHelper
    {
        public static string Sha256_Hash(string value)
        {
            using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(value));
                // Get the hashed string.  
                string hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
                // Print the string.   
                return hash;
            }
        }
    }
}
