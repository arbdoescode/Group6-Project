using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class PodSaveReq
    {
        [Required]
        public string UsernameID { get; set; }
        public string PODNr { get; set; }

        public string Pesha { get; set; }

        public string Cope { get; set; }

        public string KodPershkrimi { get; set; }

        public string KodiProduktit { get; set; }

        public string KlientSubjektDergues { get; set; }

        public string KlientSubjektMarres { get; set; }

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

        [Required]
        public string KlientSubjektID { get; set; }

        // public string MonedhaKP { get; set; }

        public string CmimiBaze { get; set; }

        public bool isNational { get; set; }
        public string AgjensiTranzit { get; set; }

        public string CmimiBazeTry { get; set; }
        public string Token { get; set; }

        public string Username { get; set; }

        public string AgjensiaOrigjine { get; set; }

        public string AgjensiaOrigjineID { get; set; }
        public string Derguesi { get; set; }

        public string KodLevizje { get; set; }

        public string KodLevizjeBrand { get; set; }

        public string AgjensiDestinacion { get; set; }

        public string QytetFshat { get; set; }
        public bool isFshat { get; set; }
        public string KodiLevizjes { get; set; }
        public string Levizja { get; set; }

        public string Drejtimi { get; set; }

        public string Brandi { get; set; }

        public string KodiSherbimit { get; set; }

        public string Korrieri { get; set; }

        public string Destinacion { get; set; }

        public string TelDerguesi { get; set; }

        public string AdresaDerguesi { get; set; }

        public string QytetiDergues { get; set; }

        public string ShtetiDergues { get; set; }

        public bool ShteseLekeCheck { get; set; }

        public bool hasZbritje { get; set; }

        public bool hasZbritje2 { get; set; }
        public bool hasConfirmed { get; set; }
        public bool KundrejtPageseLekeCheck { get; set; }

        public string ShteseLekeVlera { get; set; }

        public string Terminal { get; set; }
    }
}