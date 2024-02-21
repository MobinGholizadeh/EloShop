using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyShop.Data.UserService
{
	public class IsStrongPassword
	{
		public bool Check(string password)
		{
			if (password.Length < 8)
			{
				return false;
			}

			bool hasLetter = false;
			bool hasNumber = false;
			bool hasSpecialChar = false;

			foreach (char c in password)
			{
				if (char.IsLetter(c))
				{
					hasLetter = true;
				}
				else if (char.IsDigit(c))
				{
					hasNumber = true;
				}
				else if (char.IsSymbol(c) || char.IsPunctuation(c))
				{
					hasSpecialChar = true;
				}

				if (hasLetter && hasNumber && hasSpecialChar)
				{
					break;
				}
			}

			return hasLetter && hasNumber && hasSpecialChar;
		}
	}
}

