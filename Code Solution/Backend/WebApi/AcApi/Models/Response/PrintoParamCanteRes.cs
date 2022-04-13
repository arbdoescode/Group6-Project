using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class PrintoParamCanteRes: BaseRes
    {
        public string Nr_POD { get; set; }
        public string Destinacioni { get; set; }

        public string Pesha__kg_ { get; set; }

        public string Pershkrimi { get; set; }

        public string Debitimi { get; set; }

        public string Verejtje { get; set; }
    }
}