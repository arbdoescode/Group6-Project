using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class RapManifestRes: BaseRes
    {

        public string Status { get; set; }

        public string NrFature { get; set; }

        public string Cmimi { get; set; }
    }
}