using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class KomisionDorezimeReq :BaseReq
    {
        public string Agjensia { get; set; }

        public string PNga { get; set; }

        public string PDeri { get; set; }

        public string KushPaguan { get; set; }

        public string KlienteSubjekte { get; set; }

        public string Kodlevizje { get; set; }

        public string Pershkrimi { get; set; }



    }
}