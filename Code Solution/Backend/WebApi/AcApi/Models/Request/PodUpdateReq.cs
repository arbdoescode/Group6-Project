using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class PodUpdateReq : BaseReq
    {
        public string PODNr { get; set; }

        public string Pesha { get; set; }

        public string Cope { get; set; }

        public string KodPershkrimi { get; set; }

        public string KodiProduktit { get; set; }

        public string KlientSubjektDergues { get; set; }

        public string KushPaguan { get; set; }

        public string MenyrePagese { get; set; }

        public string Marresi { get; set; }

        public string TelMarresi { get; set; }

        public string AdresaMarresi { get; set; }

        public string KodiPostarMarres { get; set; }

        public string Komente { get; set; }

        public string ShumaSherbimeExtra { get; set; }

        public string MonedhaExtra { get; set; }

        public string MonedhaCmimiBaze { get; set; }

        public string KodReference { get; set; }

        public string QytetiMarres { get; set; }

        public string QytetiOrrigjine { get; set; }

        public string ShtetiMarres { get; set; }

        public string Pershkimi { get; set; }


        public string KlientSubjektID { get; set; }

        // public string MonedhaKP { get; set; }

        public string CmimiBaze { get; set; }

        public string Token { get; set; }

        public string Username { get; set; }

        public string Total { get; set; }
    }
}