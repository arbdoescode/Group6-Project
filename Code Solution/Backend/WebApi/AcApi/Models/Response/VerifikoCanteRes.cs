using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class VerifikoCanteRes :BaseRes
    {
        public long Id;

        public long Canta_Id;

        public DateTime Date_Regjistrimi;

        public long Perdorues_Id;

        public string KodItem;

        public string Item;

    }
}