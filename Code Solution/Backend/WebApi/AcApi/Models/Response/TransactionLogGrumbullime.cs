using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class TransactionLogGrumbullime
    {
        public string POD { get; set; }

        public string AgjensiaDestinacion { get; set; }

        public string Pesha { get; set; }

        public string Agjensia_qe_Paguan { get; set; }

        public string AgjensiaRemote { get; set; }

        public string Banka { get; set; }

        public string Cmimi_Baze { get; set; }

        public string Cmimi_me_zbritje { get; set; }

        public DateTime? Data { get; set; }

        public string Derguesi { get; set; }

        public decimal KP { get; set; }

        public string MonedhaKP { get; set; }

        public long Id { get; set; }

        public string Ka_Sherbime_Kunder_Pagese { get; set; }

        public string Kliente_Subjekte_Marres { get; set; }

        public long QytetiMarresID { get; set; }

        public string QytetiMarres { get; set; }

        public string ShtetiMarres { get; set; }

        public string KlientSubjektDergues { get; set; }

        public string Kod_Levizje { get; set; }

        public string Kod_Reference { get; set; }

        public string Kodi_Produktit { get; set; }

        public string EmriMarresit { get; set; }

        public string VleraKP { get; set; }

        public string KushPaguan { get; set; }

        public decimal? Total { get; set; }

        public string Status { get; set; }


        public string StatusPod { get; set; }
    }
}