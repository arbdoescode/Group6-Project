using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class LoginKlientRes : BaseRes
    {
        public string Username;

        public long UsernameID;

        public long? ClientSubjectID;

        public string AgencyId;

        public long TerminalId;

        public string IdProcesori;

        public string Agjensi;
        
        public string UserRole;

    }
}
