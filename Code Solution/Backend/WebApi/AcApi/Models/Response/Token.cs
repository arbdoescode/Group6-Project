using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class Token
    {
        public int ID { get; set; }

        public string KEY { get; set; }

        public string USERNAME { get; set; }

        public DateTime DATETIME{ get; set; }


    }
}