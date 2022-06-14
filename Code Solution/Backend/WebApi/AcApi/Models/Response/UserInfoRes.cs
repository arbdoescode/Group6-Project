using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class UserInfoRes
    {
        public string Username;

        public string Password;

        public long? ClientSubjectID;

        public string Role;

        public bool Aktive;
    }
}