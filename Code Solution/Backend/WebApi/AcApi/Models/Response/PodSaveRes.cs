using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class PodSaveRes : BaseRes
    {
        public int ResultCode;

        public string ResultDescription;

        public string PodId;

        public string[] Error;
    }
}