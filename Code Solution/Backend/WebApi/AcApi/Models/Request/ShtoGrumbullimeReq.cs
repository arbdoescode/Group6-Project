using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class ShtoGrumbullimeReq
    {
        public List<string> Pode { get; set; }
        public long Agjensia { get; set; }
        public long Perdorues { get; set; }
        public string Token { get; set; }
    }
}