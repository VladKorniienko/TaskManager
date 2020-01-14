using System;
using System.Globalization;

namespace TaskManager.BLL
{
    public class ValidateException: Exception
    {
        public ValidateException() : base() {}
        public ValidateException(string message) : base(message) { }
        public ValidateException(string message, params object[] args) 
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}