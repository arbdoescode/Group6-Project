using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class NdryshoPassReq
    {
        public string KsID { get; set; }

        public string username { get; set; }

        public string Password { get; set; }

        public string Aktive { get; set; }

        public string Tag { get; set; }

        public long? ID { get; set; }

        public string Token { get; set; }
    }
}