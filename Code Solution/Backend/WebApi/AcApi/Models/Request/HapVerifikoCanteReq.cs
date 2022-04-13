using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class HapVerifikoCanteReq :BaseReq
    {
        public string CantaKodi { get; set; }

        public string [] NrPod { get; set; }

        public string AgjensiaBurim { get; set; }

        public long PerdoruesId { get; set; }

        public string ProcesorId { get; set; }

      //  public DateTime Data { get; set; }
    }
}